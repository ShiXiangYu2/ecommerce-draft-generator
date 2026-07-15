// 基础 UI 组件 — Card 容器与区块标题

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("rounded-2xl bg-white shadow-card p-5", className)}>{children}</div>
  );
}

export function SectionLabel({
  icon,
  title,
  hint,
  step,
}: {
  icon?: ReactNode;
  title: string;
  hint?: string;
  step?: number;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      {step !== undefined && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-coral-50 text-[11px] font-bold text-coral-600">
          {step}
        </span>
      )}
      {icon && <span className="text-coral-500">{icon}</span>}
      <h3 className="text-sm font-bold text-slatey-800">{title}</h3>
      {hint && <span className="ml-auto text-xs text-slatey-400">{hint}</span>}
    </div>
  );
}
