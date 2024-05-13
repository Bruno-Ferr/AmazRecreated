'use client'

import Image from "next/image"

export default function CongratulationPage() {
  return ( 
    <main className="bg-[url('/congrats.jpg')]">
      <div className="xl:max-w-7xl m-auto">

      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-2xl bg-orange-100 h-20 w-20 flex items-center justify-center" >
              <Image src={'/thanks.png'} height={65} width={65} alt="OK" />
            </div>
            <h2 className="text-4xl font-medium text-[#221F1F] mt-6">Thanks for your order!</h2>
          </div>
        </div>
      </div>
    </main>
  )
}