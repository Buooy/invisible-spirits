// scripts/deploy.js
async function main () {
  // We get the contract to deploy
  const BaseBuooy = await ethers.getContractFactory('BaseBuooy');

  console.log('Deploying BaseBuooy...');
  const baseBuooy = await BaseBuooy.deploy();

  /*
  await hre.ethernal.push({
    name: 'BaseBuooy',
    address: baseBuooy.address
  });
  */

  await baseBuooy.deployed();
  console.log('BaseBuooy deployed to:', baseBuooy.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });