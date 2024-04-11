import Header from "@/components/Header/Header";
import { ShopCartProvider } from "@/context/cartContext";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
