'use client';
import { ShopCartContext } from "@/context/cartContext";
import { CaretDown, Heart, List, MagnifyingGlass, MapPin, ShoppingCartSimple } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import UserModal from "../Modal/UserHeaderModal";
import axios from "axios";
import { UserContext } from "@/context/userContext";

interface UserProps {
  name: string,
  email: string,
  balance: number
}

export default function Header() { 
  const [cartNotifies, setCartNotifies] = useState()
  const { cartNotifications } = useContext(ShopCartContext)
  const [openUserModal, setOpenUserModal] = useState(false)
  const {user} = useContext(UserContext)

  return (
    <div className="static">
    <div className="w-full">
      <div className="xl:max-w-7xl m-auto mt-8">
        <div className="flex items-center justify-between mb-3 w-full">
          <div>
            <Link
              href="/"
              className="self-center"
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
          </div>
          <button className="flex items-center justify-center  w-40 h-11 bg-[#F9F9F9] ml-16 rounded-lg">
            <MapPin size={16} color="#626060" />
            <div className="flex flex-col mx-2 items-start">
              <p className="font-regular text-xs text-[#B8B8B8]">
                Deliver to 
              </p>
              <p className="font-semibold text-sm leading-3 text-[#626060]">
                Sao Paulo, Brazil
              </p>
            </div>
            <CaretDown size={12} color="#646262"/>
          </button>
          <div className="flex items-center mx-4 w-full max-w-lg h-11 bg-[#F9F9F9] rounded-lg p-2">
            <MagnifyingGlass size={16} color="#B8B8B8" />
            <input className="ml-2 p-1 w-full h-11 bg-[#F9F9F9] rounded-lg focus:ring-1 focus:ring-inset focus:ring-gray-300" placeholder="Search for products, brand and more" />
          </div>
          <button className="flex items-center justify-center w-32 h-11 bg-[#F9F9F9] rounded-lg text-[#626060] hover:bg-[#ff3c00] ease-in-out hover:text-white">
            <Heart size={18} />
            <p className="ml-2 ">
              Wishlist  
            </p>
          </button>
          <Link href={"/cart"} className="flex items-center justify-center mx-4 w-12 h-11 bg-[#F9F9F9] rounded-lg relative hover:bg-[#FF9900] ease-in-out hover:text-white">
            <ShoppingCartSimple size={18} />
            { !!cartNotifications && 
              <span className="absolute top-[-5px] right-[-5px] px-[6px] py-[2px] bg-[#FF9900] text-[10px] text-white rounded-full">{cartNotifications}</span>
            }
          </Link>
          <button className="flex items-center relative" onClick={() => setOpenUserModal(prev => !openUserModal)}> 
            <Image
              src="/ToYou.jpg"
              width={40}
              height={40}
              alt="Profile photo"
              className="rounded-lg"
            />
            <div className="flex items-center">
              <p className="text-sm text-[#646262] mx-2">{user?.name}</p>
              <CaretDown size={12} color="#646262"/>
            </div>
          </button>
          <UserModal isOpen={openUserModal} setOpen={setOpenUserModal} />
        </div>
      </div>
    </div>
    <div className="border-b-[1px] w-full bg-[#232f3e]">
      <div className="xl:max-w-7xl mx-auto py-4 flex">
        <nav className="flex items-center justify-between text-white w-full">
          <div>
            <button className="mr-14">
              <List size={27} />
            </button>
          </div>
          <div>
            <button className="text-sm font-medium">MEN</button>
            <button className="mx-12 text-sm font-medium">WOMEN</button>
            <button className="text-sm font-medium">KID</button>
            <button className="mx-12 text-sm font-medium">HOME & LIVING</button>
            <button className="text-sm font-medium">ELECTRONICS</button>
            <button className="mx-12 text-sm font-medium">BEAUTY</button>
            <button className="text-sm font-medium">SPORT & FITNESS</button>
            <button className="mx-12 text-sm font-medium">BOOKS</button>
            <button className="text-sm font-medium">MUSIC & GAMES</button>
            <button className="ml-12 text-sm font-medium">GIFT</button>
          </div>
        </nav>
      </div>
    </div>
    </div>
  )
}