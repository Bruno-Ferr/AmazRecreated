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

  //connect to metamask
  const _connectToMetaMask = useCallback(async () => {
    const ethereum = window.ethereum;
    // Check if MetaMask is installed
    if (typeof ethereum !== "undefined") {
      try {
        // Request access to the user's MetaMask accounts
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        // Get the connected Ethereum address
        const address = accounts[0];
        // Check address in console of web browser
        console.log("connected to MetaMask with address: ", address);
        const res = await axios.get(`${process.env.API_ADDRESS}/clientBalance/${address}`)

        setUser((prev: any) => ({...prev, wallet: address, balance: res.data}))
      } catch (error: Error | any) {
        alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
      }
    } else {
      alert("MetaMask not installed");
    }
  }, []);

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
          {user?.wallet ? (<p>{user.balance}</p>) : (<button onClick={() => _connectToMetaMask()} className="text-blue-500">Connect your wallet</button>)}
        </div>
      </div>
    )
  }
} 