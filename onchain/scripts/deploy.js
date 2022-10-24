// scripts/deploy.js
async function main() {
  // We get the contract to deploy
  const InvisibleSpirits = await ethers.getContractFactory("BaseContract");

  console.log("Deploying InvisibleSpirits...");
  const invisibleSpirits = await InvisibleSpirits.deploy();

  await invisibleSpirits.deployed();
  console.log("InvisibleSpirits deployed to:", invisibleSpirits.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
