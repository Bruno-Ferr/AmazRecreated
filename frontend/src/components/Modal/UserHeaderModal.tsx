import { UserContext } from "@/context/userContext";
import { ArrowLeft, Coins, Copy, Scroll } from "@phosphor-icons/react";
import axios, { AxiosError } from "axios";
import { ButtonHTMLAttributes, useContext, useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

interface UserModalProps {
  isOpen: boolean
  setOpen: (value: boolean) => void
}

export default function UserModal({isOpen, setOpen}: UserModalProps) {
  const {user, setUser, signUp, connectWallet, logout} = useContext(UserContext)
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
        setUser({
          wallet: accounts[0]
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createUser = async () => {
    const userData = {
      userName,
      userAddress: user.wallet
    }

    try{
      await axios.post(`${process.env.API_ADDRESS}/addUser`, userData)
  
      toast.success('User created', {theme: 'colored'})
      //Set user
      setSignUpFormOpen(false)
    } catch (err) {
      if(err instanceof AxiosError) {
        toast.error(err?.response?.data.message, {theme: 'colored'}) //Verificar como tipar da maneira correta
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
            {!user.wallet ? (
              <button 
                className={`text-blue-500 py-2 easy-in-out duration-300 rounded-md hover:bg-blue-500 hover:text-white hover:before:content-["Click_to_connect"] before:content-["Connect_your_wallet"]`}
                onClick={() => getAddress()}
              />
            ) : (
              <p className="m-auto">{formatWalletAddress(user.wallet)}</p>
            )}
            <button className="text-white font-medium bg-orange-400 rounded-md py-2 w-full mt-8" onClick={() => createUser()}>Save</button>
          </div>
        ) : true ? ( 
          <div className="font-medium flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-center">
                <h2 className="text-lg">{user?.name}John Doe</h2>  
              </div>
              <button className="flex flex-row justify-between mt-2 w-full">
                <p>Wallet:</p>  
                <p>{formatWalletAddress(user?.wallet)}</p>  
                <Copy size={18} />
              </button>
              <div className="w-full h-[1px] bg-gray-300 my-2" />
              <div className="flex justify-end mt-2 text-blue-600">
                <Coins size={22} />
                <p className="ml-2"> {user.balance} AMZ</p>
              </div>
              <button className="flex justify-end mt-2 w-full">
                <Scroll size={22} />
                Last purchases
              </button>
            </div>
            <button onClick={(e) =>{ e.stopPropagation(); logout()}} className="text-white font-medium bg-red-600 rounded-md py-1 w-1/2 mx-auto items-end">
              Exit
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