'use client';

import * as React from 'react';
import { Check, ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';

export type Option = {
  value: string;
  label: string;
};

interface MultiSelectProductsProps {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelectProducts({
  options,
  selected,
  onChange,
  placeholder,
  className,
}: MultiSelectProductsProps) {
  const [open, setOpen] = React.useState(false);

  const handleToggle = (value: string) => {
    if (value === 'no-claro') {
      // If "no-claro" is already the only one, we can unselect it (toggle)
      if (selected.length === 1 && selected.includes('no-claro')) {
        onChange([]);
      } else {
        onChange(['no-claro']);
      }
    } else {
      // If another is picked, remove "no-claro" if present
      const newValues = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected.filter((v) => v !== 'no-claro'), value];
      
      onChange(newValues);
    }
  };

  const selectedLabels = options
    .filter((o) => selected.includes(o.value))
    .map((o) => o.label);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'cursor-target w-full pl-12 bg-[#101025]/80 border-violet-500/10 focus:border-violet-500/30 focus:bg-[#151530]/90 transition-all rounded-xl h-12 text-left font-normal text-white hover:bg-[#151530]/90 hover:border-violet-500/30 justify-start relative',
            className
          )}
        >
          <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <span className="truncate pr-8">
            {selectedLabels.length > 0
              ? selectedLabels.join(', ')
              : placeholder || 'Seleccionar...'}
          </span>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="p-2 bg-[#0F0F25] border-violet-500/30 text-white backdrop-blur-xl w-[var(--radix-popover-trigger-width)] min-w-0"
        align="start"
      >
        <div className="flex flex-col gap-1">
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                "flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-violet-500/20 transition-colors",
                selected.includes(option.value) && "bg-violet-500/10"
              )}
              onClick={() => handleToggle(option.value)}
            >
              <Checkbox 
                checked={selected.includes(option.value)}
                onCheckedChange={() => handleToggle(option.value)}
                className="border-violet-400/50 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
              />
              <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {option.label}
              </span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
