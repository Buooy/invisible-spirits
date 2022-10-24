//  SPDX-License-Identifier: MIT
//  Creator: BuooyXYZ
pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

import "./IERC721AStakeable.sol";
import "../../libraries/Constants.sol";
import "../../libraries/ErrorMessages.sol";

/**
 * @dev Interface of ERC721AStakeable.
 */
abstract contract ERC721AStakeable is ERC721A, Ownable, IERC721AStakeable {
  bool public isStakingEnabled = true;

  /// @dev token id => datetime when it was staked
  mapping(uint256 => uint) private stakedNfts;

  /**
   * Modifiers
   */
  modifier stakingEnabled() {
    require(isStakingEnabled == true, ErrorMessages.STAKING_DISABLED);
    _;
  }
  modifier senderOwnsToken(uint256 tokenId) {
    require(ownerOf(tokenId) == msg.sender, ErrorMessages.SENDER_OWNS_TOKEN);
    _;
  }
  modifier isTransferable(uint256 tokenId) {
    require(stakedNfts[tokenId] == 0, ErrorMessages.IS_TRANSFERABLE);
    _;
  }

  /**
   * Staking
   */
  function toggleStaking(bool nextStakingEnabledState) public onlyOwner returns (bool) {
    isStakingEnabled = nextStakingEnabledState;
    if (isStakingEnabled) {
      emit EventStakeEnabled();
    } else {
      emit EventStakeDisabled();
    }
    return isStakingEnabled;
  }
  
  /// Allows the owner to get the staked nfts list
  function getStakedNfts() external view onlyOwner returns (uint[] memory) {
    uint[] memory _stakedNfts = new uint[](Constants.TOKEN_SUPPLY);
    for (uint tokenId = 0; tokenId < Constants.TOKEN_SUPPLY; tokenId++) {
      _stakedNfts[tokenId] = (stakedNfts[tokenId] == 0) ? 0 : stakedNfts[tokenId];
    }
    return _stakedNfts;
  }

  /**
   * Token Owner Specific Functionality
   */
  /**
   * Stakes the NFT
   * @dev Prevents the transfer of the nft during staking
   * 
   */
  function stake(uint256 tokenId) external stakingEnabled senderOwnsToken(tokenId){
    if (stakedNfts[tokenId] == 0) {
      stakedNfts[tokenId] = block.timestamp;
      emit EventStakedSuccessful(msg.sender, tokenId, stakedNfts[tokenId]);
    } else {
      emit EventStakedFailed(msg.sender, tokenId);
    }
  }

  /**
   * unstakes the NFT
   * @dev reenables the transfer of the nft during staking
   * 
   */
  function unstake(uint256 tokenId) external stakingEnabled senderOwnsToken(tokenId){
    if (stakedNfts[tokenId] > 0) {
      stakedNfts[tokenId] = 0;
      emit EventUnstakedSuccessful(msg.sender, tokenId);
    } else {
      emit EventUnstakedFailed(msg.sender, tokenId);
    }
  }
}