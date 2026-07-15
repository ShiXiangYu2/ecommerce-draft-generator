// 按钮组件 — 三种变体

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({ variant = "primary", className, children, ...rest }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed select-none";
  const variants: Record<Variant, string> = {
    primary:
      "bg-coral-500 text-white shadow-pop hover:bg-coral-600 active:scale-[0.98] px-4 py-2",
    secondary:
      "border border-slatey-200 text-slatey-700 bg-white hover:bg-slatey-50 active:scale-[0.98] px-4 py-2",
    ghost: "text-slatey-500 hover:text-slatey-800 hover:bg-slatey-50 px-3 py-1.5",
  };
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
