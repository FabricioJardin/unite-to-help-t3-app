import { type GetServerSidePropsContext } from "next"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useState } from "react"
import MainLayout from "~/components/main-layout"
import { useToast } from "~/hooks/use-toast"
import { AspectRatio } from "~/ui/aspect-ratio"
import { Badge } from "~/ui/badge"
import { Button } from "~/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/ui/card"
import { Input } from "~/ui/input"
import { Skeleton } from "~/ui/skeleton"
import { api } from "~/utils/api"
import { getServerSideHelpers } from "~/utils/helpers"
import BannerImg from "../../public/banner.png"

function genId(count: number) {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

function Home() {
  const searchParams = useSearchParams()

  const { data: causes } = api.cause.getAll.useQuery()

  const { status, data: authData } = useSession()

  const [groupSearch, setGroupSearch] = useState<string>(searchParams.get("group") || "")
  const [groupSearchInput, setGroupSearchInput] = useState<string>(groupSearch)

  const {
    data: groupData,
    isLoading: isLoadingGroups,
    refetch: refetchGroups,
  } = api.group.getList.useQuery({
    query: groupSearch,
  })

  const { toast } = useToast()

  const { mutateAsync: joinGroup } = api.group.addUser.useMutation({
    onSuccess() {
      void refetchGroups()
    },
  })

  const handleJoinGroup = async (groupId: string) => {
    const createdToast = toast({
      title: "Entrando no grupo...",
    })

    try {
      await joinGroup(groupId)

      createdToast.update({
        id: createdToast.id,
        title: "Seu ingresso no grupo foi processado com sucesso!",
      })
    } catch {
      createdToast.update({
        id: createdToast.id,
        title: "Houve algum erro ao adentrar ao grupo",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      })
    }
  }

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
            <div className="flex w-full max-w-5xl items-center space-x-2">
              <Input
                placeholder="Buscar pelo nome do grupo ou causa"
                className="bg-primary"
                name="q"
                value={groupSearchInput}
                onChange={({ target }) => setGroupSearchInput(target.value)}
              />
              <Button onClick={() => setGroupSearch(groupSearchInput)}>Pesquisar</Button>
            </div>

            {!groupData?.total && !isLoadingGroups && (
              <span className="text-1xl">Nenhum grupo foi encontrado.</span>
            )}

            <div className="grid grid-cols-3 gap-4">
              {isLoadingGroups &&
                Array.from({ length: 3 }).map((_, index) => (
                  <Card key={genId(index)} className="flex flex-col border-none">
                    <CardHeader className="flex-1">
                      <CardTitle>
                        <Skeleton className="h-10 w-[250px]" />
                      </CardTitle>
                      <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 4 }).map((_cause, causeIndex) => (
                          <Skeleton className="h-5 w-14 rounded-lg" key={genId(causeIndex)} />
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex-1">
                      {status === "authenticated" && <Skeleton className="h-10 w-full" />}
                    </CardFooter>
                  </Card>
                ))}

              {groupData?.items.map((group) => {
                const userInGroup = group.users.some((user) => user.userId === authData?.user.id)

                return (
                  <Card key={group.id} className="flex flex-col border-none">
                    <CardHeader className="flex-1">
                      <Link href={`/groups/${group.id}`} legacyBehavior passHref>
                        <CardTitle
                          className="text-4xl underline-offset-4 hover:underline"
                          role="button"
                        >
                          {group.name}
                        </CardTitle>
                      </Link>
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
                        <Button
                          className="w-full"
                          disabled={userInGroup}
                          onClick={!userInGroup ? () => handleJoinGroup(group.id) : undefined}
                        >
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
  group?: string
  event?: string
}

async function getServerSideProps(context: GetServerSidePropsContext<ServerSideQuery>) {
  const helpers = await getServerSideHelpers(context)

  await helpers.cause.getAll.prefetch()
  await helpers.group.getList.prefetch({
    ...(context.query["group"] && {
      query: context.query["group"] as string,
    }),
  })

  await helpers.event.getList.prefetch({
    ...(context.query["event"] && {
      query: context.query["event"] as string,
    }),
  })

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  }
}

export default Home

export { getServerSideProps }
