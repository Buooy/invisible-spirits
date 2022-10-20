const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { deployAndGetSigners } = require('./test.utils');

chai.use(chaiAsPromised);

const { expect } = chai;

describe("Token Metadata", function () {
  let hardhatToken;
  let signers;

  beforeEach(async function () {
    const { hardhatToken: _hardhatToken, signers: _signers } = await deployAndGetSigners()
    hardhatToken = _hardhatToken
    signers = _signers
  });

  it("Get token uri for non-existent token", async function () {
    try {
      await hardhatToken.tokenURI(1);
    } catch (error) {
      expect(error.reason).to.be.equal('URI query for nonexistent token')
    }
  });

  it("Get token uri for unrevealed existent token", async function () {
    const signer = signers[2];

    await hardhatToken.connect(signer).safeMint(1, {value: ethers.utils.parseEther('0.01')});
    const unrevealedUri = await hardhatToken.tokenURI(0);
    expect(unrevealedUri).to.be.equal("https://base-buooy-metadata.buooy.workers.dev/unrevealed.json")
  });

  it("Set new unrevealed uri for token", async function () {
    const newUnrevealedUri = "https://newunrevealeduri.com";
    await hardhatToken.setNotRevealedURI(newUnrevealedUri);

    const signer = signers[2];
    
    await hardhatToken.connect(signer).safeMint(1, {value: ethers.utils.parseEther('0.01')});
    const unrevealedUri = await hardhatToken.tokenURI(0);
    expect(unrevealedUri).to.be.equal(newUnrevealedUri)
  });

  it("Get revealed uri for token", async function () {
    await hardhatToken.setIsRevealed(true);

    const signer = signers[2];
    const tokenId = 0;
    
    await hardhatToken.connect(signer).safeMint(1, {value: ethers.utils.parseEther('0.01')});
    const revealedUri = await hardhatToken.tokenURI(tokenId);
    expect(revealedUri).to.be.equal(`https://base-buooy-metadata.buooy.workers.dev/${tokenId}.json`)
  });

  it("Set new revealed uri for token", async function () {
    await hardhatToken.setIsRevealed(true);

    const signer = signers[2];
    const tokenId = 0;
    
    await hardhatToken.connect(signer).safeMint(1, {value: ethers.utils.parseEther('0.01')});
    let revealedUri = await hardhatToken.tokenURI(tokenId);

    expect(revealedUri).to.be.equal(`https://base-buooy-metadata.buooy.workers.dev/${tokenId}.json`)

    await hardhatToken.setBaseURI('https://newuri.com/');
    revealedUri = await hardhatToken.tokenURI(tokenId);
    expect(revealedUri).to.be.equal(`https://newuri.com/${tokenId}.json`)
  });
});
