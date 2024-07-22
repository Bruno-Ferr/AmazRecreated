import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import fs from 'fs';
import { AMZToken } from "../typechain-types";

describe("AMZT", function () {
  async function deploy() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, anotherAccount] = await hre.ethers.getSigners();
    const tokenName = 'Amaz';
    const tokenSymbol = 'AMZ';
    const tokenValue = 1000000;

    const Contract = await hre.ethers.getContractFactory("AMZToken");
    const contract = await Contract.deploy(tokenName, tokenSymbol, tokenValue);

    return { contract, owner, otherAccount, anotherAccount, tokenName, tokenSymbol };
  }

  describe("Deployment", function () {
    it("Should set the right token Name", async function () {
      const { contract, tokenName } = await loadFixture(deploy);

      expect(await contract.name()).to.equal(tokenName);
    });
  });

  describe("Payment", function () {
    it("Should not transfer with amz if not enough amz", async function () {
      const { contract, otherAccount } = await loadFixture(deploy);

      const totalInEther = hre.ethers.parseEther((0.006).toString())
      const amzAmount = 0;
      //deveria calcular no contrato o ganho em amz
      await expect(contract.connect(otherAccount).pay(true, amzAmount, {value: false ? 5 : totalInEther})).to.revertedWith("You don't have enough amz");
    });

    it("Should transfer and earn amz", async function () {
      const { contract, otherAccount } = await loadFixture(deploy);

      const totalInEther = hre.ethers.parseEther((0.006).toString())
      const amzAmount = 1;
      //deveria calcular no contrato o ganho em amz
      const tx = await contract.connect(otherAccount).pay(false, amzAmount, {value: false ? 0 : totalInEther})
      tx.wait()

      expect(await contract.connect(otherAccount).seeBalance()).to.equal(BigInt(1 * 10 ** 18));
    });

    it("Should transfer and waste amz", async function () {
      const { contract, otherAccount } = await loadFixture(deploy);

      const totalInEther = hre.ethers.parseEther((0.006).toString())
      const amzAmount = 1;
      //deveria calcular no contrato o ganho em amz
      const tx = await contract.connect(otherAccount).pay(false, amzAmount, {value: false ? 0 : totalInEther})
      tx.wait()

      const tx2 = await contract.connect(otherAccount).pay(true, amzAmount, {value: true ? 0 : totalInEther})
      tx2.wait()

      expect(await contract.connect(otherAccount).seeBalance()).to.equal(0);
    })
  });
});

// describe("AMZ", function () {
//   let myToken: AMZToken;
//   const tokenName = 'Amaz';
//   const tokenSymbol = 'AMZ';

//   before(async () => {
//     // Load deployed contract address from file
//     const deployedContracts = "0x46E7396bbE8cb28BeeBb8835c5d4475F2d7b108E";

//     // Connect to the deployed contract
//     myToken = await hre.ethers.getContractAt("AMZToken", deployedContracts);   
//   });

//   it("Should set the right token Name", async function () {
//     expect(await myToken.name()).to.equal(tokenName);
//     expect(await myToken.symbol()).to.equal(tokenSymbol);
//   });

//   it("Should not transfer with amz if not enough amz", async function () {
//     const [owner, otherAccount] = await hre.ethers.getSigners();

//     const totalInEther = hre.ethers.parseEther((0.006).toString());
//     const tx = await myToken.connect(otherAccount).pay(false, {value: false ? 0 : totalInEther});
//     tx.wait();

//     expect(await myToken.connect(otherAccount).seeBalance()).to.equal(1n);
//   })
// });
