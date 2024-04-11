import Header from "@/components/Header/Header";
import Image from "next/image";
import Product from "./(layout)/products/page";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Product />
    </main>
  );
}
