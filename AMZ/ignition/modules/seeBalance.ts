import hre from "hardhat";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

const amount: bigint = 1_000_000_000_000_000_000n;

async function main() {
  const [owner, address1] = await hre.ethers.getSigners();
  const AMZContract = await hre.ethers.getContractAt("AMZToken", contractAddress)
  const balance = await AMZContract.connect(owner).seeBalance()

  console.log(BigInt(balance))
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});