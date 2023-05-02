import { type ReactNode } from "react";
import MainNav from "./main-nav";

type MainLayoutProps = {
  children: ReactNode;
  hideNav?: boolean;
};

function MainLayout({ children, hideNav }: MainLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-gradient-to-b from-[#495EEC] to-[#495EECE6]">
      {!hideNav && <MainNav />}
      {children}
    </main>
  );
}

export default MainLayout;
