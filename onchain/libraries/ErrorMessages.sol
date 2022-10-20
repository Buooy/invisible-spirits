// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

library ErrorMessages {
  string constant MINIMUM_MINT_QUANTITY = "Must mint one or more";
  string constant MINT_QUANTITY_LIMIT = "Minting too many";
  string constant MAXIMUM_SUPPLY_REACHED = "Maximum supply reached";
  string constant INCORRECT_ETH_SENT = "Incorrect ETH sent";
  string constant MINT_LIMIT_PER_WALLET = "Maximum ownership reached";
  string constant NON_EXISTENT_TOKEN = "URI query for nonexistent token";

  string constant TRANSFER_INSUFFICIENT_BALANCE = "Insufficient balance";
  string constant TRANSFER_FAILED = "Transfer failed";

  string constant STAKING_DISABLED = "Staking is currently disabled";
  string constant SENDER_OWNS_TOKEN = "You do not own the token";
  string constant IS_TRANSFERABLE = "Token is not transferable";
}