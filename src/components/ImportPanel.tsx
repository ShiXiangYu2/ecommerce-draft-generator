import { useState, useRef } from "react";
import { X, Upload, Download, CheckSquare, Square, ChevronDown, ChevronUp, ArrowRight, Search } from "lucide-react";
import { useWorkbench } from "@/store/useWorkbench";
import { parseCSV, sampleCSVContent } from "@/lib/csvParser";
import type { ImportedProduct } from "@/lib/csvParser";

export function ImportPanel() {
  const importedProducts = useWorkbench((s) => s.importedProducts);
  const showPanel = useWorkbench((s) => s.showImportPanel);
  const togglePanel = useWorkbench((s) => s.toggleImportPanel);
  const importProducts = useWorkbench((s) => s.importProducts);
  const toggleSelection = useWorkbench((s) => s.toggleProductSelection);
  const selectAll = useWorkbench((s) => s.selectAllProducts);
  const deselectAll = useWorkbench((s) => s.deselectAllProducts);
  const applyProduct = useWorkbench((s) => s.applyProduct);
  const generate = useWorkbench((s) => s.generate);

  const [search, setSearch] = useState("");
  const [isBatchGenerating, setIsBatchGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!showPanel) return null;

  const filtered = importedProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.includes(search) ||
      p.brand.toLowerCase().includes(search.toLowerCase()),
  );

  const allSelected = importedProducts.length > 0 && importedProducts.every((p) => p.selected);
  const selectedCount = importedProducts.filter((p) => p.selected).length;

  async function handleBatchGenerate() {
    const selectedProducts = importedProducts.filter((p) => p.selected);
    if (selectedProducts.length === 0) return;

    setIsBatchGenerating(true);
    togglePanel();

    for (const product of selectedProducts) {
      applyProduct(product);
      await new Promise((resolve) => setTimeout(resolve, 500));
      await generate();
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    setIsBatchGenerating(false);
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      try {
        const products = parseCSV(text);
        if (products.length === 0) {
          alert("未解析到有效的商品数据，请检查 CSV 文件格式");
          return;
        }
        importProducts(products);
      } catch {
        alert("CSV 文件解析失败，请检查文件格式");
      }
    };
    reader.readAsText(file, "UTF-8");
  }

  function downloadSample() {
    const content = sampleCSVContent();
    const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "商品导入模板.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slatey-900/30 backdrop-blur-sm" onClick={togglePanel} />
      <div className="relative w-full max-w-lg border-l border-slatey-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slatey-100 px-5 py-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-slatey-800">批量导入</h2>
            <p className="text-xs text-slatey-400">
              已导入 {importedProducts.length} 个商品
              {selectedCount > 0 && `，已选 ${selectedCount} 个`}
            </p>
          </div>
          <button onClick={togglePanel} className="rounded-lg p-1 text-slatey-400 hover:bg-slatey-50">
            <X size={20} />
          </button>
        </div>

        <div className="border-b border-slatey-100 p-5">
          <div className="flex flex-col gap-3">
            <button
              onClick={handleUploadClick}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slatey-200 bg-slatey-50 py-4 text-sm font-medium text-slatey-600 hover:border-coral-300 hover:bg-coral-50/50"
            >
              <Upload size={18} /> 上传 CSV/Excel 文件
            </button>
            <button
              onClick={downloadSample}
              className="flex items-center justify-center gap-2 rounded-lg border border-slatey-200 py-2.5 text-sm text-slatey-500 hover:bg-slatey-50"
            >
              <Download size={16} /> 下载导入模板
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          <p className="mt-3 text-[11px] text-slatey-400">
            支持的字段：商品名称、价格、类目、品牌、材质、尺寸、颜色、适用人群、卖点（逗号分隔）
          </p>
        </div>

        {importedProducts.length > 0 && (
          <>
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

            <div className="border-b border-slatey-100 px-5 py-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={allSelected ? deselectAll : selectAll}
                  className="flex items-center gap-2 text-sm text-slatey-600 hover:text-slatey-800"
                >
                  {allSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                  {allSelected ? "取消全选" : "全选"}
                </button>
                {selectedCount > 0 && (
                  <button
                    onClick={() => handleBatchGenerate()}
                    className="flex items-center gap-1.5 rounded-lg bg-coral-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-coral-600"
                  >
                    <Upload size={14} /> 批量生成 ({selectedCount})
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Search size={48} className="mb-3 text-slatey-200" />
                  <p className="text-sm text-slatey-500">未找到匹配的商品</p>
                </div>
              ) : (
                <div className="divide-y divide-slatey-100">
                  {filtered.map((product) => (
                    <ProductRow
                      key={product.id}
                      product={product}
                      selected={product.selected}
                      onToggle={() => toggleSelection(product.id)}
                      onApply={() => applyProduct(product)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {importedProducts.length === 0 && (
          <div className="p-5">
            <div className="rounded-xl border border-slatey-200 bg-slatey-50/50 p-4 text-center">
              <p className="text-sm text-slatey-500">上传 CSV 文件导入商品列表</p>
              <p className="mt-1 text-xs text-slatey-400">每行一个商品，第一行为表头</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductRow({
  product,
  selected,
  onToggle,
  onApply,
}: {
  product: ImportedProduct;
  selected: boolean;
  onToggle: () => void;
  onApply: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="px-5 py-3 hover:bg-slatey-50">
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-slatey-300 text-sm transition-colors"
        >
          {selected && <CheckSquare size={14} className="text-coral-500" />}
        </button>
        <div className="flex flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="truncate font-medium text-slatey-800">{product.name}</h4>
            <button
              onClick={() => setExpanded(!expanded)}
              className="shrink-0 text-slatey-400"
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {product.category && (
              <span className="rounded bg-slatey-100 px-1.5 py-0.5 text-[10px] text-slatey-500">
                {product.category}
              </span>
            )}
            {product.brand && (
              <span className="rounded bg-coral-50 px-1.5 py-0.5 text-[10px] text-coral-600">
                {product.brand}
              </span>
            )}
            {product.price && (
              <span className="rounded bg-slatey-100 px-1.5 py-0.5 text-[10px] font-mono-num text-slatey-600">
                ¥{product.price}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onApply}
          className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-coral-600 hover:bg-coral-50"
        >
          <ArrowRight size={14} /> 应用
        </button>
      </div>

      {expanded && (
        <div className="mt-3 ml-8 space-y-2 text-xs text-slatey-500">
          {product.material && <p><span className="text-slatey-400">材质：</span>{product.material}</p>}
          {product.size && <p><span className="text-slatey-400">尺寸：</span>{product.size}</p>}
          {product.color && <p><span className="text-slatey-400">颜色：</span>{product.color}</p>}
          {product.targetAudience && <p><span className="text-slatey-400">适用人群：</span>{product.targetAudience}</p>}
          {product.sellingPoints.length > 0 && (
            <p><span className="text-slatey-400">卖点：</span>{product.sellingPoints.join("、")}</p>
          )}
        </div>
      )}
    </div>
  );
}
