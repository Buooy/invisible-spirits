//  SPDX-License-Identifier: MIT
//  Creator: BuooyXYZ
pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";
import "erc721a/contracts/extensions/ERC721AQueryable.sol";
import "erc721a/contracts/extensions/ERC721ABurnable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";

import "../libraries/ErrorMessages.sol";
import "../libraries/Constants.sol";
import "./extensions/ERC721AStakeable.sol";

/// @custom:security-contact hello@buooy.xyz
contract BaseContract is ERC721A, Ownable, ERC721AStakeable, ERC721ABurnable, ERC721AQueryable, ReentrancyGuard {
    /**
     * Key Variables
     */
    uint256 public mintPrice = 0.01 ether;
    uint256 public mintQuantityLimit = 2;
    uint256 public mintLimitPerWallet = 2;
    uint256 public maxSupply = 888;

    string private _baseTokenURI = Constants.BASE_TOKEN_URI;
    bool public isRevealed = false;
    string private notRevealedURI = Constants.NOT_REVEALED_TOKEN_URI;

    constructor() ERC721A(Constants.TOKEN_NAME, Constants.TOKEN_SYMBOL) {}

    /**
     * Token Metadata
     */
    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override (ERC721A) returns (string memory) {
        require(
            _exists(tokenId),
            ErrorMessages.NON_EXISTENT_TOKEN
        );

        if (!isRevealed) return notRevealedURI;

        return
            string(
                abi.encodePacked(
                    _baseTokenURI,
                    Strings.toString(tokenId),
                    ".json"
                )
            );
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedURI = _notRevealedURI;
    }

    function setIsRevealed(bool _reveal) external onlyOwner {
        isRevealed = _reveal;
    }

    /**
     * Getters
     */
    function getNextTokenId() public view returns (uint256) {
        return _nextTokenId();
    }

    function getMaxSupply() view public returns (uint256) {
        return maxSupply;
    }

    function numberMinted(address owner) public view returns (uint256) {
        return _numberMinted(owner);
    }

    function getOwnershipData(uint256 tokenId)
        external
        view
        returns (TokenOwnership memory)
    {
        return _ownershipOf(tokenId);
    }
    /**
     * Minting
     */
    function safeMint(uint256 quantity) external virtual payable returns (uint256) {
        require(quantity <= mintQuantityLimit, ErrorMessages.MINT_QUANTITY_LIMIT);
        require((totalSupply() + quantity) <= maxSupply, ErrorMessages.MAXIMUM_SUPPLY_REACHED);
        require(msg.value == SafeMath.mul(mintPrice, quantity), ErrorMessages.INCORRECT_ETH_SENT); 
        require((balanceOf(msg.sender) + quantity) <= mintLimitPerWallet, ErrorMessages.MINT_LIMIT_PER_WALLET);
        
        uint256 tokenId = _nextTokenId();
        _safeMint(msg.sender, quantity);
        tokenURI(tokenId);

        return tokenId;
    }

    /**
     * Finance
     */
    function withdrawBalance(uint256 amount) external onlyOwner nonReentrant returns (uint256) {
        require(address(this).balance >= amount, ErrorMessages.TRANSFER_INSUFFICIENT_BALANCE);
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, ErrorMessages.TRANSFER_FAILED);

        return amount;
    }

    /**
     * Overriding ERC721A functions
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public payable virtual override(ERC721A) isTransferable(tokenId) {
        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public payable virtual override(ERC721A) isTransferable(tokenId) {
        super.safeTransferFrom(from, to, tokenId, _data);
    }
}
