'use client'
import { ReactNode, createContext, useState } from "react";

interface shopCartProviderProps {
  children: ReactNode
}

interface shopCartContextProps {
  cartList: productInCart[]
  cartNotifications: number
  setCartNotifications: (a: any) => void
  addToCart: (id: number, product: ProductTypes) => void
  removeFromCart: (id: number) => void
}

type productInCart = {
  id: number
  amount: number
  product: ProductTypes
}

type ProductTypes = {
  id: number
  url: string
  name: string
  brand: string
  stars: number
  reviews: number
  frete: boolean
  price: number
  discount: string
}

export const ShopCartContext = createContext({} as shopCartContextProps)

export function ShopCartProvider({children}: shopCartProviderProps) {
  const [cartList, setCartList] = useState<productInCart[]>([]);
  const [cartNotifications, setCartNotifications] = useState(0)

  function addToCart(id: number, product: ProductTypes) {
    const productIndex = cartList.findIndex(product => product.id === id);
    if(productIndex != -1) {
      setCartList(prev => {
        const updatedCart = [...prev];
        updatedCart[productIndex] = {
          ...updatedCart[productIndex],
          amount: updatedCart[productIndex].amount + 1
        };
        return updatedCart;
      });
    } else {
      setCartList(prev => [...prev, {id, product, amount: 1}])
    }
    setCartNotifications(cartNotifications + 1)
  }

  function removeFromCart(id: number) {
    const productIndex = cartList.findIndex(product => product.id === id);
    if(productIndex != -1) {
      const productAmount = cartList[productIndex]
      if(productAmount.amount > 1) {
        setCartList(prev => {
          const updatedCart = [...prev];
          updatedCart[productIndex] = {
            ...updatedCart[productIndex],
            amount: updatedCart[productIndex].amount - 1
          };
          return updatedCart;
        });
      } else {
        const cartWithoutProduct = cartList.filter(product => product.id !== id)
        setCartList(cartWithoutProduct)
      }
    }
    setCartNotifications(cartNotifications - 1)
  }

  return (
    <ShopCartContext.Provider value={{cartList, addToCart, removeFromCart, setCartNotifications, cartNotifications}}>
      {children}
    </ShopCartContext.Provider>
  )
}