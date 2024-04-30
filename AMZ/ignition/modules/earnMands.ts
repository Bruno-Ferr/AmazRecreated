import hre from "hardhat";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const anotherAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

const amount: bigint = 1_000_000_000_000_000_000n;

async function main() {
  const AMZContract = await hre.ethers.getContractAt("AMZToken", contractAddress)
  const transfer = await AMZContract.connect().earnAMZ(anotherAddress, amount)

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});