'use client';
import { Heart, List, MagnifyingGlass, MapPin, ShoppingCartSimple } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() { 
  const [cartNotifies, setCartNotifies] = useState(0)

  return (
    <div className="border-b-[1px] w-full">
      <div className="xl:max-w-7xl m-auto my-8">
        <div className="flex items-center mb-7">
          <Link
            href="/"
          >
            <Image
              src="/AmazonLogo.png"
              alt="Amazon Logo"
              //className="dark:invert"
              width={125}
              height={48}
              priority
            />
          </Link>
          <button className="flex items-center justify-center  w-40 h-11 bg-[#F9F9F9] ml-16 rounded-lg">
            <MapPin size={16} color="#626060" />
            <div className="flex flex-col ml-2 items-start">
              <p className="font-regular text-xs text-[#B8B8B8]">
                Deliver to 
              </p>
              <p className="font-semibold text-sm leading-3 text-[#626060]">
                Sao Paolo, Brazil
              </p>
            </div>
          </button>
          <div className="flex items-center mx-4 w-full max-w-lg h-11 bg-[#F9F9F9] rounded-lg p-3">
            <MagnifyingGlass size={16} color="#B8B8B8" />
            <input className="ml-2 w-full h-11 bg-[#F9F9F9] rounded-lg focus:border" placeholder="Search for products, brand and more" />
          </div>
          <button className="flex items-center justify-center w-32 h-11 bg-[#F9F9F9] rounded-lg">
            <Heart size={18} color="#626060" />
            <p className="ml-2 text-[#626060]">
              Wishlist  
            </p>
          </button>
          <button className="flex items-center justify-center mx-4 w-12 h-11 bg-[#F9F9F9] rounded-lg relative">
            <ShoppingCartSimple size={18} color="#626060" />
            { !!cartNotifies && 
              <span className="absolute top-[-5px] right-[-5px] px-[6px] py-[2px] bg-[#FF9900] text-[10px] text-white rounded-full">{cartNotifies}</span>
            }
          </button>
          Profile
        </div>
        <nav className="flex items-center">
          <button className="mr-14">
            <List size={27} />
          </button>
          <button className="text-sm font-medium">MEN</button>
          <button className="mx-10 text-sm font-medium">WOMEN</button>
          <button className="text-sm font-medium">KID</button>
          <button className="mx-10 text-sm font-medium">HOME & LIVING</button>
          <button className="text-sm font-medium">ELECTRONICS</button>
          <button className="mx-10 text-sm font-medium">BEAUTY</button>
          <button className="text-sm font-medium">SPORT & FITNESS</button>
          <button className="mx-10 text-sm font-medium">BOOKS</button>
          <button className="text-sm font-medium">MUSIC & GAMES</button>
          <button className="ml-10 text-sm font-medium">GIFT</button>
        </nav>
      </div>
    </div>
  )
}