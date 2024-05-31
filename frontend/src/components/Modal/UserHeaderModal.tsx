import { UserContext } from "@/context/userContext";
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

  if(isOpen) {
    return (
      <div onClick={(e) => e.stopPropagation()} className="w-72 h-64 absolute rounded-lg cursor-default bg-white border border-gray-500 top-full right-[-120px] p-4 mt-1" ref={clickoutRef}>
      {!!user?.wallet ? (
        <div>
          <div className="flex justify-between">
            <p>Nome:</p>  
            <p>{user?.name}</p>  
          </div>
          <div className="flex justify-between">
            <p>Wallet:</p>  
            <p>{user?.wallet}</p>  
          </div>
          <div className="flex justify-between">
            <p>AMZ:</p>  
            {user?.wallet ? (<p>{user.balance}</p>) : (<button onClick={(e) => {e.stopPropagation(); connectWallet()}} className="text-blue-500">Connect your wallet</button>)}
          </div>
        </div>
      ) : (
        <div>
          <button onClick={(e) =>{ e.stopPropagation(); connectWallet()}} className="text-blue-500">Connect your wallet</button>
        </div>
      )}
      </div> 
    )
  }
} 