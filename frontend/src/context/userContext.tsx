'use client'
import axios from "axios";
import { ethers, Contract } from "ethers";
import { ReactNode, createContext, useEffect, useState } from "react";
import ABI from '../contract/abis/amz.json'

interface UserProps {
  name: string
  email: string
  balance: number
  wallet?: any
  signer?: any
  currentChain?: any
  provider?: any
  isAuthenticated: boolean
}

interface UserContextProps {
  user: UserProps
  setUser: (value: any) => void 
  login: (data: any) => void
  signUp: (data: any) => void
  connectWallet: () => void
}

interface UserProviderProps {
  children: ReactNode
}

export const connectContract = async () => {
  try {
    return new Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", ABI);
  } catch (error) {
      console.error("Error connecting to contract:", error);
      throw error; // Rethrow the error to handle it elsewhere if needed
    }
}

export const UserContext = createContext({} as UserContextProps)

export function UserProvider({children}: UserProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps) 

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${process.env.API_ADDRESS}/client/1`, )
      setUser(res.data.user)
    }

    fetchUser()
  }, [])

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if(!ethereum) return console.log("Install MetaMask");

      const provider = new ethers.BrowserProvider(ethereum);

      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        const signer = await provider.getSigner();
        const chain = Number((await provider.getNetwork()).chainId);

        const contract = await connectContract()

        const balance = await contract.connect(signer).seeBalance()

        setUser((prev: any) => ({
          ...prev, 
          balance: ethers.formatEther(balance),
          wallet: accounts[0], 
          signer, 
          currentChain: chain,
          provider,
          isAuthenticated: true
        }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const login = async (data: string) => {
    const res = await axios.get(`${process.env.API_ADDRESS}/client/${data}`)
    setUser(res.data.user)
  }

  const signUp = async (data: any) => {
    await axios.post(`${process.env.API_ADDRESS}/addUser`, data)
    setUser({...data.user, balance: 0}) 
  }

  return (
    <UserContext.Provider value={{user, setUser, login, signUp, connectWallet}}>
      {children}
    </UserContext.Provider>
  )
}