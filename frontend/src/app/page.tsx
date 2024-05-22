import Header from "@/components/Header/Header";
import Image from "next/image";
import Products from "./(layout)/products/page";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Products />
    </main>
  );
}
