import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_ALCHEMY_RPC; 
const META_MASK_PRIVATE_KEY = process.env.METAMASK_KEY; 
const META_MASK_SECOND_KEY = process.env.METAMASK_SECOND_ACCOUNT_KEY; 

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [META_MASK_PRIVATE_KEY!, META_MASK_SECOND_KEY!]
    }
  }
};

export default config;
