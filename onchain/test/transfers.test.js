const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { deployAndGetSigners } = require('./test.utils');

chai.use(chaiAsPromised);

const { expect } = chai;

describe("Account Balance Transfer", function () {
  let hardhatToken;
  let signers;

  beforeEach(async function () {
    const { hardhatToken: _hardhatToken, signers: _signers } = await deployAndGetSigners()
    hardhatToken = _hardhatToken
    signers = _signers
  });

  it("Insufficient Balance Transfers", async function () {
    try {
      await hardhatToken.withdrawBalance(ethers.utils.parseEther('0.01'));
    } catch (error) {
      expect(error.message).to.be.equal("VM Exception while processing transaction: reverted with reason string 'Insufficient balance'")
    }
  });

  it("Successful Balance Transfers by Owner", async function () {
    const signer = signers[2];
    const originalBalance = await signers[0].getBalance()

    await hardhatToken.connect(signer).safeMint(1, {value: ethers.utils.parseEther('0.01')}); // minting
    const result = await (await hardhatToken.withdrawBalance(ethers.utils.parseEther('0.01'))).wait();
    const balanceAfterWithdrawal = await signers[0].getBalance()
    
    expect(balanceAfterWithdrawal).to.be.greaterThan(originalBalance)
  });

  it("Failed Balance transfer from non-owner", async function () {
    const signer = signers[2];
    const connectedSigner = hardhatToken.connect(signer);

    await connectedSigner.safeMint(1, {value: ethers.utils.parseEther('0.01')}); // minting
    try {
      const amountWithdrawn = await connectedSigner.withdrawBalance(ethers.utils.parseEther('0.01'));
    } catch (error) {
      expect(error.message).to.be.equal("VM Exception while processing transaction: reverted with reason string 'Ownable: caller is not the owner'")
    }
  });
});
