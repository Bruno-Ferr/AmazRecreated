import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
import { ShopCartProvider } from "@/context/cartContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { UserProvider } from "@/context/userContext";

const font = Red_Hat_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Amazon",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider> 
        <ShopCartProvider>
          <body className={font.className}>
            <ToastContainer position="top-left" />
            {children}
          </body>
        </ShopCartProvider>
      </UserProvider>
    </html>
  );
}
