'use client';
import { ShopCartContext } from "@/context/cartContext";
import { ArrowRight, CaretDown, Star, StarHalf } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const itemList = [{
  id: 1,
  url: "/Court_Vision.png",
  name: "Court Vision",
  brand: "Nike",
  stars: 5,
  reviews: 57,
  frete: true,
  price: 799,
  discount: "1099",
}, {
  id: 2,
  url: "/Nike_Air_Max.png",
  name: "Nike Air Max",
  brand: "Nike",
  stars: 4.5,
  reviews: 130,
  frete: false,
  price: 899,
  discount: "1399",
}, {
  id: 3,
  url: "/Adidas_Vs_Pace.png",
  name: "Adidas Vs Pace",
  brand: "Adidas",
  stars: 5,
  reviews: 23,
  frete: true,
  price: 599,
  discount: "899",
}, {
  id: 4,
  url: "/Adidas_Runfalcon.png",
  name: "Adidas Runfalcon",
  brand: "Adidas",
  stars: 3,
  reviews: 57,
  frete: false,
  price: 999,
  discount: "1399",
}, {
  id: 5,
  url: "/Nike_Air_Mx.png",
  name: "Nike Air Max",
  brand: "Nike",
  stars: 4.5,
  reviews: 130,
  frete: false,
  price: 899,
  discount: "1399",
}, {
  id: 6,
  url: "/Adidas_Vs_Pac.png",
  name: "Adidas Vs Pace",
  brand: "Adidas",
  stars: 5,
  reviews: 23,
  frete: true,
  price: 599,
  discount: "899",
}, {
  id: 7,
  url: "/Adidas_Runfalc.png",
  name: "Adidas Runfalcon",
  brand: "Adidas",
  stars: 3,
  reviews: 57,
  frete: false,
  price: 999,
  discount: "1399",
}, {
  id: 8,
  url: "/Adidas_Runfalco.png",
  name: "Adidas Runfalcon",
  brand: "Adidas",
  stars: 3,
  reviews: 57,
  frete: false,
  price: 999,
  discount: "1399",
}]

export default function Product() {
  const { addToCart, removeFromCart } = useContext(ShopCartContext)

  const handleClickInterno = (event: any) => {
    event.stopPropagation(); // Impede a propagação do evento de clique
    console.log("interno");
    // Insira aqui o que deseja fazer ao clicar no botão interno
  };

  const handleClickExterno = (event: any) => {
    event.stopPropagation();
    console.log("externo");
    // Insira aqui o que deseja fazer ao clicar no botão interno
  };

  return (
    <main className="xl:max-w-7xl m-auto mt-5">
      <div className="flex items-center mb-9">
        <h5 className="text-sm font-bold text-[#9B9A9A]">Popular Products</h5>
        <ArrowRight size={14} weight="bold" className="mx-2" />
        <h5 className="text-sm font-bold text-[#221F1F]">Sneakers</h5>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <h2 className="text-4xl font-medium text-[#221F1F]">Sneakers</h2>
            <h4 className="text-lg font-medium text-[#9B9A9A]">157 results</h4>
          </div>
          <div>
            <button className="text-sm w-36 h-14 font-bold bg-[#FFE1B3] rounded-3xl">Express shipping</button>
            <button className="text-sm w-36 h-14 font-medium mx-4 bg-[#F8F7F8] rounded-3xl">Coupon Products</button>
            <button className="text-sm w-36 h-14 font-medium bg-[#F8F7F8] rounded-3xl">Free Cargo</button>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-4 gap-x-8 gap-y-8"> {/* Grid */}
          {itemList.map(item => {
            return (
              <div className="flex" key={item.url}>
                <div className="flex flex-col text-start">
                  <Link href="/" className="h-48 w-60 flex items-center justify-center rounded-xl shadow-[10px_10px_25px_5px_rgba(0,0,0,0.1)]">
                    <Image
                      src={item.url}
                      width={200}
                      height={200}
                      alt={item.name}
                    />
                  </Link>
                  <div className="mt-6">
                    <h2 className="font-bold text-[#221F1F]">{item.name}</h2>
                    <p className="text-sm font-medium text-[#ABABAB]">{item.brand}</p>
                    <button className="flex items-center  my-3" onClick={(e) => handleClickInterno(e)}>
                    {[...new Array(5)].map((_, index) => {
                        return index < Math.floor(item.stars) ? <Star size={14} weight="fill" color="#FBB833" key={index} /> :
                              index == Math.floor(item.stars) && item.stars - Math.floor(item.stars) == 0.5 ? 
                              <StarHalf size={14} weight="fill" color="#FBB833" key={index} /> : <Star size={14} color="#ABABAB" key={index} />
                      })}
                      <CaretDown size={12} />
                      <p className="text-sm text-[#9B9A9A] ml-2">{item.reviews}</p>
                    </button>
                    <p className="text-2xl font-semibold text-[#221F1F]">R${item.price} <span className="text-sm line-through text-[#ABABAB] decoration-gray-700 decoration-3">R${item.discount}</span></p>
                    <button className="p-1 bg-blue-500 text-white rounded-md mr-2" onClick={() => addToCart(item.id, item, true)}>Add to cart</button>
                    <button className="p-1 bg-red-500 text-white rounded-md" onClick={() => removeFromCart(item.id, true)}>Remove</button>
                    {/* {item.frete && <p className="text-[14px] leading-1">
                      Receba até <span className="font-bold">Amanhã, 10 de abr. </span>
                      Frete GRÁTIS em pedidos acima de R$ 129,00 enviados pela Amazon</p>
                    } */}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  );
}
