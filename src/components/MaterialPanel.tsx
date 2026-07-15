import { useState } from "react";
import { X, Image, Trash2, Check, Search } from "lucide-react";
import { useWorkbench } from "@/store/useWorkbench";
import type { SavedMaterial } from "@/types";

export function MaterialPanel() {
  const materials = useWorkbench((s) => s.materials);
  const showPanel = useWorkbench((s) => s.showMaterialPanel);
  const togglePanel = useWorkbench((s) => s.toggleMaterialPanel);
  const applyMaterial = useWorkbench((s) => s.applyMaterial);
  const deleteMaterial = useWorkbench((s) => s.deleteMaterial);
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  if (!showPanel) return null;

  const filtered = materials.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.category.includes(search) ||
      m.brand.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slatey-900/30 backdrop-blur-sm" onClick={togglePanel} />
      <div className="relative w-full max-w-md border-l border-slatey-200 bg-white shadow-2xl animate-fade-up">
        <div className="flex items-center justify-between border-b border-slatey-100 px-5 py-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-slatey-800">素材库</h2>
            <p className="text-xs text-slatey-400">{materials.length} 个已保存素材</p>
          </div>
          <button onClick={togglePanel} className="rounded-lg p-1 text-slatey-400 hover:bg-slatey-50">
            <X size={20} />
          </button>
        </div>

        <div className="border-b border-slatey-100 px-5 py-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slatey-400" />
            <input
              className="w-full rounded-lg border border-slatey-200 bg-slatey-50 pl-9 pr-3 py-2 text-sm outline-none placeholder:text-slatey-300 focus:border-coral-400"
              placeholder="搜索商品名称/类目/品牌"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="max-h-[calc(100vh-140px)] overflow-y-auto p-5">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Image size={48} className="mb-3 text-slatey-200" />
              <p className="text-sm text-slatey-500">暂无保存的素材</p>
              <p className="mt-1 text-xs text-slatey-400">在生成时勾选"保存到素材库"即可保存</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((m) => (
                <MaterialCard
                  key={m.id}
                  material={m}
                  onApply={() => applyMaterial(m)}
                  onDelete={() => {
                    if (confirmDelete === m.id) {
                      deleteMaterial(m.id);
                      setConfirmDelete(null);
                    } else {
                      setConfirmDelete(m.id);
                    }
                  }}
                  confirmDelete={confirmDelete === m.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MaterialCard({
  material,
  onApply,
  onDelete,
  confirmDelete,
}: {
  material: SavedMaterial;
  onApply: () => void;
  onDelete: () => void;
  confirmDelete: boolean;
}) {
  const date = new Date(material.createdAt).toLocaleDateString("zh-CN");

  return (
    <div className="flex gap-3 rounded-xl border border-slatey-200 p-3 hover:border-coral-300 transition-colors">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slatey-100">
        {material.images[0] ? (
          <img src={material.images[0]} alt={material.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Image size={24} className="text-slatey-300" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div>
          <h3 className="truncate font-medium text-slatey-800">{material.name}</h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-slatey-500">
            <span className="rounded bg-slatey-100 px-1.5 py-0.5">{material.category}</span>
            {material.brand && (
              <span className="rounded bg-slatey-100 px-1.5 py-0.5">{material.brand}</span>
            )}
          </div>
          {material.sellingPoints.filter((p) => p.trim()).length > 0 && (
            <p className="mt-1 truncate text-xs text-slatey-400">
              卖点：{material.sellingPoints.filter((p) => p.trim()).slice(0, 2).join("、")}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slatey-300">{date}</span>
          <div className="flex gap-1">
            <button
              onClick={onApply}
              className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-coral-600 hover:bg-coral-50"
            >
              <Check size={12} /> 应用
            </button>
            <button
              onClick={onDelete}
              className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-colors ${
                confirmDelete
                  ? "bg-red-50 text-red-600"
                  : "text-slatey-400 hover:bg-red-50 hover:text-red-500"
              }`}
            >
              <Trash2 size={12} /> {confirmDelete ? "确认删除?" : "删除"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
