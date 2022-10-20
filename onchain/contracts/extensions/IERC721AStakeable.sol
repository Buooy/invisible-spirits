//  SPDX-License-Identifier: MIT
//  Creator: BuooyXYZ
pragma solidity ^0.8.9;

import "erc721a/contracts/IERC721A.sol";

/**
 * @dev Interface of ERC721AStakeable.
 */
interface IERC721AStakeable is IERC721A {
  event EventStakedSuccessful(address wallet, uint256 tokenId, uint stakedAt);
  event EventStakedFailed(address wallet, uint256 tokenId);
  event EventUnstakedSuccessful(address wallet, uint256 tokenId);
  event EventUnstakedFailed(address wallet, uint256 tokenId);
  event EventStakeEnabled();
  event EventStakeDisabled();

  function toggleStaking(bool nextStakingEnabledState) external returns (bool);
}