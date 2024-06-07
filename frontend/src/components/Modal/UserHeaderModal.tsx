import { UserContext } from "@/context/userContext";
import { ArrowLeft, Coins, Copy, Scroll } from "@phosphor-icons/react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

interface UserModalProps {
  isOpen: boolean
  setOpen: (value: boolean) => void
}

export default function UserModal({isOpen, setOpen}: UserModalProps) {
  const {user, setUser, login, signUp, connectWallet} = useContext(UserContext)
  const [signUpFormOpen, setSignUpFormOpen] = useState(false)
  const [walletInput, setWalletInput] = useState<any>()
  const [userName, setUserName] = useState<any>('')
  const clickoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        clickoutRef.current &&
        !clickoutRef.current.contains(event.target as Node)
      ) {
        setSignUpFormOpen(false)
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  function formatWalletAddress(address: string) {
    if (!address) return '';
    return address.substring(0, 6) + '...' + address.substring(address.length - 4);
  }

  const getAddress = async () => {
    try {
      const { ethereum } = window;
      if(!ethereum) return console.log("Install MetaMask");

      const provider = new ethers.BrowserProvider(ethereum);

      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        setWalletInput(accounts[0])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createUser = async () => {
    const user = {
      userName,
      userAddress: walletInput
    }

    try{
      await axios.post(`${process.env.API_ADDRESS}/addUser`, user)
  
      toast.success('User created', {theme: 'colored'})
      //Set user
      setSignUpFormOpen(false)
    } catch (err) {
      if(err instanceof Error) {
        toast.error(err.response.data.message, {theme: 'colored'}) //Verificar como tipar da maneira correta
      }
    }
  }

  if(isOpen) {
    return (
      <div onClick={(e) => e.stopPropagation()} className="w-72 h-64 absolute rounded-lg cursor-default bg-white border border-gray-500 top-full right-[-120px] p-4 mt-1" ref={clickoutRef}>
      {
        signUpFormOpen ? (
          <div className="flex flex-col font-medium">
            <button onClick={() => setSignUpFormOpen(false)}>
              <ArrowLeft size={18} className="text-gray-400" />
            </button>
            <label htmlFor="name" className="mt-2">Name:</label>
            <input type="text" name="name" placeholder="E.g: John Doe" onChange={(e) => setUserName(e.target.value)} 
              className="border border-gray-300 p-1 rounded-md"
            />
            <label htmlFor="" className="mt-1">Address:</label>
            {!walletInput ? (
              <button 
                className="text-blue-500 py-2 easy-in-out duration-300 rounded-md hover:bg-blue-500 hover:text-white hover:before:content-[attr(before)] before:content-[attr(after)]"
                before="Click to connect"
                after="Connect your wallet"
                onClick={() => getAddress()}
              />
            ) : (
              <p>{formatWalletAddress(walletInput)}</p>
            )}
            <button className="text-white font-medium bg-orange-400 rounded-md py-2 w-full mt-8" onClick={() => createUser()}>Save</button>
          </div>
        ) : !!user?.wallet ? ( 
          <div className="font-medium flex flex-col">
            <div className="flex justify-center">
              <h2 className="text-lg">{user?.name}</h2>  
            </div>
            <button className="flex justify-between mt-2">
              <p>Wallet:</p>  
              <p>{formatWalletAddress(user?.wallet)}</p>  
              <Copy size={18} />
            </button>
            <div className="w-full h-[1px] bg-gray-300 my-2" />
            <div className="flex justify-end mt-2 text-blue-600">
              <Coins size={22} />
              <p className="ml-2"> {user.balance} AMZ</p>
            </div>
            <button className="flex justify-end mt-2">
              <Scroll size={22} />
              Last purchases
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-end h-full">
  
            <button onClick={(e) =>{ e.stopPropagation(); connectWallet()}} className="text-white font-medium bg-orange-400 rounded-md py-2 w-full">Login</button>
            <div className="flex items-center justify-between my-4">
              <div className="w-1/3 h-[1px] bg-gray-300 rounded-sm" />
              <p className="text-gray-400 font-medium">Or</p>
              <div className="w-1/3 h-[1px] bg-gray-300 rounded-sm" />
            </div>
            <button onClick={(e) =>{ e.stopPropagation(); setSignUpFormOpen(true)}} className="text-white font-medium bg-gray-700 rounded-md py-2 w-full">SignUp</button>
          </div>
        )
      }
      </div> 
    )
  }
} 