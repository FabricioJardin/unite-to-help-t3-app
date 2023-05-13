import { type GetServerSidePropsContext } from "next"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import MainLayout from "~/components/main-layout"
import { AspectRatio } from "~/ui/aspect-ratio"
import { Badge } from "~/ui/badge"
import { Button } from "~/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/ui/card"
import { Input } from "~/ui/input"
import { api } from "~/utils/api"
import { getServerSideHelpers } from "~/utils/helpers"
import BannerImg from "../../public/banner.png"

function Home() {
  const searchParams = useSearchParams()

  const { data: groupData } = api.group.getList.useQuery({
    ...(searchParams.get("q")?.length && {
      query: searchParams.get("q") || "",
    }),
  })
  const { data: causes } = api.cause.getAll.useQuery()

  const { status, data: authData } = useSession()

  const [search, setSearch] = useState<string>(searchParams.get("q") || "")

  return (
    <MainLayout>
      <div className="flex min-h-screen flex-col gap-5">
        <section className="relative flex w-full">
          <AspectRatio ratio={8 / 2}>
            <Image src={BannerImg} alt="Banner home" fill />
          </AspectRatio>
          <div className="t-0 l-0 absolute flex h-full w-full items-end justify-center">
            <Card className="mb-24 w-3/5 border-none">
              <CardHeader className="gap-10">
                <CardTitle className="text-4xl">
                  Sua plataforma de conexão com pessoas que querem fazer o bem
                </CardTitle>
                <CardDescription className="text-center text-2xl">
                  Junte-se a uma comunidade de voluntários apaixonados e comprometidos em ajudar
                  grupos locais. Na <em>Unite to Help</em>, você pode encontrar oportunidades de
                  voluntariado em sua área e se conectar com outras pessoas com interesses
                  semelhantes. Trabalhe em conjunto para criar impacto positivo na sua comunidade.
                  Junte-se a nós e faça a diferença hoje!
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
        <div className="p-10">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-bold">Conheça os grupos</h1>
            <form className="flex w-full max-w-5xl items-center space-x-2" action="/" method="get">
              <Input
                placeholder="Buscar pelo nome do grupo ou causa"
                className="bg-primary"
                name="q"
                value={search}
                onChange={({ target }) => setSearch(target.value)}
              />
              <Button type="submit">Pesquisar</Button>
            </form>

            {!groupData?.total && <span className="text-1xl">Nenhum grupo foi encontrado.</span>}

            <div className="grid grid-cols-3 gap-4">
              {groupData?.items.map((group) => {
                const userInGroup = group.users.some((user) => user.userId === authData?.user.id)

                return (
                  <Card key={group.id} className="flex flex-col border-none">
                    <CardHeader className="flex-1">
                      <CardTitle className="text-4xl">{group.name}</CardTitle>
                      <CardDescription>{group.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-wrap gap-2">
                        {group.causes.map(({ id, name }) => (
                          <Badge key={id} className="gap-1 px-1">
                            <span>{name}</span>
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex-1">
                      {status === "authenticated" && (
                        <Button className="w-full" disabled={userInGroup}>
                          {userInGroup ? "Já ingressou" : "Entrar no grupo"}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <footer className="flex items-start justify-start gap-40 bg-[#00171F80] px-24 py-10 shadow-md shadow-[#00171F80]">
        <div className="flex flex-col gap-4 text-white">
          <h1 className="font-bold">Unite to Help</h1>
          <ul className="flex flex-col flex-wrap gap-x-12 gap-y-2">
            <li>
              <Link href="#">Quem somos</Link>
            </li>
            <li>
              <Link href="#">Blog</Link>
            </li>
            <li>
              <Link href="#">Guia de Voluntários</Link>
            </li>
            <li>
              <Link href="#">Como engajar voluntários</Link>
            </li>
            <li>
              <Link href="#">Termos</Link>
            </li>
            <li>
              <Link href="#">Ajuda</Link>
            </li>
            <li>
              <Link href="#">Contato</Link>
            </li>
            <li>
              <Link href="#">Trabalhe conosco</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-white ">
          <h1 className="font-bold">Causas</h1>
          <ul className="flex max-h-[300px] flex-col flex-wrap gap-x-12 gap-y-2">
            {causes?.map((cause) => (
              <li key={cause.id}>{cause.name}</li>
            ))}
          </ul>
        </div>
      </footer>
    </MainLayout>
  )
}

type ServerSideQuery = {
  q?: string
}

async function getServerSideProps(context: GetServerSidePropsContext<ServerSideQuery>) {
  const helpers = await getServerSideHelpers(context)

  await helpers.cause.getAll.prefetch()
  await helpers.group.getList.prefetch({
    query: context.query["q"] as string,
  })

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  }
}

export default Home

export { getServerSideProps }
