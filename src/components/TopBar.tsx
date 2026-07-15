import { Sparkles, Eraser, Loader2, FolderOpen, Upload } from "lucide-react";
import { useWorkbench } from "@/store/useWorkbench";
import { Button } from "@/components/ui/Button";

export function TopBar() {
  const generate = useWorkbench((s) => s.generate);
  const clearAll = useWorkbench((s) => s.clearAll);
  const toggleMaterialPanel = useWorkbench((s) => s.toggleMaterialPanel);
  const toggleImportPanel = useWorkbench((s) => s.toggleImportPanel);
  const isGenerating = useWorkbench((s) => s.isGenerating);
  const error = useWorkbench((s) => s.error);
  const clearError = useWorkbench((s) => s.clearError);

  return (
    <header className="sticky top-0 z-30 border-b border-slatey-100 bg-white/85 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-coral-400 to-coral-600 shadow-pop">
            <Sparkles className="text-white" size={18} />
          </div>
          <div>
            <h1 className="font-serif text-base font-bold leading-tight text-slatey-800">
              电商草稿生成器
            </h1>
            <p className="text-[11px] text-slatey-400">批量生成主图与文案</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={toggleImportPanel} disabled={isGenerating}>
            <Upload size={15} /> 批量导入
          </Button>
          <Button variant="ghost" onClick={toggleMaterialPanel} disabled={isGenerating}>
            <FolderOpen size={15} /> 素材库
          </Button>
          <Button variant="ghost" onClick={clearAll} disabled={isGenerating}>
            <Eraser size={15} /> 清空
          </Button>
          <Button onClick={generate} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 size={16} className="animate-spin" /> 生成中
              </>
            ) : (
              <>
                <Sparkles size={16} /> 生成草稿
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <div className="flex items-center justify-between bg-coral-50 px-6 py-2 text-sm text-coral-700">
          <span>{error}</span>
          <button
            onClick={clearError}
            className="text-xs font-medium text-coral-500 hover:text-coral-700"
          >
            忽略
          </button>
        </div>
      )}
    </header>
  );
}
