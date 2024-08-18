'use client';
import { ShopCartContext } from "@/context/cartContext";
import { BookAttributes, CoffeeAttributes, EarringAttributes, ProductsProps, ShoeAttributes } from "@/types/products";
import { ArrowRight, CaretDown, Star, StarHalf } from "@phosphor-icons/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

type ReviewsProps = {
  comment: string,
  stars: number
}[]

export default function Products() {
  const [products, setProducts] = useState<ProductsProps>()
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

  const fetchProducts = async () => {
    const res = await axios.get(`${process.env.API_ADDRESS}/products`)
    console.log(res.data)
    setProducts(res.data)
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  const calculateAverageRating = (reviews: ReviewsProps) => {
    if (reviews.length === 0) return 0;

    const totalStars = reviews.reduce((acc: any, review: ReviewsProps[0]) => {
      return acc + review.stars;
    }, 0);

    return totalStars / reviews.length;
  };

  const renderStars = (rating: any) => {
    const stars = [];
    const roundedStars = Math.round(rating * 2) / 2
    const fullStars = Math.floor(roundedStars);
    const halfStar = roundedStars - fullStars == 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star size={14} weight="fill" color="gold" key={i} />);
      } else if (halfStar) {
        stars.push(<StarHalf key={i} weight="fill" size={14} color="gold"/>);
      } else {
        stars.push(<Star key={i} size={14} color="#ABABAB" />);
      }
    }

    return stars;
  };

  function getAmountsAndPrices(product: ProductsProps[0]) {
    // Define an object to hold the amounts and prices
    let listOfAmountAndPrice: { amount: number; price: string } = { amount: 0, price: '0'};
  
    // Check the category and extract the appropriate values
    switch (product.category) {
      case 'coffee': {
        const coffeeAttributes = product.attributes[0] as CoffeeAttributes;
        if (coffeeAttributes.sizes.length > 0) {
          listOfAmountAndPrice = {
            amount: coffeeAttributes.sizes[0].amount,
            price: coffeeAttributes.sizes[0].price
          };
        }
        break;
      }
      case 'shoe': {
        const shoeAttributes = product.attributes[0] as ShoeAttributes;
        if (shoeAttributes.sizes.length > 0) {
          listOfAmountAndPrice = {
            amount: shoeAttributes.sizes[0].amount,
            price: shoeAttributes.price
          };
        }
        break;
      }
      case 'book': {
        const bookAttributes = product.attributes[0] as BookAttributes;
        listOfAmountAndPrice = {
          amount: bookAttributes.amount,
          price: bookAttributes.price
        }
        break;
      }
      case 'earring': {
        const earringAttributes = product.attributes[0] as EarringAttributes;
        listOfAmountAndPrice = {
          amount: earringAttributes.amount,
          price: earringAttributes.price
        };
        break;
      }
      default:
        // Handle unknown categories or types if necessary
        break;
    }
  
    return listOfAmountAndPrice;
  }

  return (
    <main className="xl:max-w-7xl lg:max-w-5xl mx-2 md:mx-auto mt-5">
      <div className="flex items-center mb-9">
        <h5 className="text-sm font-bold text-[#9B9A9A]">Popular Products</h5>
        <ArrowRight size={14} weight="bold" className="mx-2" />
        <h5 className="text-sm font-bold text-[#221F1F]">General</h5>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <h2 className="text-4xl font-medium text-[#221F1F]">General</h2>
            <h4 className="text-lg font-medium text-[#9B9A9A]">{products?.length} results</h4>
          </div>
          <div className="hidden lg:block">
            <button className="text-sm w-36 h-14 font-bold bg-[#FFE1B3] rounded-3xl">Express shipping</button>
            <button className="text-sm w-36 h-14 font-medium mx-4 bg-[#F8F7F8] rounded-3xl">Coupon Products</button>
            <button className="text-sm w-36 h-14 font-medium bg-[#F8F7F8] rounded-3xl">Free Cargo</button>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-3 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-8"> {/* Grid */}
          {products?.map(item => {
            const amountAndPrice = getAmountsAndPrices(item)
            return (
              <div className="flex" key={item._id}>
                <div className="flex lg:flex-col text-start">
                  <Link href={`./products/${item._id}`} className="h-36 w-48 md:h-48 md:w-60 flex items-center justify-center rounded-xl shadow-[10px_10px_25px_5px_rgba(0,0,0,0.1)]">
                    <Image
                      src={item.image[0]}
                      width={130}
                      height={130}
                      alt={item.name}
                    />
                  </Link>
                  <div className="lg:mt-6 ml-2">
                    <h2 className="font-bold text-[#221F1F]">{item.name}</h2>
                    <p className="text-sm font-medium text-[#ABABAB]">{item.brand}</p>
                    <button className="flex items-center  my-3" onClick={(e) => handleClickInterno(e)}>
                      {renderStars(calculateAverageRating(item.reviews))}
                      <CaretDown size={12} />
                      <p className="text-sm text-[#9B9A9A] ml-2">{item.reviews.length}</p>
                    </button>
                    {
                      amountAndPrice.amount > 0 ? (
                        <p className="text-2xl font-semibold text-[#221F1F]">R${amountAndPrice.price}{!item.discount && <span className="text-sm line-through text-[#ABABAB] decoration-gray-700 decoration-3">R${item.discount}</span>}</p>
                      ) : (
                        <p className="text-2xl font-semibold text-[#817e7e]">Out of stock</p>
                      )
                    }
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
