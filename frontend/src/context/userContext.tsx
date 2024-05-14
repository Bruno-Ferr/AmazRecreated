'use client'
import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

interface UserProps {
  name: string
  email: string
  balance: number
}

interface UserContextProps {
  user: UserProps
  setUser: (value: any) => void 
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
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}