import React from "react";
import { filter } from "lodash";
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
} from "react-hook-form";

import { Dropdown } from "./Dropdown";
import { DropdownOption } from "./types";

export type FormDropdownProps<T extends FieldValues> = {
  options: DropdownOption[];
  label: string;
  name: string;
  placeholder?: string;
  rules?: ControllerProps["rules"];
  required?: boolean;
  disabled?: boolean;
  onBeforeChange?: (value?: any) => boolean;
  control: Control<any, T>;
};

const FormDropdown = <T extends FieldValues>({
  options = [],
  label,
  name,
  placeholder,
  rules,
  required,
  disabled,
  onBeforeChange,
  control,
}: FormDropdownProps<T>) => {
  const getLabel = (key: string) => {
    return filter(options, (e) => e.value === key)[0]?.label;
  };
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Dropdown
          label={label}
          options={options}
          value={getLabel(value)}
          onSelect={(opt) => {
            const skip = onBeforeChange?.(opt.value as any);
            if (skip) {
              return;
            }
            onChange(opt.value);
          }}
          error={error?.message}
          isDisabled={disabled}
          required={required || !!rules?.required}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default FormDropdown;
