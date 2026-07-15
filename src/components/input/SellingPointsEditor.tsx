// 卖点编辑器 — 多条可增删

import { Plus, Trash2, Sparkles } from "lucide-react";
import { useWorkbench } from "@/store/useWorkbench";
import { Card, SectionLabel } from "@/components/ui/Card";

export function SellingPointsEditor() {
  const points = useWorkbench((s) => s.input.sellingPoints);
  const add = useWorkbench((s) => s.addSellingPoint);
  const remove = useWorkbench((s) => s.removeSellingPoint);
  const update = useWorkbench((s) => s.updateSellingPoint);

  return (
    <Card>
      <SectionLabel
        step={3}
        icon={<Sparkles size={16} />}
        title="核心卖点"
        hint={`${points.filter((p) => p.trim()).length}/${points.length}`}
      />
      <div className="space-y-2">
        {points.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slatey-50 text-xs font-bold text-slatey-400">
              {i + 1}
            </span>
            <input
              className="flex-1 rounded-lg border border-slatey-200 bg-white px-3 py-1.5 text-sm text-slatey-800 outline-none transition-all placeholder:text-slatey-300 focus:border-coral-400 focus:ring-2 focus:ring-coral-100"
              placeholder={`如：${i === 0 ? "新疆长绒棉 亲肤透气" : "多次水洗不变形"}`}
              value={p}
              onChange={(e) => update(i, e.target.value)}
              maxLength={20}
            />
            {points.length > 1 && (
              <button
                onClick={() => remove(i)}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slatey-300 transition-colors hover:bg-red-50 hover:text-red-500"
                aria-label="删除卖点"
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={add}
        disabled={points.length >= 6}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slatey-200 py-2 text-xs font-medium text-slatey-500 transition-colors hover:border-coral-300 hover:text-coral-600 disabled:opacity-40"
      >
        <Plus size={14} /> 添加卖点（最多 6 条）
      </button>
    </Card>
  );
}
