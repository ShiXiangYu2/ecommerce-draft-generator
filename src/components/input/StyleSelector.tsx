import { Minus, Plus, Palette, Hash, Save } from "lucide-react";
import { useWorkbench } from "@/store/useWorkbench";
import { STYLE_OPTIONS } from "@/types";
import type { StyleKey } from "@/types";
import { Card, SectionLabel } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function StyleSelector() {
  const style = useWorkbench((s) => s.input.style);
  const saveToLibrary = useWorkbench((s) => s.input.saveToLibrary);
  const updateInput = useWorkbench((s) => s.updateInput);

  return (
    <Card>
      <SectionLabel step={5} icon={<Palette size={16} />} title="视觉风格" />
      <div className="grid grid-cols-2 gap-2">
        {STYLE_OPTIONS.map((opt) => {
          const active = style === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => updateInput({ style: opt.key as StyleKey })}
              className={cn(
                "rounded-xl border p-3 text-left transition-all",
                active
                  ? "border-coral-400 bg-coral-50 shadow-pop"
                  : "border-slatey-200 bg-white hover:border-slatey-300",
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "text-sm font-bold",
                    active ? "text-coral-700" : "text-slatey-700",
                  )}
                >
                  {opt.label}
                </span>
                <span
                  className={cn(
                    "h-3 w-3 rounded-full border-2",
                    active ? "border-coral-500 bg-coral-500" : "border-slatey-200",
                  )}
                />
              </div>
              <p className="mt-0.5 text-[11px] leading-tight text-slatey-400">{opt.desc}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="checkbox"
          id="save-to-library"
          checked={saveToLibrary}
          onChange={(e) => updateInput({ saveToLibrary: e.target.checked })}
          className="h-4 w-4 rounded border-slatey-300 text-coral-500 focus:ring-coral-400"
        />
        <label htmlFor="save-to-library" className="flex items-center gap-1.5 text-sm text-slatey-600">
          <Save size={14} /> 保存到素材库，方便下次使用
        </label>
      </div>
    </Card>
  );
}

export function CountControls() {
  const mainImageCount = useWorkbench((s) => s.input.mainImageCount);
  const copyCount = useWorkbench((s) => s.input.copyCount);
  const updateInput = useWorkbench((s) => s.updateInput);

  return (
    <Card>
      <SectionLabel step={6} icon={<Hash size={16} />} title="生成数量" />

      <div className="space-y-3">
        <Stepper
          label="主图草稿"
          value={mainImageCount}
          min={1}
          max={6}
          onChange={(v) => updateInput({ mainImageCount: v })}
        />
        <Stepper
          label="文案草稿"
          value={copyCount}
          min={1}
          max={6}
          onChange={(v) => updateInput({ copyCount: v })}
        />
      </div>
    </Card>
  );
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slatey-600">{label}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-slatey-200 text-slatey-500 transition-colors hover:bg-slatey-50 disabled:opacity-40"
        >
          <Minus size={14} />
        </button>
        <span className="w-6 text-center font-mono-num text-sm font-bold text-slatey-800">
          {value}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-slatey-200 text-slatey-500 transition-colors hover:bg-slatey-50 disabled:opacity-40"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}
