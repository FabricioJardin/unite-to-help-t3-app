import { type PropsWithChildren } from "react"
import MainLayout from "~/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/ui/card"
import { Input } from "~/ui/input"
import { Label } from "~/ui/label"

type CreateGroupPageProps = {}

function CreateGroupPage(props: PropsWithChildren<CreateGroupPageProps>) {
  return (
    <MainLayout>
      <div className="flex h-screen items-center justify-center">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Criar grupo</CardTitle>
            <CardDescription>Insira os dados do seu novo grupo.</CardDescription>
          </CardHeader>
          <CardContent className="flex">
            <form>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input name="name" placeholder="Insira o nome do grupo" className="bg-primary" />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

export default CreateGroupPage
