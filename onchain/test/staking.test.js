const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { deployAndGetSigners } = require('./test.utils');

chai.use(chaiAsPromised);

const { expect } = chai;

describe("Staking Functionality", function () {
  let hardhatToken;
  let signers;

  beforeEach(async function () {
    const { hardhatToken: _hardhatToken, signers: _signers } = await deployAndGetSigners()
    hardhatToken = _hardhatToken
    signers = _signers
  });


  it("Successfully stake and unstake An NFT", async function () {
    const signer = signers[1];
    const connectedSigner = await hardhatToken.connect(signer);

    //  Minting
    await connectedSigner.safeMint(1, {value: ethers.utils.parseEther('0.01')});

    // Staking
    let txn = await connectedSigner.stake(0);
    let response = await txn.wait();
    let event = response.events.find(event => event.event === 'EventStakedSuccessful');

    expect(event.args.wallet).to.equal(await signer.getAddress());
    expect(event.args.tokenId.toString()).to.equal("0");

    // Unstaking
    txn = await connectedSigner.unstake(0);
    response = await txn.wait();
    event = response.events.find(event => event.event === 'EventUnstakedSuccessful');

    expect(event.args.wallet).to.equal(await signer.getAddress());
    expect(event.args.tokenId.toString()).to.equal("0");
  });

  it("Stake a NFT that is not owned by sender", async function () {
    const signer = signers[1];
    const connectedSigner = await hardhatToken.connect(signer);
    const connectedFraud = await hardhatToken.connect(signers[2]);

    //  Minting
    await connectedSigner.safeMint(1, {value: ethers.utils.parseEther('0.01')});

    // Staking
    try {
      let txn = await connectedFraud.stake(0);
    } catch (error) {
      expect(error.message).to.equal("VM Exception while processing transaction: reverted with reason string 'You do not own the token'")
    }
  });


  it("Owner get the staked nft list", async function () {
    const signer = signers[1];
    const connectedSigner = await hardhatToken.connect(signer);

    //  Minting
    await connectedSigner.safeMint(1, {value: ethers.utils.parseEther('0.01')});

    // Staking
    let txn = await connectedSigner.stake(0);
    await txn.wait();

    // Get staking list
    const _stakedNfts = await hardhatToken.getStakedNfts();
    for (let i = 0; i < _stakedNfts.length; i++) {
      if (i === 0) {
        expect(_stakedNfts[i].toNumber()).to.greaterThan(0);
      } else {
        expect(_stakedNfts[i].toNumber()).to.equal(0);
      }
    }
  });

  it("Non-owner get the staked nft list", async function () {
    const signer = signers[1];
    const connectedSigner = await hardhatToken.connect(signer);

    //  Minting
    await connectedSigner.safeMint(1, {value: ethers.utils.parseEther('0.01')});

    // Staking
    let txn = await connectedSigner.stake(0);
    await txn.wait();

    // Get staking list
    try {
      await connectedSigner.getStakedNfts();
    } catch (error) {
      expect(error.reason).to.equal("Ownable: caller is not the owner")
    }
  });

  it("Stake and try to transfer an NFT", async function () {
    const signer = signers[1];
    const senderWallet = await signer.getAddress();
    const receiverWallet = await signers[2].getAddress();
    const connectedSigner = await hardhatToken.connect(signer);

    //  Minting
    await connectedSigner.safeMint(1, {value: ethers.utils.parseEther('0.01')});

    // Staking
    let txn = await connectedSigner.stake(0);
    let response = await txn.wait();
    let event = response.events.find(event => event.event === 'EventStakedSuccessful');

    expect(event.args.wallet).to.equal(await signer.getAddress());
    expect(event.args.tokenId.toString()).to.equal("0");

    try {
      txn = await connectedSigner.transferFrom(senderWallet, receiverWallet, 0);
      await txn.wait();
    } catch (error) {
      expect(error.message).to.equal("VM Exception while processing transaction: reverted with reason string 'Token is not transferable'")
    }

    // Unstaking
    txn = await connectedSigner.unstake(0);
    await txn.wait();
    txn = await connectedSigner.transferFrom(senderWallet, receiverWallet, 0);
    response = await txn.wait();
    event = response.events.find(event => event.event === 'Transfer');
    expect(event.args.to).to.equal(receiverWallet);
    expect(event.args.tokenId.toNumber()).to.equal(0);
  });

  it("Enable Staking", function (done) {
    const eventPromise = new Promise((resolve) => {
      hardhatToken.on("EventStakeEnabled", () => {
        resolve(true);
      });
      hardhatToken.toggleStaking(true);
    })

    expect(eventPromise).to.eventually.equal(true).notify(done);
  });

  it("Disable Staking", function (done) {
    const eventPromise = new Promise((resolve) => {
      hardhatToken.on("EventStakeDisabled", () => {
        resolve(true);
      });
      hardhatToken.toggleStaking(false);
    })

    expect(eventPromise).to.eventually.equal(true).notify(done);
  });
});