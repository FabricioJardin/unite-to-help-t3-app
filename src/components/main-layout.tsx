import { type ReactNode } from "react"
import { ScrollArea } from "~/ui/scroll-area"
import MainNav from "./main-nav"

type MainLayoutProps = {
  children: ReactNode
  hideNav?: boolean
}

function MainLayout({ children, hideNav }: MainLayoutProps) {
  return (
    <div className={`flex h-screen flex-col overflow-hidden font-sans`}>
      {!hideNav && <MainNav />}
      <ScrollArea className="h-full w-full">{children}</ScrollArea>
    </div>
  )
}

export default MainLayout
