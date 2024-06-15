'use client'
import { ShopCartContext } from "@/context/cartContext"
import { ArrowLeft, Coins, Minus, Plus, Truck, X } from "@phosphor-icons/react"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useContext, useEffect, useState } from "react"
import { WeiPerEther, ethers, parseEther } from "ethers";
import axios from "axios"
import Product from "../products/page"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { UserContext, connectContract } from "@/context/userContext"
import { Contract } from "ethers"
import ABI from '../../../contract/abis/amz.json'

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export default function Cart() {
  const {cartList, setCartNotifications, removeFromCart, addToCart, removeAllFromCart} = useContext(ShopCartContext)
  const {user, setUser} = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const totalPrice = cartList.reduce((total, item) => {
    return total + (item.amount * Number(item.product.price))
  }, 0)
  const router = useRouter()

  const taxesPrice = totalPrice * (2/100)
    
  async function purchase() {
    if(typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);

      const data = {
        userAddr: user.wallet,
        products: cartList
      }
      
      const res = await axios.post(`${process.env.API_ADDRESS}/purchase`, data)
      setUser((prev: any) => ({...prev, balance: res.data.balance}))
      toast.success("Purchase completed!", {theme: 'colored'});
      router.push('./congrats')
    }
  }

  async function purchaseEth(withAmz: boolean) { //Trocar para comprar com AMZ ou não
    setLoading(true)
    const data = {
      userAddr: user.wallet,
      purchase: cartList
    }
    let bookingId
    try {
      const res = await axios.post(`${process.env.API_ADDRESS}/purchase`, data)

      bookingId = res.data.bookId
      if(res.status != 200) return toast.error('Something went wrong') 
      const contract: any = await connectContract();

      const totalInEther = (res.data.totalPrice * 0.00027).toString()
      const amzEarned = !withAmz ? Math.floor(res.data.totalPrice / 20) : 0

      await contract.connect(user.signer).pay(withAmz, amzEarned, parseEther(totalInEther), {value: withAmz ? parseEther(totalInEther) : 0}) 

      // const balance = await contract.connect(user.signer).seeBalance()
      // setUser((prev: any) => ({
      //   ...prev, 
      //   balance: ethers.formatEther(balance)
      // }))
      
      toast.success('Purchase concluded')
    } catch (err) {
      console.log(err)
      //Se der erro, reverter backend de agendamento
      const res = await axios.delete(`${process.env.API_ADDRESS}/purchase/${bookingId}`)
      toast.error(res.data.message, {theme: 'colored'})
    }
    setLoading(false)
  }
  
  useEffect(() => {
    setCartNotifications(0)
  }, [])

  return (
    <main className="xl:max-w-7xl m-auto mt-5">
      <Link href={"/products"} className="flex items-center mb-9">
        <ArrowLeft size={14} weight="bold" className="mx-2" />
        <h5 className="text-sm font-bold text-[#221F1F]">Return to Shopping</h5>
      </Link>
      <div>
        <div className="flex justify-between">
          <div>
            <div className="flex gap-3 mb-9">
              <h2 className="text-4xl font-medium text-[#221F1F]">Shopping cart</h2>
              <h4 className="text-lg font-medium text-[#9B9A9A]">{cartList.length}{cartList.length > 1 ? ' results' : ' result'}</h4>
            </div>
            {cartList.map(product => {
              return (
                <div className="w-4xl mt-4 relative" key={product.product.id}>
                  <div className="flex items-center justify-between border border-gray-300 rounded-lg py-3">
                    <div className="w-24 h-20flex items-center mx-5 my-4">
                      <Image src={product.product.image[0]} width={96} height={86} alt={product.product.name} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{product.product.name}</h3>
                      <h3 className="text-gray-500">{product.product.brand}</h3>
                      <p className="text-xs flex items-center text-gray-500">
                        <Truck size={12} className="mr-2" />
                        Standard Shipping
                      </p>
                    </div>
                    <div className="flex items-center justify-around mx-5 border border-gray-300 rounded-2xl w-24 max-w-24 py-1">
                      <button className="text-gray-400 ml-2" onClick={() => removeFromCart(product.id)}><Minus size={16} /></button>
                      <p className="w-2/3 flex items-center justify-center">{product.amount}</p>
                      <button className="text-gray-400 mr-2" onClick={() => addToCart(product.id, product.product)}><Plus size={16} /></button>
                    </div>
                    <h3 className="font-semibold text-lg mr-4">${product.amount * Number(product.product.price)}</h3>
                    <button onClick={() => removeAllFromCart(product.id)} className="absolute top-2 right-2 rounded-full p-1">
                        <X size={16} />
                    </button>
                  </div>
                </div>
              )
            })}
            
          </div>
          <div className="max-w-sm w-full"> {/* Sumário container */}
            <div className="border border-gray-400 px-6 py-7 rounded-3xl ">
              <h3 className="text-2xl font-bold">Summary</h3>
              <div className="font-semibold text-gray-500">
                <div className="flex justify-between mt-4 text-black">
                  <h4>Summary</h4>
                  <h4>${totalPrice}</h4>
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
                  <h4>${taxesPrice}</h4>
                </div>
              </div>
              <div className="h-[1px] bg-gray-200 rounded mt-7 mb-6" />
              <div>
                <div className="flex justify-between">
                  <h3>Estimated Total</h3>
                  <h3>${totalPrice + taxesPrice}</h3>
                </div>
                <div className="flex justify-between text-sm text-blue-800 font-bold leading-none mt-1 items-center">
                  <div className="flex items-center">
                  <Coins size={22} />
                  <p className="ml-1">$AMZ</p>

                  </div>
                  <p className="ml-2">+ ${(totalPrice / 50).toFixed(2)}</p>
                </div>
                {loading ? (
                  <div className="bg-[#FF9900] w-full rounded-full p-4 mt-7 text-white font-semibold text-lg">
                    Loading...
                  </div>
                ) : (
                  <div>
                    <button onClick={() => purchaseEth(false)} className="bg-[#FF9900] w-full rounded-full p-4 mt-7 text-white font-semibold text-lg">Buy with Ether</button>
                    <p>Or</p>
                    <button onClick={() => purchaseEth(true)} className="bg-[#5900ff] w-full rounded-full p-4 mt-7 text-white font-semibold text-lg">Buy with Amz points</button>
                  </div>
                ) }
              </div>
            </div>
            <div className="flex w-full border bg-gray-200 rounded-lg h-11 mt-4">
              <input type="text" className="w-4/5 bg-gray-200 rounded-l-lg p-3" placeholder="Discount code here"/>
              <button className="bg-[#FF9900] w-1/5 rounded-lg text-white font-semibold">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}