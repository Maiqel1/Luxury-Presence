import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button inline-flex max-w-full shrink-0 items-center justify-center gap-3 rounded-none border text-center text-[0.7rem] leading-snug font-semibold tracking-[0.18em] uppercase transition-[background-color,border-color,color,box-shadow,transform] duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-rose-mid focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-transparent bg-ink text-snow hover:bg-rose focus-visible:ring-offset-snow",
        inverse: "border-transparent bg-snow text-ink hover:bg-rose-light focus-visible:ring-offset-night",
        outline: "border-ink/30 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-snow",
        light: "border-snow/40 bg-transparent text-snow hover:border-snow hover:bg-snow hover:text-ink focus-visible:ring-offset-night",
        ghost: "border-transparent text-ink hover:bg-mist",
      },
      size: {
        default: "min-h-11 px-6 py-3",
        sm: "min-h-10 px-5 py-2.5",
        lg: "min-h-14 px-8 py-4",
        icon: "size-11 tracking-normal",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
