import { HeartHandshake } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar";
import { Button } from "~/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/ui/navigation-menu";
import { UserIcon } from "lucide-react";

function MainNavLink({ href, label }: { href: string; label: string }) {
  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink>{label}</NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}

function MainNav() {
  const { data: sessionData } = useSession();

  return (
    <NavigationMenu className=" bg-[#00171F80] shadow-md shadow-[#00171F80]">
      <NavigationMenuList className="flex h-20 w-screen justify-between px-10">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className="flex items-center gap-4 text-gray-100">
              <HeartHandshake size={50} />
              <h1 className="text-2xl font-extrabold uppercase tracking-tight ">Unite to Help</h1>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <div className="flex items-center gap-20">
          <MainNavLink href="/groups" label="Grupos" />
          <MainNavLink href="/events" label="Eventos" />
        </div>
        <NavigationMenuItem>
          {sessionData ? (
            <div className="flex">
              <Avatar>
                <AvatarImage src={sessionData.user.image || undefined} />
                <AvatarFallback className="text-white">
                  {sessionData.user.name
                    ?.split(" ")
                    .map((v) => v.at(0)?.toUpperCase())
                    .join("") || <UserIcon />}
                </AvatarFallback>
              </Avatar>
              <Button variant="link" onClick={() => void signOut({ callbackUrl: "/" })}>
                Sair
              </Button>
            </div>
          ) : (
            <Link href="/sign-in" legacyBehavior passHref>
              <Button asChild variant="secondary">
                <NavigationMenuLink>Entrar</NavigationMenuLink>
              </Button>
            </Link>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default MainNav;
