// 主图大图预览弹窗

import { X, Download } from "lucide-react";
import { useWorkbench } from "@/store/useWorkbench";

export function PreviewModal() {
  const src = useWorkbench((s) => s.previewImage);
  const setPreview = useWorkbench((s) => s.setPreviewImage);

  if (!src) return null;

  function download() {
    const a = document.createElement("a");
    a.href = src;
    a.download = "主图预览.png";
    a.click();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slatey-900/75 p-6 backdrop-blur-sm animate-pop-in"
      onClick={() => setPreview(null)}
    >
      <div className="relative max-h-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt="主图预览"
          className="max-h-[82vh] rounded-2xl bg-white shadow-2xl"
        />
        <div className="absolute -top-12 right-0 flex gap-2">
          <button
            onClick={download}
            className="flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-2 text-sm font-medium text-slatey-700 shadow-md transition-colors hover:bg-coral-500 hover:text-white"
          >
            <Download size={15} /> 下载
          </button>
          <button
            onClick={() => setPreview(null)}
            aria-label="关闭"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/95 text-slatey-700 shadow-md transition-colors hover:bg-slatey-800 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
