import { UserContext } from "@/context/userContext";
import { Coins, Copy, Scroll } from "@phosphor-icons/react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";

interface UserModalProps {
  isOpen: boolean
  setOpen: (value: boolean) => void
}

export default function UserModal({isOpen, setOpen}: UserModalProps) {
  const {user, setUser, login, signUp, connectWallet} = useContext(UserContext)
  const clickoutRef = useRef<HTMLDivElement>(null);

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

  function formatWalletAddress(address: string) {
    if (!address) return '';
    return address.substring(0, 6) + '...' + address.substring(address.length - 4);
  }

  if(isOpen) {
    return (
      <div onClick={(e) => e.stopPropagation()} className="w-72 h-64 absolute rounded-lg cursor-default bg-white border border-gray-500 top-full right-[-120px] p-4 mt-1" ref={clickoutRef}>
      {!!user?.wallet ? ( 
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
          <button onClick={(e) =>{ e.stopPropagation(); connectWallet()}} className="text-white font-medium bg-gray-700 rounded-md py-2 w-full">SignUp</button>
        </div>
      )}
      </div> 
    )
  }
} 