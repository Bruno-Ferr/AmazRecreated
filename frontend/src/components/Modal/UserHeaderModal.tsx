import { UserContext } from "@/context/userContext";
import axios from "axios";
import { useCallback, useContext, useEffect, useRef } from "react";

interface UserModalProps {
  isOpen: boolean
  setOpen: (value: boolean) => void
}

export default function UserModal({isOpen, setOpen}: UserModalProps) {
  const {user, setUser} = useContext(UserContext)
  const clickoutRef = useRef<HTMLDivElement>(null);

  const connecWallet = async () => {
    
    try {
      if(!window.ethereum) return console.log("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const firstAccount = accounts[0]
      setUser((prev: any) => ({...prev, wallet: firstAccount}))
      return firstAccount;
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        clickoutRef.current &&
        !clickoutRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  if(isOpen) {
    return (
      <div className="w-72 h-64 absolute rounded-lg bg-white border border-gray-500 top-full p-4 mt-1" ref={clickoutRef}>
        <div className="flex justify-between">
          <p>Nome:</p>  
          <p>{user?.name}</p>  
        </div>
        <div className="flex justify-between">
          <p>Email:</p>  
          <p>{user?.email}</p>  
        </div>
        <div className="flex justify-between">
          <p>AMZ:</p>  
          {user?.wallet ? (<p>{user.balance}</p>) : (<button onClick={(e) =>{e.stopPropagation(); connecWallet()}} className="text-blue-500">Connect your wallet</button>)}
        </div>
      </div>
    )
  }
} 