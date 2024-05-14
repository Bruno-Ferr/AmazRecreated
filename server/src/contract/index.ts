import { ethers } from "ethers"
import Token from "../../AMZToken.sol/AMZToken.json"

export async function connect(addr: string) {
  try {
    const provider = new ethers.JsonRpcProvider()
    const tokenAddr = process.env.TOKEN_ADDR || "" //Could be the ENS; Salvo no env
    const someoneAddr = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" //Recebido do front end
    const owner = await provider.getSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")

    const signer = await provider.getSigner(someoneAddr)
    const AMZContract = new ethers.Contract(tokenAddr, Token.abi, provider)
  
    return {signer, AMZContract, owner}
  } catch (err) {
    throw new Error("Impossible to connect to AMZ network")
  }
}

export async function earnAMZ(addr: string, value: string) {
  try{
    const {AMZContract, owner, signer} = await connect(addr)
  
    const amount = ethers.parseEther(value)

    await AMZContract.connect(owner).earnAMZ(signer, amount)
    return;
  } catch (err) {
    throw new Error('Something went wrong earning AMZ')
  }
}

export async function wasteAMZ(addr: string) {

}

export async function seeBalance(addr: string) {
  try {
    const {signer, AMZContract} = await connect(addr)
  
    const balance = await AMZContract.connect(signer).seeBalance()
  
    return balance
  } catch (err) {
    throw new Error('Cannot get user balance')
  }
}