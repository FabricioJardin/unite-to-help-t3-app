import { type ReactNode } from "react";
import { Inter } from "@next/font/google";
import MainNav from "./main-nav";

type MainLayoutProps = {
  children: ReactNode;
  hideNav?: boolean;
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function MainLayout({ children, hideNav }: MainLayoutProps) {
  return (
    <main
      className={`flex min-h-screen flex-col justify-center bg-gradient-to-b from-[#495EEC] to-[#495EECE6] ${inter.className} font-sans`}
    >
      {!hideNav && <MainNav />}
      {children}
    </main>
  );
}

export default MainLayout;
