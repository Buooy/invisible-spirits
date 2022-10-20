const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { deployAndGetSigners, MAX_SUPPLY } = require('./test.utils');

chai.use(chaiAsPromised);

const { expect } = chai;

describe("Minters information", function () {
  let hardhatToken;
  let signers;

  beforeEach(async function () {
    const { hardhatToken: _hardhatToken, signers: _signers } = await deployAndGetSigners()
    hardhatToken = _hardhatToken
    signers = _signers
  });

  it("Prevent single token minting if incorrect ether sent", async function () {
    const signer = signers[2];

    try {
      const result = await hardhatToken.connect(signer).safeMint(1, {value: ethers.utils.parseEther('0.001')}); // minting
    } catch (error) {
      expect(error.message).to.be.equal("VM Exception while processing transaction: reverted with reason string 'Incorrect ETH sent'")
    }
  });

  it("Single token minting with correct ether should work", async function () {
    const signer = signers[2];

    await hardhatToken.connect(signer).safeMint(1, {value: ethers.utils.parseEther('0.01')}); // minting
  
    const nextTokenId = (await hardhatToken.getNextTokenId()).toString();
    expect(nextTokenId).to.be.equal("1");
  });
});