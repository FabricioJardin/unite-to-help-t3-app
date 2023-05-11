import { MinusIcon, Plus, PlusIcon } from "lucide-react"
import { useRouter } from "next/router"
import { type PropsWithChildren } from "react"
import { type SubmitHandler, useForm, useFieldArray } from "react-hook-form"
import MainLayout from "~/components/main-layout"
import { Button } from "~/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/ui/card"
import { Input } from "~/ui/input"
import { Label } from "~/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/ui/select"
import { Textarea } from "~/ui/textarea"
import { api } from "~/utils/api"

type CreateGroupPageProps = {}

type Form = {
  name: string
  description: string
  zipCode: string
  causes: Array<{
    id: string
  }>
  contacts: Array<{
    type: "PHONE" | "EMAIL"
    value: string
  }>
}

function CreateGroupPage(props: PropsWithChildren<CreateGroupPageProps>) {
  const { register, handleSubmit, control } = useForm<Form>()
  const { push } = useRouter()
  const { data: availableCauses } = api.cause.getAll.useQuery()
  const { mutateAsync: createGroup } = api.group.create.useMutation()

  const {
    fields: contacts,
    append: addContact,
    remove: removeContact,
  } = useFieldArray({
    control,
    name: "contacts",
  })

  const {
    fields: causes,
    append: addCause,
    remove: removeCause,
  } = useFieldArray({
    control,
    name: "causes",
    keyName: "causeKey",
  })

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const group = await createGroup({
      name: data.name,
      description: data.description,
      zipCode: data.zipCode,
      country: "BRA",
      causes: data.causes.map(({ id }) => id),
      contacts: data.contacts,
    })

    return push(`/groups/${group.id}`)
  }

  return (
    <MainLayout>
      <div className="flex h-screen items-center justify-center">
        <Card className="min-w-full rounded-3xl md:min-w-[925px]">
          <CardHeader>
            <CardTitle>Criar grupo</CardTitle>
            <CardDescription>Insira os dados do seu novo grupo.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(evt) => void handleSubmit(onSubmit)(evt)}
              className="flex flex-col gap-10"
            >
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    placeholder="Insira o nome do grupo"
                    className="bg-primary"
                    {...register("name", { required: true })}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    placeholder="Insira uma descrição do grupo"
                    className="bg-primary"
                    {...register("description", { required: true })}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">CEP</Label>
                  <Input
                    placeholder="Insira o CEP da localização do grupo"
                    className="bg-primary"
                    {...register("zipCode", { required: true })}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="contacts">Contatos</Label>
                  {contacts.map((contact, index) => (
                    <div className="grid grid-cols-[1fr_1fr_auto] gap-2" key={contact.id}>
                      <Input
                        {...register(`contacts.${index}.value`)}
                        className="bg-primary"
                        type={contact.type === "EMAIL" ? "email" : "tel"}
                      />
                      <Select>
                        <SelectTrigger className="bg-primary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Tipo do contato</SelectLabel>
                            <SelectItem value="EMAIL">E-mail</SelectItem>
                            <SelectItem value="PHONE">Telefone</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Button className="w-fit" type="button" onClick={() => removeContact(index)}>
                        <MinusIcon />
                      </Button>
                    </div>
                  ))}
                  <Button
                    className="w-fit"
                    type="button"
                    onClick={() => addContact({ type: "PHONE", value: "" })}
                  >
                    <PlusIcon />
                  </Button>
                </div>
              </div>

              <Button type="submit">Cadastrar</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

export default CreateGroupPage
