import { Check } from "lucide-react"
import { ChevronsUpDown } from "lucide-react"
import { type ReactNode, type PropsWithChildren, useState } from "react"
import { cn } from "~/lib/utils"
import { Button } from "~/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "~/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"
import { api } from "~/utils/api"

type ChooseCausesComboBoxProps = {
  Trigger?: ReactNode
}

function ChooseCausesComboBox(props: PropsWithChildren<ChooseCausesComboBoxProps>) {
  const { data: causes } = api.cause.getAll.useQuery()

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

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
      <PopoverContent className="flex w-[45rem] flex-wrap gap-2 p-0" side="right" align="start">
        {causes?.map((cause) => (
          <div className="flex gap-1" key={cause.id}>
            <span>{cause.name}</span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export default ChooseCausesComboBox
