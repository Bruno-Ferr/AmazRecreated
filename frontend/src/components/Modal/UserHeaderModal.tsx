import { UserContext } from "@/context/userContext";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";

interface UserModalProps {
  isOpen: boolean
  setOpen: (value: boolean) => void
}

export default function UserModal({isOpen, setOpen}: UserModalProps) {
  const {user, setUser, login, signUp} = useContext(UserContext)
  const clickoutRef = useRef<HTMLDivElement>(null);
  const [inputV, setInputV] = useState('')
  const [myName, setMyName] = useState('')
  const [myEmail, setMyEmail] = useState('')

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
      <div onClick={(e) => e.stopPropagation()} className="w-72 h-64 absolute rounded-lg cursor-default bg-white border border-gray-500 top-full right-[-120px] p-4 mt-1" ref={clickoutRef}>
      {!!user?.email ? (
        <div>
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
            {user?.wallet ? (<p>{user.balance}</p>) : (<button onClick={(e) => {e.stopPropagation(); connecWallet()}} className="text-blue-500">Connect your wallet</button>)}
          </div>
        </div>
      ) : (
        <div>
          <label htmlFor="">Insira seu E-mail</label>
          <input type="email" value={inputV} onClick={(e) => e.stopPropagation()} onChange={(e) => {setInputV(e.target.value)}}/>
          <button className="bg-orange-400 py-1 px-2 rounded-md" onClick={(e) => {e.stopPropagation(); login(inputV)}}>Login</button>
          <p>or</p>
          <button onClick={(e) =>{ e.stopPropagation(); connecWallet()}} className="text-blue-500">Connect your wallet</button>
          <p>Doesn't have an account?</p>
          <input type="text" placeholder="your name" value={myName} onClick={(e) => e.stopPropagation()} onChange={(e) => {setMyName(e.target.value)}}/>
          <input type="email" placeholder="your email" value={myEmail} onClick={(e) => e.stopPropagation()} onChange={(e) => {setMyEmail(e.target.value)}}/>
          <button className="bg-green-400 py-1 px-2 rounded-md" onClick={(e) => {e.stopPropagation(); signUp({user: {email: myEmail, name: myName}})}}>SignUp</button> {/* talvez outra tela para adiciona nome + email */}
        </div>
      )}
      </div> 
    )
  }
} 