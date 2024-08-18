'use client';
import { ShopCartContext } from "@/context/cartContext";
import { CaretDown, CaretRight, Heart, List, MagnifyingGlass, MapPin, ShoppingCartSimple } from "@phosphor-icons/react";
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
  const { user } = useContext(UserContext)
  const [openMobile, setOpenMobile] = useState(false)

  return (
    <div className="static">
    <div className="w-full">
      <div className="xl:max-w-7xl lg:max-w-5xl max-w-md mx-2 md:mx-auto mt-8">
        <div className="flex items-center justify-between mb-3 w-full relative">
          <div>
            <Link
              href="/"
              className="self-center"
            >
              <Image
                src="/Amaz.png"
                alt="Amaz Logo"
                //className="dark:invert"
                width={125}
                height={48}
                priority
              />
            </Link>
          </div>
          <button className="hidden md:flex items-center justify-center  w-40 h-11 bg-[#F9F9F9] ml-16 rounded-lg">
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
          <div className="hidden md:flex items-center w-full max-w-lg h-11 bg-[#F9F9F9] rounded-lg p-2 mx-1 md:mx-4 lg:mx-6">
            <MagnifyingGlass size={16} color="#B8B8B8" />
            <input className="ml-2 p-1 w-full h-11 bg-[#F9F9F9] rounded-lg focus:ring-1 focus:ring-inset focus:ring-gray-300" placeholder="Search for products, brand and more" />
          </div>
          <button className="hidden md:flex items-center justify-center w-32 h-11 bg-[#F9F9F9] rounded-lg text-[#626060] hover:bg-[#ff3c00] ease-in-out hover:text-white">
            <Heart size={18} />
            <p className="ml-2 ">
              Wishlist  
            </p>
          </button>
          <div className="flex">
            <Link href={"/cart"} className="flex items-center justify-center mx-4 w-12 h-11 bg-[#F9F9F9] rounded-lg relative hover:bg-[#FF9900] ease-in-out hover:text-white">
              <ShoppingCartSimple size={18} />
              { !!cartNotifications && 
                <span className="absolute top-[-5px] right-[-5px] px-[6px] py-[2px] bg-[#FF9900] text-[10px] text-white rounded-full">{cartNotifications}</span>
              }
            </Link>
            <button className="flex items-center relative" onClick={(e) => setOpenUserModal(prev => !openUserModal)}> 
              <Image
                src="/user.png"
                width={20}
                height={20}
                alt="Profile photo"
                className="rounded-lg"
              />
              <div className="flex items-center">
                <p className="text-sm text-[#646262] mx-2">{user?.name}</p>
                <CaretDown size={12} color="#646262"/>
              </div>
            </button>
          </div>
          <UserModal isOpen={openUserModal} setOpen={setOpenUserModal} />
        </div>
      </div>
    </div>
    <div className="border-b-[1px] w-full bg-[#232f3e]">
      <div className="xl:max-w-7xl lg:max-w-5xl max-w-sm mx-2 lg:mx-auto py-4">
        <nav className="flex items-center justify-between text-white w-full relative">
          <div>
            <button className="mr-14" onClick={() => setOpenMobile(!openMobile)}>
              <List size={27} />
            </button>
          </div>
          <div className="flex md:hidden items-center w-full max-w-md h-11 bg-[#F9F9F9] rounded-lg pr-2 py-2 mx-1 md:mx-4 lg:mx-6">
            <div className="bg-[#FF9900] p-2 h-11 flex items-center justify-center rounded-l-lg">
              <MagnifyingGlass size={16} color="#131313" />
            </div>
            <input className="ml-2 p-1 w-full h-11 bg-[#F9F9F9] rounded-lg focus:ring-1 focus:ring-inset focus:ring-gray-300" placeholder="Search for products, brand..." />
          </div>
          {/* Mobile Menu */}
          <div className={`lg:hidden absolute top-10 left-0 w-3/4 bg-white shadow-lg ${openMobile ? 'block' : 'hidden'}`}>
            <div className="flex flex-col p-4 items-start text-black">
              <button className="text-sm font-medium py-2 flex justify-between w-full">MEN<CaretRight size={22} /></button>
              <button className="text-sm font-medium py-2 flex justify-between w-full">WOMEN <CaretRight size={22} /></button>
              <button className="text-sm font-medium py-2 flex justify-between w-full">KID <CaretRight size={22} /></button>
              <button className="text-sm font-medium py-2 flex justify-between w-full">HOME & LIVING <CaretRight size={22} /></button>
              <button className="text-sm font-medium py-2 flex justify-between w-full">ELECTRONICS <CaretRight size={22} /></button>
              <button className="text-sm font-medium py-2 flex justify-between w-full">BEAUTY <CaretRight size={22} /></button>
              <button className="text-sm font-medium py-2 flex justify-between w-full">SPORT & FITNESS <CaretRight size={22} /></button>
              <button className="text-sm font-medium py-2 flex justify-between w-full">BOOKS <CaretRight size={22} /></button>
              <button className="text-sm font-medium py-2 flex justify-between w-full">MUSIC & GAMES <CaretRight size={22} /></button>
              <button className="text-sm font-medium py-2 flex justify-between w-full">GIFT <CaretRight size={22} /></button>
            </div>
          </div>

          <div className="hidden lg:block">
            <button className="text-sm font-medium">MEN</button>
            <button className="mx-12 text-sm font-medium">WOMEN</button>
            <button className="text-sm font-medium">KID</button>
            <button className="mx-12 text-sm font-medium">HOME & LIVING</button>
            <button className="text-sm font-medium">ELECTRONICS</button>
            <button className="mx-12 text-sm font-medium">BEAUTY</button>
            <button className="text-sm font-medium">SPORT & FITNESS</button>
            <button className="mx-12 text-sm font-medium">BOOKS</button>
            <button className="text-sm font-medium hidden xl:inline-block">MUSIC & GAMES</button>
            <button className="ml-12 text-sm font-medium hidden xl:inline-block">GIFT</button>
          </div>
        </nav>
      </div>
    </div>
    </div>
  )
}