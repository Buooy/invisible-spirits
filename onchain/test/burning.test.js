const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { deployAndGetSigners, MAX_SUPPLY } = require('./test.utils');

chai.use(chaiAsPromised);

const { expect } = chai;

describe("Token burning contract", function () {
  let hardhatToken;
  let signers;

  beforeEach(async function () {
    const { hardhatToken: _hardhatToken, signers: _signers } = await deployAndGetSigners()
    hardhatToken = _hardhatToken
    signers = _signers
  });
  it("Token burning should work for token owner", async function () {
    const signer = signers[2];
    await hardhatToken.connect(signer).safeMint(1, {value: ethers.utils.parseEther('0.01')}); // minting
    const transaction = await hardhatToken.connect(signer).burn(0);

    expect(transaction.blockHash).to.be.a("string");
  });

  it("Token burning should not work for non-token owner", async function () {
    const ownerSigner = signers[2];
    const nonOwnerSigner = signers[3];
    await hardhatToken.connect(ownerSigner).safeMint(1, {value: ethers.utils.parseEther('0.01')}); // minting

    try {
      await hardhatToken.connect(nonOwnerSigner).burn(0)
    } catch (error) {
      expect(error.message).to.be.equal("VM Exception while processing transaction: reverted with custom error 'TransferCallerNotOwnerNorApproved()'")
    }
  });
});