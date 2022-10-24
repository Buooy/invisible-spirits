const hre = require("hardhat");

async function withdraw() {
  const InvisibleSpirits = await hre.ethers.getContractFactory("BaseContract");
  const invisibleSpirits = await InvisibleSpirits.attach(
    // "0x4b683fb11fbc33ad25b0a1ae51d2343b3bd36ad5"
    "0x483e64456E2EBa8037E57696FCe427716B51b4de"
  );

  try {
    await invisibleSpirits.withdrawBalance(ethers.utils.parseEther("0.1"));
  } catch (error) {
    console.log(error);
  }
}

withdraw()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
