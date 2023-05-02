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
      <NavigationMenuList className="flex w-screen items-center justify-between bg-[#495EECE6] px-4 py-2">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className="flex items-center gap-4">
              <HeartHandshake size={60} />
              <h1 className="text-4xl font-extrabold uppercase tracking-tight lg:text-5xl">
                Unite to Help
              </h1>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <div className="flex items-center gap-20">
          <NavigationMenuItem>
            <Link href="/groups" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Grupos
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/events" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Eventos
              </NavigationMenuLink>
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
