'use client'

import { Coins, Truck } from "@phosphor-icons/react"
import Image from "next/image"

export default function CongratulationPage() {
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
            <div className="max-w-2xl w-full mt-4">
              <div className="flex items-center justify-between border border-gray-300 rounded-lg p-3">
                <div className="w-24 h-20flex items-center mx-5 my-4">
                  <Image src='' width={96} height={86} alt='' />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Tênis</h3>
                  <h3 className="text-gray-500">Nike</h3>
                  <p className="text-xs flex items-center text-gray-500">
                    <Truck size={12} className="mr-2" />
                    Standard Shipping
                  </p>
                </div>
                <div className="flex items-center mx-5">
                  <p>Quantity: </p>
                  <div className="flex items-center mx-3 border border-gray-300 rounded-2xl p-1">
                    <p className="mx-4">3</p>
                  </div>
                </div>
                <h3 className="font-semibold text-lg ">$199.90</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-sm w-full">
          <div className="border border-gray-400 px-6 py-7 rounded-3xl ">
                <h3 className="text-2xl font-bold">Order Summary</h3>
                <div className="font-semibold text-gray-500">
                  <div className="flex justify-between mt-4 text-black">
                    <h4>Summary</h4>
                    <h4>$199.90</h4>
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
                    <h4>$12.89</h4>
                  </div>
                </div>
                <div className="h-[1px] bg-gray-200 rounded mt-7 mb-6" />
                <div>
                  <div className="flex justify-between">
                    <h3>Estimated Total</h3>
                    <h3>$213.87</h3>
                  </div>
                  <div className="flex justify-between text-sm text-blue-800 font-bold leading-none mt-1 items-center">
                    <div className="flex items-center">
                    <Coins size={22} />
                    <p className="ml-1">$AMZ earned</p>

                    </div>
                    <p className="ml-2">+ ${(283.82 / 50).toFixed(2)}</p>
                  </div>
                </div>
          </div>
        </div>
      </div>
    </main>
  )
}