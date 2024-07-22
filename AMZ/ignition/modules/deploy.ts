import hre from "hardhat";

const tokenName = 'Amaz';
const tokenSymbol = 'AMZ';
const AMZAmount = 100000000;

async function deploy() {
  const [owner] = await hre.ethers.getSigners();
  const MyToken = await hre.ethers.getContractFactory("AMZToken");
  const token = await MyToken.deploy(tokenName, tokenSymbol, AMZAmount);
  const tokenAddr = await token.getAddress()

  console.log(
    `Token deployed to ${tokenAddr}`,
    `Owner: ${owner.address}`
  );
}

deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});