import { type Cause } from "@prisma/client"
import { PlusIcon } from "lucide-react"
import { useState, type PropsWithChildren } from "react"
import { Button } from "~/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"
import { api } from "~/utils/api"

type ChooseCausesComboBoxProps = {
  value: Array<string>
  onAdd(cause: Cause): void
}

function ChooseCausesComboBox({ value, onAdd }: PropsWithChildren<ChooseCausesComboBoxProps>) {
  const { data: causes } = api.cause.getAll.useQuery()

  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between"
        >
          <>+ Adicionar causa</>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit bg-primary p-2" align="start">
        <div className="grid grid-cols-3 gap-2">
          {causes
            ?.filter((cause) => !value.includes(cause.id))
            ?.map((cause) => (
              <Button
                key={cause.id}
                variant="secondary"
                className="justify-between"
                role="button"
                onClick={() => onAdd(cause)}
              >
                {cause.name} <PlusIcon />
              </Button>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ChooseCausesComboBox
