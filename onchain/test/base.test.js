const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { deployAndGetSigners, MAX_SUPPLY } = require('./test.utils');

chai.use(chaiAsPromised);

const { expect } = chai;

describe("Base Token contract", function () {
  let hardhatToken;
  let signers;

  beforeEach(async function () {
    const { hardhatToken: _hardhatToken, signers: _signers } = await deployAndGetSigners()
    hardhatToken = _hardhatToken
    signers = _signers
  });

  it("Deployment should deploy 888 tokens", async function () {
    const totalSupply = await hardhatToken.getMaxSupply();
    
    expect(totalSupply.toString()).to.be.equal(MAX_SUPPLY.toString());
  });
});