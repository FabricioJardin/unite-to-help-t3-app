import MainNav from "~/components/main-nav";
import { Card, CardDescription, CardHeader, CardTitle } from "~/ui/card";

function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-gradient-to-b from-[#495EEC] to-[#495EECE6]">
      <MainNav />
      <Card className="flex h-40 flex-col items-center justify-center">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            A maior plataforma de conexão de pessoas para fazer o bem, unidos!
          </CardTitle>
          <CardDescription className="w-full">
            A Unite To Help ajuda pessoas a se conectarem à grupo que promovem encontros para
            eventos voluntários e ajudam na vida de pessoas ou animais necessitados.
          </CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
}

export default Home;
