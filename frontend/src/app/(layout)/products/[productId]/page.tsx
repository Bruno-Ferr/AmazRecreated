'use client'
import { ShopCartContext } from "@/context/cartContext";
import { ArrowCircleDown, ArrowCircleUp, ArrowRight, ArrowsClockwise, CaretDown, ChatCircleDots, Clock, Heart, Question, ShoppingCart, Star, StarHalf, Truck } from "@phosphor-icons/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

type ProductProps = {
  amount: Number
  brand: string
  discount: Number
  id: string
  image: string[]
  name: string
  price: number
  reviews: [{
    comment: string
    stars: number
  }]
  shippingFree: boolean
}

export default function Product({ params }: { params: { productId: string } }) {
  const { addToCart } = useContext(ShopCartContext)
  const [product, setProduct] = useState<ProductProps>({} as ProductProps)
  const [average, setAverage] = useState<number>(0)
  
  useEffect(() => {
    axios.get(`${process.env.API_ADDRESS}/products/find/${params.productId}`).then(res => {
      const totalStars = res.data.reviews?.reduce((acc: any, review: any) => acc + review.stars, 0);
      const averageStars = totalStars / res.data.reviews?.length;
  
      // Round the average stars to the nearest half
      const roundedAverage = Math.round(averageStars * 2) / 2;
      setAverage(roundedAverage)
      setProduct(res.data)
    })
  }, [])
  
  return (
    <main className="xl:max-w-7xl m-auto mt-5">
      <div className="flex items-center mb-9">
        <h5 className="text-sm font-bold text-[#9B9A9A]">Popular Products</h5>
        <ArrowRight size={14} weight="bold" className="mx-2" />
        <h5 className="text-sm font-bold text-[#221F1F]">Sneakers</h5>
      </div>
      <div className="flex gap-4">
        <div>
          <div className="flex flex-col gap-4">
            <div className="w-24 h-24 rounded-lg bg-gray-200 border-2 border-orange-500" />
            <div className="w-24 h-24 rounded-lg bg-gray-200" />
            <div className="w-24 h-24 rounded-lg bg-gray-200" />
            <div className="w-24 h-24 rounded-lg bg-gray-200" />
          </div>
          <div className="flex flex-col items-center justify-center mt-4">
            <button>
              <ArrowCircleUp size={32} />
            </button>
            <button>
              <ArrowCircleDown size={32} />
            </button>
          </div>
        </div>
        
        <div className="h-[32rem] w-[32rem] rounded-lg bg-gray-200 flex items-center justify-center">
          {/* <Image src={product?.image[0] || ''} width={32} height={32} alt={product.name} /> */}
        </div>
        <div>
          <h1 className="text-4xl font-semibold">{product?.name}</h1>
          <p className="flex gap-1 font-semibold">by 
            <Link href={'/'} className="underline underline-offset-4 font-bold"> {product?.brand}</Link>
            <Question size={22} weight="fill" className="ml-1 cursor-pointer" /> {/*abri uma caixa informativa*/}
          </p>
          <div className="my-6 flex items-center justify-between">
            <div className="flex">
            {[...new Array(5)].map((_, index) => {
              return index < Math.floor(average) ? <Star size={22} weight="fill" color="#FBB833" key={index} /> :
                    index == Math.floor(average) && average - Math.floor(average) == 0.5 ? 
                    <StarHalf size={22} weight="fill" color="#FBB833" key={index} /> : <Star size={22} color="#ABABAB" key={index} />
            })}
              <p className="text-gray-400 font-medium ml-2">{average}</p>
            </div>
            <div className="flex text-gray-400 gap-2 font-medium">
              <ChatCircleDots className="text-gray-400" size={22} />
              <p>{product?.reviews?.length} reviews</p>
            </div>
          </div>
          <div className="my-6 flex justify-between">
            <p className="text-3xl font-semibold">${product?.price}</p>
            <p className="text-sm flex items-center text-blue-500 font-medium">
              <Truck size={18} className="mr-2" />
              Standard Shipping
            </p>
          </div>
          <div className="my-4">
            <p className="font-medium">Colors available: <span className="font-light">white</span></p>
             
            <div className="flex gap-1">
              <button className="w-6 h-6 rounded-full bg-blue-700 border border-gray-300" />
              <button className="w-6 h-6 rounded-full bg-red-700 border border-gray-3" />
              <button className="w-6 h-6 rounded-full bg-green-700 border border-gray-3" />
              <button className="w-6 h-6 rounded-full bg-pink-700 border border-gray-3" />
              <button className="w-6 h-6 rounded-full bg-gray-200 border border-white" />
            </div>
          </div>
          <div className="my-4">
            <p className="font-medium">Size: <span className="font-light">41</span></p>
             
            <div className="flex gap-1">
              <button className="w-14 h-10 rounded-md border border-gray-300">38</button>
              <button className="w-14 h-10 rounded-md border border-gray-3">39</button>
              <button className="w-14 h-10 rounded-md border border-gray-3">40</button>
              <button className="w-14 h-10 rounded-md border border-gray-3 bg-gray-200">41</button>
              <button className="w-14 h-10 rounded-md border border-gray-3">42</button>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex w-20 bg-gray-200 items-center justify-center py-3 rounded-xl text-gray-500 hover:bg-red-600 hover:text-white ease-in"><Heart size={24} /></button>
            <button className="flex w-52 bg-orange-400 items-center justify-center py-3 rounded-xl text-white" onClick={() => addToCart(Number(product.id), product, true)}><ShoppingCart size={24} /> Add to cart</button>
          </div>
          <div className="my-4">
            <div className="flex my-1">
              <div className="bg-gray-200 rounded-full p-3 flex items-center justify-center">
                <Truck size={18} />
              </div>
              <div className="ml-4">
                <h6 className="font-semibold">Standard Shipping</h6>
                <p className="flex items-center justify-center text-sm font-semibold">Free <span className="flex items-center justify-center font-medium ml-2 text-gray-500"><Clock size={12} className="mr-1" /> Tue, Ago 11 - Thu, Ago 13</span></p>
              </div>
            </div>
            <div className="flex my-1">
              <div className="bg-gray-200 rounded-full p-3 flex items-center justify-center">
                <ArrowsClockwise size={18} />
              </div>
              <div className="ml-4">
                <h6 className="font-semibold">Return Policy</h6>
                <p className="flex items-center justify-center text-sm font-semibold">Free <span className="flex items-center justify-center font-medium ml-2 text-gray-500"><Clock size={12} className="mr-1" /> Within 20 days of receipt</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-28">
        <div className="flex items-center">
          <div className="h-10 w-2 bg-orange-400 rounded-full" />
          <h2 className="text-2xl ml-4 font-semibold">Product description</h2>
        </div>
        <div className="flex gap-20 font-medium text-lg mt-6">
          <button>
            Description
          </button>
          <button className="flex items-center justify-center opacity-60">
            User comments
            <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-orange-400 text-white font-medium text-xs ml-2">123</div>
          </button>
          <button className="flex items-center justify-center opacity-60">
            Question & Answer
            <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-gray-700 text-white font-medium text-xs ml-2">26</div>
          </button>
        </div>
        <div className="flex mt-6 gap-4">
          <div className="w-3/5">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <div className="mt-10 bg-gray-100 h-24 flex items-center justify-around font-medium rounded-md">
              <div className="flex flex-col">
                <p className="text-gray-500">Brand</p>
                <p>{product.brand}</p>          
              </div>
              <div className="flex flex-col">
                <p className="text-gray-500">Style</p>
                <p>Old School</p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-500">Pattern</p>
                <p>Printed</p>
              </div>
            </div>
          </div>
          <div className="w-[28rem] h-64 bg-gray-300 rounded-2xl flex items-center justify-center">
            Video
          </div>
        </div>
      </div>
    </main>
  )
}