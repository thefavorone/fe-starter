import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Slot } from "@radix-ui/react-slot";

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  dense?: boolean;
}

const BaseInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, dense, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          dense && "h-8",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
BaseInput.displayName = "BaseInput";

export interface InputProps extends BaseInputProps {
  icon?: React.ReactNode;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      icon,
      leftElement,
      rightElement,
      containerClassName,
      ...props
    },
    ref
  ) => {
    let leftEl = leftElement;

    if (props.type === "tel") {
      leftEl = <p>+62</p>;
    }

    return (
      <div className={cn("relative w-auto", containerClassName)}>
        {icon ? (
          <Slot className="absolute top-1/2 -translate-y-1/2 left-0 pl-3 size-8 pointer-events-none">
            {icon}
          </Slot>
        ) : leftEl ? (
          <div className="absolute left-0 inset-y-0 w-10 overflow-hidden pointer-events-none text-xs rounded-l-md flex items-center justify-center text-center">
            {leftEl}
          </div>
        ) : null}

        <BaseInput
          ref={ref}
          className={cn(icon ? "pl-10" : leftEl ? "pl-12" : "", className)}
          {...props}
        />

        {rightElement ? (
          <div className="absolute right-0 inset-y-0 overflow-hidden pointer-events-none text-xs rounded-l-md flex items-center px-2 text-center">
            {rightElement}
          </div>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

interface InputFieldProps extends Omit<InputProps, "name"> {
  name: string;
  label?: string;
  inputClassName?: string;
}

const InputField = ({
  label,
  className,
  inputClassName,
  ...props
}: InputFieldProps) => {
  return (
    <FormField
      name={props.name}
      render={({ field }) => (
        <FormItem className={className} dense={props.dense}>
          <FormLabel dense={props.dense} className="font-semibold">{label}</FormLabel>

          <FormControl>
            <Input
              className={inputClassName}
              {...props}
              {...field}
              value={field.value || ""}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Input, InputField };
