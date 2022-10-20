const CONTRACT_NAME = "BaseContract"

const deployAndGetSigners  = async () => {
  let hardhatToken;
  let signers;

  const Token = await ethers.getContractFactory(CONTRACT_NAME);
  hardhatToken = await Token.deploy();
  signers = await ethers.getSigners();

  return {hardhatToken, signers}
}

module.exports = {
  deployAndGetSigners,
  CONTRACT_NAME,
  MAX_SUPPLY: 888,
  MINT_QUANTITY_LIMIT: 2,
  WALLET_ADDRESS: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  WALLET_PRIVATE_KEY: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  ORIGINAL_BASE_URI: "https://base-buooy-metadata.buooy.workers.dev/",
  NOT_REVEALED_URI: "https://base-buooy-metadata.buooy.workers.dev/unrevealed.json",
}