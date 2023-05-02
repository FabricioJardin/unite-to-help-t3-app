import { HeartHandshake } from "lucide-react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/ui/navigation-menu";

function MainNav() {
  return (
    <NavigationMenu className="fixed left-0 top-0 flex w-screen">
      <NavigationMenuList className="flex min-h-[80px] w-screen items-center justify-between border-b border-b-[#2a3dbf59] bg-[#495EECE6] px-4 py-2">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className="flex items-center gap-4">
              <HeartHandshake size={50} />
              <h1 className="text-2xl font-extrabold uppercase tracking-tight ">Unite to Help</h1>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <div className="flex items-center gap-20">
          <NavigationMenuItem>
            <Link href="/groups" legacyBehavior passHref>
              <NavigationMenuLink>Grupos</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/events" legacyBehavior passHref>
              <NavigationMenuLink>Eventos</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </div>
        <NavigationMenuItem>
          <Link href="/sign-in" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Entrar</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default MainNav;
