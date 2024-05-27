'use client'
import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

interface UserProps {
  name: string
  email: string
  balance: number
  wallet?: any
}

interface UserContextProps {
  user: UserProps
  setUser: (value: any) => void 
  login: (data: any) => void
  signUp: (data: any) => void
}

interface UserProviderProps {
  children: ReactNode
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

  const login = async (data: string) => {
    const res = await axios.get(`${process.env.API_ADDRESS}/client/${data}`)
    setUser(res.data.user)
  }

  const signUp = async (data: any) => {
    await axios.post(`${process.env.API_ADDRESS}/addUser`, data)
    setUser({...data.user, balance: 0}) 
  }

  return (
    <UserContext.Provider value={{user, setUser, login, signUp}}>
      {children}
    </UserContext.Provider>
  )
}