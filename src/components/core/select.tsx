// Packages
import { ReactElement, useId } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

// Components
import { Label } from '@/components/ui/label';
import {
  Select as SelectShadcn,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';

interface SelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: Array<{
    label: string;
    value: string;
  }>;
}

export const Select = <T extends FieldValues = FieldValues>(
  props: SelectProps<T>,
): ReactElement => {
  const id = useId();

  return (
    <div className="*:not-first:mt-2">
      {props?.label && <Label htmlFor={id}>{props?.label}</Label>}
      <Controller
        control={props?.control}
        name={props.name}
        render={({ field }) => (
          <SelectShadcn onValueChange={field.onChange} {...field}>
            <SelectTrigger className="w-fit whitespace-nowrap">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>

            <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
              {Array.isArray(props.options) &&
                props.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </SelectShadcn>
        )}
      />
    </div>
  );
};
