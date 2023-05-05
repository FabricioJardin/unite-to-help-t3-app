import NextLink from "next/link";
import MainLayout from "~/components/main-layout";
import { Button } from "~/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/ui/card";
import { Icons } from "~/ui/icons";
import { signIn } from "next-auth/react";

function SignInPage() {
  return (
    <MainLayout hideNav>
      <div className="flex h-screen items-center justify-center">
        <Card className="border-none bg-[#003459] ">
          <CardHeader className="space-y-1 text-white">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Entre com sua conta do google para se conectar ao grupos
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 gap-6">
              <Button variant="default" onClick={() => void signIn("google", { callbackUrl: "/" })}>
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-5 ">
            <Button asChild variant="link">
              <NextLink href="/">Voltar</NextLink>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}

export default SignInPage;
