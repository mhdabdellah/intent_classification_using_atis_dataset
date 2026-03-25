import * as React from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent)] text-white shadow-[0_10px_30px_rgba(15,118,110,0.25)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,118,110,0.28)]",
  secondary:
    "border border-[var(--border)] bg-white/70 text-[var(--fg)] hover:bg-white",
  ghost: "text-[var(--fg)] hover:bg-black/5"
};

export function Button({
  variant = "secondary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    />
  );
}
