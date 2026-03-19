"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

interface DropdownProps {
  label: string;
  options: Option[];
  onChange?: (value: string) => void;
}

export function Dropdown({ label, options, onChange }: DropdownProps) {
  const [selected, setSelected] = React.useState<Option>(
    options[0] ?? { label, value: "all" },
  );

  const handleSelect = (option: Option) => {
    setSelected(option);
    onChange?.(option.value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center bg-secondary border-white/50 min-w-[178px] h-[42px] justify-between text-sm"
        >
          <span className="truncate text-sm font-medium text-primary">
            {selected.label}
          </span>
          <ChevronDown className="w-5 h-5 opacity-70 shrink-0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleSelect(option)}
            className={selected.value === option.value ? "bg-accent" : ""}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
