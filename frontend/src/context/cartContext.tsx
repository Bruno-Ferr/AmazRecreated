'use client'
import { ReactNode, createContext, useState } from "react";

interface shopCartProviderProps {
  children: ReactNode
}

interface shopCartContextProps {
  cartList: productInCart[]
  cartNotifications: number
  setCartNotifications: (a: any) => void
  addToCart: (id: number, product: ProductTypes, updateNotifies?: boolean) => void
  removeFromCart: (id: number, updateNotifies?: boolean) => void
  removeAllFromCart: (id: number) => void
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

  function addToCart(id: number, product: ProductTypes, updateNotifies?: boolean) {
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
    if(updateNotifies) {
      setCartNotifications(cartNotifications + 1)
    }
  }

  function removeFromCart(id: number, updateNotifies?: boolean) {
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
    if(updateNotifies) {
      setCartNotifications(cartNotifications - 1)
    }
  }

  function removeAllFromCart(id: number) {
    const productIndex = cartList.findIndex(product => product.id === id);
    if(productIndex != -1) {
      const cartWithoutProduct = cartList.filter(product => product.id !== id)
      setCartList(cartWithoutProduct)
    }
  }

  return (
    <ShopCartContext.Provider value={{cartList, addToCart, removeFromCart, setCartNotifications, cartNotifications, removeAllFromCart}}>
      {children}
    </ShopCartContext.Provider>
  )
}