import hre from "hardhat";

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
const anotherAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
const owner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

const amount: bigint = 1_000_000_000_000_000_000n;

async function main() {
  const [owner, address1] = await hre.ethers.getSigners();
  const AMZContract = await hre.ethers.getContractAt("AMZToken", contractAddress)
  const transfer = await AMZContract.connect(address1).wasteAMZ(amount)

  console.log(transfer)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});