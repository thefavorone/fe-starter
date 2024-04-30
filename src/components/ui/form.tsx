import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldValues,
  FormProvider,
  UseFormReturn,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
  createContext,
  forwardRef,
  useContext,
  useId,
} from "react";

type FormProps<T extends FieldValues> = ComponentPropsWithoutRef<"form"> & {
  form: UseFormReturn<T>;
};

const Form = <T extends FieldValues>({
  form,
  children,
  ...props
}: FormProps<T>) => (
  <FormProvider {...form}>
    <form {...props}>{children}</form>
  </FormProvider>
);

type FormFieldContextValue = {
  id: string;
  name: string;
  field: ControllerRenderProps;
  state: ControllerFieldState;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = ({ render, ...props }: ControllerProps) => {
  const id = useId();

  return (
    <Controller
      {...props}
      render={(p) => (
        <FormFieldContext.Provider
          value={{ id, name: props.name, field: p.field, state: p.fieldState }}
        >
          {render(p)}
        </FormFieldContext.Provider>
      )}
    />
  );
};

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  return fieldContext;
};

type FormItemProps = HTMLAttributes<HTMLDivElement> & {
  dense?: boolean;
};

const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, dense, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(!dense && "space-y-1", className)}
        {...props}
      />
    );
  }
);
FormItem.displayName = "FormItem";

type FormLabelProps = ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
  dense?: boolean;
};

const FormLabel = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  FormLabelProps
>(({ className, dense, ...props }, ref) => {
  const { id } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(dense && "text-xs", className)}
      htmlFor={id}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = forwardRef<
  ElementRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { id, state } = useFormField();

  return <Slot ref={ref} id={id} aria-invalid={!!state.error} {...props} />;
});
FormControl.displayName = "FormControl";

const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const {
    state: { error },
  } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      className={cn(
        "text-sm font-medium text-red-500 dark:text-red-900",
        className
      )}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  // eslint-disable-next-line react-refresh/only-export-components
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
