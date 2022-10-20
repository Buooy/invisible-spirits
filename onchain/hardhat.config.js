require('@nomiclabs/hardhat-ethers');
require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "oweaMLreE6aEN-RP-caweAfCZNm5fDkM";
const GOERLI_PRIVATE_KEY = "cff39a7a2f8c680a8e8128221adfd40b3a1d192497d8e8a747df421b04c434a8";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};
