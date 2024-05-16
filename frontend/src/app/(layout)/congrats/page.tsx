'use client'

import { ShopCartContext } from "@/context/cartContext"
import { UserContext } from "@/context/userContext"
import { Coins, Truck } from "@phosphor-icons/react"
import axios from "axios"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"

interface lastPurchaseProps {
  user: string,
  products: [{
    id: number
    product: {
      url: string
      name: string
      price: number
      brand: string
    }
    amount: number
  }]
  AMZEarned: number,
  total: number
}

export default function CongratulationPage() {
  const {user} = useContext(UserContext)
  const {cleanCart} = useContext(ShopCartContext)
  const [lastPurchase, setLastPurchase] = useState<lastPurchaseProps>({} as lastPurchaseProps)

  useEffect(() => {
    cleanCart()
    async function getLastPurchase() {
      const res = await axios.get(`${process.env.API_ADDRESS}/clientLastPurchase/${user.email}`)
      setLastPurchase(res.data.purchase)
    }

    if(user.email != undefined) {
      getLastPurchase()
    }
  }, [user])

  return ( 
    <main>
      <div className="bg-[url('/Confeti.jpg')] bg-cover bg-no-repeat">
        <div className="xl:max-w-7xl m-auto h-96 flex items-center justify-center">
          <div className="flex flex-col">
            <div className="flex flex-col items-center gap-3">
                <div className="rounded-2xl bg-orange-100 h-20 w-20 flex items-center justify-center" >
                  <Image src={'/hand-gesture.png'} height={65} width={35} alt="OK" />
                </div>
                <h2 className="text-4xl font-medium text-[#221F1F] mt-6">Thanks for your order!</h2>
              </div>
          </div>
        </div>
      </div>
      <div className="xl:max-w-7xl m-auto mt-5 flex justify-between">
        <div>
          <h2 className="text-2xl font-medium text-[#221F1F]">Package Contents</h2>
          <div>
            {/* Deve vir do back-end */}
            {lastPurchase?.products?.map(content => {
              return (
                <div className="max-w-2xl w-full mt-4">
                  <div className="flex items-center justify-between border border-gray-300 rounded-lg p-3">
                    <div className="w-24 h-20flex items-center mx-5 my-4">
                      <Image src={content.product.url} width={96} height={86} alt={content.product.name} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{content.product.name}</h3>
                      <h3 className="text-gray-500">{content.product.brand}</h3>
                      <p className="text-xs flex items-center text-gray-500">
                        <Truck size={12} className="mr-2" />
                        Standard Shipping
                      </p>
                    </div>
                    <div className="flex items-center mx-5">
                      <p>Quantity: </p>
                      <div className="flex items-center mx-3 border border-gray-300 rounded-2xl p-1">
                        <p className="mx-4">{content.amount}</p>
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg ">${content.product.price}</h3>
                  </div>
                </div>
              )
            })}
            
          </div>
        </div>
        <div className="max-w-sm w-full">
          <div className="border border-gray-400 px-6 py-7 rounded-3xl ">
                <h3 className="text-2xl font-bold">Order Summary</h3>
                <div className="font-semibold text-gray-500">
                  <div className="flex justify-between mt-4 text-black">
                    <h4>Summary</h4>
                    <h4>${lastPurchase?.total?.toFixed(2)}</h4>
                  </div>
                  <div className="flex justify-between mt-4">
                    <h4>savings</h4>
                    <h4>-$0.00</h4>
                  </div>
                  <div className="flex justify-between mt-4">
                    <h4>Standard shipping</h4>
                    <h4>Free</h4>
                  </div>
                  <div className="flex justify-between mt-4">
                    <h4>Taxes</h4>
                    <h4>${(lastPurchase?.total * (2 / 100))}</h4>
                  </div>
                </div>
                <div className="h-[1px] bg-gray-200 rounded mt-7 mb-6" />
                <div>
                  <div className="flex justify-between">
                    <h3>Estimated Total</h3>
                    <h3>${lastPurchase?.total?.toFixed(2)}</h3>
                  </div>
                  <div className="flex justify-between text-sm text-blue-800 font-bold leading-none mt-1 items-center">
                    <div className="flex items-center">
                    <Coins size={22} />
                    <p className="ml-1">$AMZ earned</p>

                    </div>
                    <p className="ml-2">${lastPurchase?.AMZEarned}</p>
                  </div>
                </div>
          </div>
        </div>
      </div>
    </main>
  )
}