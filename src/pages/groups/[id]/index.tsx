import { MapPinIcon, UserIcon } from "lucide-react"
import { type GetServerSidePropsContext } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import MainLayout from "~/components/main-layout"
import { useToast } from "~/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar"
import { Badge } from "~/ui/badge"
import { Button } from "~/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/ui/card"
import { api } from "~/utils/api"
import { getServerSideHelpers } from "~/utils/helpers"

type AddressData = {
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
}

type GroupDetailPageProps = {
  addressData?: AddressData
}

function GroupDetailPage({ addressData }: GroupDetailPageProps) {
  const router = useRouter()
  const { toast } = useToast()

  const { data: group } = api.group.getById.useQuery(router.query.id as string, {
    onError() {
      toast({
        title: "Grupo não encontrado",
        description: "Este grupo não foi encontrado",
        variant: "destructive",
      })

      void router.push("/")
    },
  })

  const handleAdminContact = () => {
    toast({
      title: "Funcionalidade indisponível...",
      description: "A funcionalidade ainda está em desenvolvimento.",
    })
  }

  return (
    <MainLayout>
      <div className="flex h-screen items-center justify-center">
        <Card className="min-w-full rounded-3xl md:min-w-[925px] md:max-w-[925px]">
          <CardHeader>
            <CardTitle className="text-3xl">{group?.name}</CardTitle>
            <CardDescription>{group?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <MapPinIcon />

                {addressData ? (
                  <span className="text-2xl">
                    {addressData.neighborhood} - {addressData.city} {addressData.state}
                  </span>
                ) : (
                  <span>{group?.zipCode}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-2xl">Contatos</h1>
                {!group?.contacts.length && <p>O grupo não possui contatos disponíveis.</p>}
                {group?.contacts.map((contact) => (
                  <div className="flex gap-2" key={contact.id}>
                    <span>{contact.type === "EMAIL" ? "Email" : "Telefone"}: </span>
                    <span>{contact.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-2xl">Causas</h1>
                <div className="flex flex-wrap gap-2">
                  {group?.causes.map((cause) => (
                    <Badge key={cause.id} className="gap-1 px-1">
                      <span>{cause.name}</span>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="text-2xl">Usuários</h1>
                <div className="flex flex-col gap-1">
                  {group?.users.map((userOnGroup) => (
                    <div className="flex  rounded-md border bg-muted p-2" key={userOnGroup.userId}>
                      <div className="flex flex-1 items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={userOnGroup.user.image || undefined} />
                          <AvatarFallback className="text-white">
                            {userOnGroup.user.name
                              ?.split(" ")
                              .map((v) => v.at(0)?.toUpperCase())
                              .join("") || <UserIcon />}
                          </AvatarFallback>
                        </Avatar>

                        <p className="text-sm font-medium leading-none">{userOnGroup.user.name}</p>
                      </div>

                      {userOnGroup.role === "ADMIN" && (
                        <div className="flex w-full flex-1 items-center justify-end gap-2">
                          <Badge>Admin</Badge>
                          <Button className="rounded-lg" onClick={handleAdminContact}>
                            Entrar em contato
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="link">
              <Link href="/" className="text-white">
                Voltar
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  )
}

type GetServerSidePropsQuery = {
  id: string
}

async function getServerSideProps(context: GetServerSidePropsContext<GetServerSidePropsQuery>) {
  const helpers = await getServerSideHelpers(context)

  let addressData: AddressData | undefined

  if (context.params) {
    await helpers.group.getById.prefetch(context.params.id)

    const group = await helpers.group.getById.fetch(context.params.id)

    try {
      addressData = await fetch(`https://brasilapi.com.br/api/cep/v2/${group.zipCode}`).then(
        (res) => res.json() as Promise<AddressData>,
      )
    } catch (err) {}
  }

  return {
    props: {
      trpcState: helpers.dehydrate(),
      addressData: addressData,
    },
  }
}

export default GroupDetailPage

export { getServerSideProps }
