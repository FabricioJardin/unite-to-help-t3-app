import { type ReactNode } from "react";
import { Inter } from "@next/font/google";
import MainNav from "./main-nav";
import { ScrollArea } from "~/ui/scroll-area";

type MainLayoutProps = {
  children: ReactNode;
  hideNav?: boolean;
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

//bg-gradient-to-b from-[#495EEC] to-[#495EECE6]

// #006494

function MainLayout({ children, hideNav }: MainLayoutProps) {
  return (
    <main
      className={`dark flex h-screen flex-col bg-[#00A8E8] ${inter.className} overflow-hidden font-sans`}
    >
      {!hideNav && <MainNav />}
      <ScrollArea className="h-full w-full">{children}</ScrollArea>
    </main>
  );
}

export default MainLayout;
