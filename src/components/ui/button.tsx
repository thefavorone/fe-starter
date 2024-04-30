import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 group whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-primary-950 dark:focus-visible:ring-primary-300",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-primary-50 hover:bg-primary-500/90",
        destructive: "bg-red-500 text-primary-50 hover:bg-red-500/90",
        outline:
          "border border-primary-500 text-primary-500 bg-white hover:bg-primary-100",
        secondary: "bg-primary-100 text-primary-500 hover:bg-primary-100/80",
        ghost: "hover:bg-primary-100 hover:text-primary-500",
        link: "text-primary-600 font-medium underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        link: "p-0",
        "icon-sm": "size-8",
        "icon-xs": "size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    type = "button",
    className,
    variant,
    size,
    asChild = false,
    isLoading = false,
    disabled,
    children,
    ...restProps
  } = props;
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      type={type}
      className={cn(
        buttonVariants({
          variant,
          size: variant === "link" ? "link" : size,
          className,
        })
      )}
      ref={ref}
      disabled={disabled || isLoading}
      {...restProps}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Comp>
  );
});
Button.displayName = "Button";

export default Button;
