'use client'
import axios, { AxiosError } from "axios";
import { ethers, Contract, BaseContract } from "ethers";
import { ReactNode, createContext, useEffect, useState } from "react";
import ABI from '../contract/abis/amz.json'
import { toast } from "react-toastify";

interface UserProps {
  name: string
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
  signUp: (data: any) => void
  connectWallet: () => void
  logout: () => void
}

interface UserProviderProps {
  children: ReactNode
}

export const connectContract = async () => {
  try {
    return new Contract(process.env.CONTRACT_ADDRESS!, ABI);
  } catch (error) {
      console.error("Error connecting to contract:", error);
      throw error; // Rethrow the error to handle it elsewhere if needed
    }
}

export const UserContext = createContext({} as UserContextProps)

export function UserProvider({children}: UserProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps) 

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if(userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if(!ethereum) return toast.error('Metamask not found, please install', {theme: 'colored'});

      const provider = new ethers.BrowserProvider(ethereum);

      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        const res = await axios.get(`${process.env.API_ADDRESS}/client/${accounts[0]}`)
        const signer = await provider.getSigner();
        const chain = Number((await provider.getNetwork()).chainId);

        const contract: any = await connectContract()
       
        const balance = await contract.connect(signer).seeBalance()

        const userData = {
          ...res.data.user, 
          wallet: accounts[0],
          balance: ethers.formatEther(balance), 
          signer, 
          currentChain: chain,
          provider,
          isAuthenticated: true
        }

        setUser((prev: any) => (userData))
        localStorage.setItem('user', JSON.stringify(userData))
      }
    } catch (error) {
      console.log(error)
      if(error instanceof AxiosError) {
        toast.error(error?.response?.data, {theme: 'colored'})
      }
    }
  }

  const signUp = async (data: any) => {
    await axios.post(`${process.env.API_ADDRESS}/addUser`, data)
    setUser({...data.user, balance: 0}) 
  }

  const logout = async () => {
    setUser({} as UserProps)
    localStorage.removeItem('user')
  }

  return (
    <UserContext.Provider value={{user, setUser, signUp, connectWallet, logout}}>
      {children}
    </UserContext.Provider>
  )
}