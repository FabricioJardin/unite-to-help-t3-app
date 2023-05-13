import { MapPinIcon } from "lucide-react"
import { type GetServerSidePropsContext } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import MainLayout from "~/components/main-layout"
import { useToast } from "~/hooks/use-toast"
import { Badge } from "~/ui/badge"
import { Button } from "~/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/ui/card"
import { Label } from "~/ui/label"
import { api } from "~/utils/api"
import { getServerSideHelpers } from "~/utils/helpers"

function GroupDetailPage() {
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

  return (
    <MainLayout>
      <div className="flex h-screen items-center justify-center">
        <Card className="min-w-full rounded-3xl md:min-w-[925px] md:max-w-[925px]">
          <CardHeader>
            <CardTitle>{group?.name}</CardTitle>
            <CardDescription>{group?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-5">
              <div className="flex gap-2">
                <MapPinIcon />

                <span>{group?.zipCode}</span>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Contatos</Label>
                {group?.contacts.map((contact) => (
                  <div className="flex gap-2" key={contact.id}>
                    <span>{contact.type === "EMAIL" ? "Email" : "Telefone"}: </span>
                    <span>{contact.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <Label>Causas</Label>
                <div className="flex flex-wrap gap-2">
                  {group?.causes.map((cause) => (
                    <Badge key={cause.id} className="gap-1 px-1">
                      <span>{cause.name}</span>
                    </Badge>
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

  if (context.params?.id) await helpers.group.getById.prefetch(context.params.id)

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  }
}

export default GroupDetailPage

export { getServerSideProps }
