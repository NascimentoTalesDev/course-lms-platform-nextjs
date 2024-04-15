"use client"

import React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "../../components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover"
import { cn } from "../../lib/utils"

interface ComboboxProps {
    options: { label: string; value: string }[];
    value?: string;
    onChange: (value: string) => void;
}

export const Combobox = ({ options, value, onChange }: ComboboxProps) => {
    const [open, setOpen] = React.useState(false)
    const [items, setItems] = React.useState(options)

    const toggleOptions = (opt: string) => {
        if (!opt.length) {
            return setItems(options)
        }

        if (opt.length) {
            let choices = items.filter(item => item.label.toLowerCase().includes(opt.toLowerCase()))
            setItems(choices)
        } else {
            setItems([])
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? items.find((option) => option.value === value)?.label
                        : "Selecione a opção..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <Input className="" onChange={(ev) => toggleOptions(ev.target.value)} placeholder="Buscar categoria" type="search" />
                    {!items.length ? (
                        <CommandEmpty>categoria não encontrada.</CommandEmpty>
                    ) : (
                        <CommandEmpty></CommandEmpty>
                    )}
                    <CommandGroup>
                        {items?.length > 0 && items.map((option) => (
                            <div key={option.value} className="flex">
                                <Check
                                    className={cn(
                                        "w-4 mr-2",
                                        value === option.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                <option
                                    className="cursor-pointer hover:text-slate-500"
                                    onClick={() => {
                                        onChange(option.value === value ? "" : option.value)
                                        setOpen(false)
                                    }}
                                >
                                    {option.label}
                                </option>

                            </div>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}