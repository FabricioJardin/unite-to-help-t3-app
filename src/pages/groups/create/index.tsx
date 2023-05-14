import { zodResolver } from "@hookform/resolvers/zod"
import { XIcon } from "lucide-react"
import { useRouter } from "next/router"
import { Controller, useFieldArray, useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"
import ChooseCausesComboBox from "~/components/choose-causes-combo-box"
import MainLayout from "~/components/main-layout"
import { useToast } from "~/hooks/use-toast"
import { Badge } from "~/ui/badge"
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

const formSchema = z.object({
  name: z.string({ required_error: "Campo obrigatório" }).min(1, { message: "Campo obrigatório" }),
  description: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
  zipCode: z
    .string({ required_error: "Campo obrigatório" })
    .length(8, { message: "O CEP deve possuir 8 dígitos, apenas números" }),
  causes: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .min(1, { message: "O grupo deve possuir pelo menos uma causa" }),
  contacts: z
    .array(
      z.object({
        type: z.enum(["PHONE", "EMAIL"]),
        value: z.string().min(1, { message: "Campo obrigatório" }),
      }),
    )
    .min(1, { message: "O grupo deve possuir pelo menos um contato" }),
})

type Form = z.infer<typeof formSchema>

function CreateGroupPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      causes: [],
      contacts: [],
      description: "",
      name: "",
      zipCode: "",
    },
    resolver: zodResolver(formSchema),
  })

  console.log({ errors })

  const { toast } = useToast()

  const { push } = useRouter()
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
    const createdToast = toast({
      title: "Salvando grupo",
    })

    try {
      const group = await createGroup({
        name: data.name,
        description: data.description,
        zipCode: data.zipCode,
        country: "BRA",
        causes: data.causes.map(({ id }) => id),
        contacts: data.contacts,
      })

      return push(`/groups/${group.id}`)
    } finally {
      createdToast.update({
        id: createdToast.id,
        title: "Grupo criado com sucesso",
      })
    }
  }

  return (
    <MainLayout>
      <div className="flex h-screen items-center justify-center">
        <Card className="min-w-full rounded-3xl md:min-w-[925px] md:max-w-[925px]">
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
                  {errors.name && (
                    <small className="text-sm leading-none text-destructive">
                      {errors.name.message}
                    </small>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    placeholder="Insira uma descrição do grupo"
                    className="bg-primary"
                    {...register("description", { required: true })}
                  />
                  {errors.description && (
                    <small className="text-sm leading-none text-destructive">
                      {errors.description.message}
                    </small>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">CEP</Label>
                  <Input
                    placeholder="Insira o CEP da localização do grupo"
                    className="bg-primary"
                    {...register("zipCode", { required: true })}
                  />
                  {errors.zipCode && (
                    <small className="text-sm leading-none text-destructive">
                      {errors.zipCode.message}
                    </small>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Contatos</Label>
                  {contacts.map((contact, index) => (
                    <div className="grid grid-cols-[auto_1fr_1fr] gap-2" key={contact.id}>
                      <Button
                        className="rounded-lg"
                        type="button"
                        onClick={() => removeContact(index)}
                      >
                        Remover
                      </Button>
                      <Input
                        {...register(`contacts.${index}.value`)}
                        className="bg-primary"
                        type={contact.type === "EMAIL" ? "email" : "tel"}
                      />
                      <Controller
                        control={control}
                        name={`contacts.${index}.type`}
                        render={({ field: { value, onChange, ref } }) => (
                          <Select onValueChange={onChange} value={value}>
                            <SelectTrigger className="bg-primary" ref={ref}>
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
                        )}
                      />
                      {errors.contacts?.[index]?.value?.message && (
                        <small className="text-sm leading-none text-destructive">
                          {errors.contacts?.[index]?.value?.message}
                        </small>
                      )}
                    </div>
                  ))}
                  <Button
                    className="rounded-lg"
                    type="button"
                    onClick={() => addContact({ type: "PHONE", value: "" })}
                  >
                    Adicionar
                  </Button>
                  {errors.contacts && errors.contacts.message && (
                    <small className="text-sm leading-none text-destructive">
                      {errors.contacts.message}
                    </small>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Causas</Label>
                  <div className="flex flex-wrap gap-2">
                    {causes.map((cause, index) => (
                      <Badge key={cause.id} className="gap-1 px-1">
                        <span>{cause.name}</span>
                        <XIcon
                          size={12}
                          role="button"
                          className=" rounded-full ring-primary hover:bg-secondary "
                          onClick={() => removeCause(index)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <ChooseCausesComboBox
                    value={causes.map(({ id }) => id)}
                    onAdd={(cause) => addCause(cause)}
                  />
                </div>
                {errors.causes && errors.causes.message && (
                  <small className="text-sm leading-none text-destructive">
                    {errors.causes.message}
                  </small>
                )}
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
