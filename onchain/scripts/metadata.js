const hre = require("hardhat");

async function setUnrevealedToken() {
  const newUnrevealedUri =
    "https://invisible-spirits-staging.buooy.workers.dev/unrevealed.json";
  // "https://imagedelivery.net/AqCxJcKCbafe6NR8cGYoHg/8539be1b-c6b0-4fb9-fba3-eaa12044e600/public";
  // We get the contract to deploy
  const InvisibleSpirits = await hre.ethers.getContractFactory("BaseContract");
  const invisibleSpirits = await InvisibleSpirits.attach(
    // "0x4b683fb11fbc33ad25b0a1ae51d2343b3bd36ad5"
    "0x483e64456E2EBa8037E57696FCe427716B51b4de"
  );

  try {
    await invisibleSpirits.setNotRevealedURI(newUnrevealedUri);
  } catch (error) {
    console.log(error);
  }
}

setUnrevealedToken()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
