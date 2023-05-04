import NextLink from "next/link";
import MainLayout from "~/components/main-layout";
import { Button } from "~/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/ui/card";
import { Icons } from "~/ui/icons";
import { signIn } from "next-auth/react";

function SignInPage() {
  return (
    <MainLayout hideNav>
      <div className="flex items-center justify-center">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Entre com sua conta do google para se conectar ao grupos
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 gap-6">
              <Button variant="outline" onClick={() => void signIn("google")}>
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou insira suas credênciais
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <span className="text-1xl bg-background px-2 text-muted-foreground">Em breve...</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-5">
            <NextLink href="/">Voltar</NextLink>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}

export default SignInPage;
