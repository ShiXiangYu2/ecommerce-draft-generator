import { Type, Tag, FolderTree, Building2, Layers, Ruler, Palette, Users } from "lucide-react";
import { useWorkbench } from "@/store/useWorkbench";
import { CATEGORIES, COLORS, TARGET_AUDIENCES } from "@/types";
import { Card, SectionLabel } from "@/components/ui/Card";

export function BasicInfoForm() {
  const input = useWorkbench((s) => s.input);
  const updateInput = useWorkbench((s) => s.updateInput);

  const inputCls =
    "w-full rounded-lg border border-slatey-200 bg-white px-3 py-2 text-sm text-slatey-800 outline-none transition-all placeholder:text-slatey-300 focus:border-coral-400 focus:ring-2 focus:ring-coral-100";

  return (
    <Card>
      <SectionLabel step={2} icon={<Type size={16} />} title="商品基础信息" />

      <label className="mb-3 block">
        <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slatey-600">
          <Type size={12} /> 商品名称 <span className="text-red-400">*</span>
        </span>
        <input
          className={inputCls}
          placeholder="如：纯棉宽松短袖T恤"
          value={input.name}
          onChange={(e) => updateInput({ name: e.target.value })}
          maxLength={50}
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slatey-600">
            <Building2 size={12} /> 品牌
          </span>
          <input
            className={inputCls}
            placeholder="如：优衣库"
            value={input.brand}
            onChange={(e) => updateInput({ brand: e.target.value })}
            maxLength={20}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slatey-600">
            <FolderTree size={12} /> 类目
          </span>
          <select
            className={inputCls}
            value={input.category}
            onChange={(e) => updateInput({ category: e.target.value })}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slatey-600">
            <Layers size={12} /> 材质
          </span>
          <input
            className={inputCls}
            placeholder="如：纯棉/聚酯纤维"
            value={input.material}
            onChange={(e) => updateInput({ material: e.target.value })}
            maxLength={30}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slatey-600">
            <Ruler size={12} /> 尺寸
          </span>
          <input
            className={inputCls}
            placeholder="如：S/M/L/XL"
            value={input.size}
            onChange={(e) => updateInput({ size: e.target.value })}
            maxLength={20}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slatey-600">
            <Palette size={12} /> 颜色
          </span>
          <select
            className={inputCls}
            value={input.color}
            onChange={(e) => updateInput({ color: e.target.value })}
          >
            <option value="">请选择颜色</option>
            {COLORS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slatey-600">
            <Users size={12} /> 适用人群
          </span>
          <select
            className={inputCls}
            value={input.targetAudience}
            onChange={(e) => updateInput({ targetAudience: e.target.value })}
          >
            <option value="">请选择人群</option>
            {TARGET_AUDIENCES.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slatey-600">
            <Tag size={12} /> 价格 ¥
          </span>
          <input
            className={`${inputCls} font-mono-num`}
            placeholder="99.00"
            value={input.price}
            onChange={(e) => updateInput({ price: e.target.value.replace(/[^\d.]/g, "") })}
            inputMode="decimal"
          />
        </label>
      </div>
    </Card>
  );
}
