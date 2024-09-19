import React from 'react'
import { citiesOptions, cn, formattedNumber } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RxCaretSort } from "react-icons/rx";
import { LucideCheck } from 'lucide-react'

 

const DropDownFilter = ({data, type, onChange, selectedProvince = "Any"}) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
   
    const options = type == 'city' ? selectedProvince != "Any" ? citiesOptions[selectedProvince] : [] : data  

    return (
      <div className="dropDownFilter text-black w-full">
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? options.find((option) => option === value)
              : `Select ${type ?? 'Option'}`}
            <RxCaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${type}`} className="h-9" />
            <CommandList>
              <CommandEmpty>No match found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      onChange(currentValue)
                      setOpen(false)
                    }}
                  >
                    {isNaN(option) == true ? option : 'R' + formattedNumber(option)}
                    <LucideCheck
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === option ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      </div>
    )
}

export default DropDownFilter