import { UserContext } from "@/context/userContext";
import { useCallback, useContext } from "react";

interface UserModalProps {
  isOpen: boolean,
  user: {
    name: string,
    email: string,
    balance: number
  }
}

export default function UserModal({isOpen, user}: UserModalProps) {
  const {setUser} = useContext(UserContext)

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

        setUser((prev: any) => ({...prev, wallet: address}))
      } catch (error: Error | any) {
        alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
      }
    } else {
      alert("MetaMask not installed");
    }
  }, []);

  if(isOpen) {
    return (
      <div className="w-72 h-64 absolute rounded-lg bg-white border border-gray-500 top-full p-4 mt-1">
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
          {user?.balance ? (<p>{user.balance}</p>) : (<button onClick={() => _connectToMetaMask()} className="text-blue-500">Connect your wallet</button>)}
        </div>
      </div>
    )
  }
} 