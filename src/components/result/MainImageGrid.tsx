import { Download, RefreshCw, Eye } from "lucide-react";
import { useWorkbench } from "@/store/useWorkbench";
import type { MainImageDraft } from "@/types";

export function MainImageGrid() {
  const mainImages = useWorkbench((s) => s.result?.mainImages ?? []);
  const setPreview = useWorkbench((s) => s.setPreviewImage);
  const regenerate = useWorkbench((s) => s.regenerateMainImage);

  function download(draft: MainImageDraft) {
    const a = document.createElement("a");
    a.href = draft.dataUrl;
    a.download = `主图-${draft.id}.png`;
    a.click();
  }

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <span className="h-4 w-1 rounded-full bg-coral-500" />
        <h3 className="font-serif text-lg font-bold text-slatey-800">主图草稿</h3>
        <span className="ml-1 rounded-full bg-slatey-100 px-2 py-0.5 text-xs font-medium text-slatey-500">
          {mainImages.length} 张
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {mainImages.map((d, i) => (
          <div
            key={d.id}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-slatey-100 bg-white shadow-card transition-all hover:shadow-cardHover animate-fade-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <img src={d.dataUrl} alt="主图草稿" className="h-full w-full object-contain" />
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-slatey-900/45 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
              <FloatBtn onClick={() => setPreview(d.dataUrl)} label="预览">
                <Eye size={16} />
              </FloatBtn>
              <FloatBtn onClick={() => download(d)} label="下载">
                <Download size={16} />
              </FloatBtn>
              <FloatBtn onClick={() => regenerate(i)} label="重生成">
                <RefreshCw size={16} />
              </FloatBtn>
            </div>
            <div className="absolute bottom-2 right-2 rounded-full bg-slatey-900/60 px-2 py-0.5 text-[10px] font-medium text-white">
              {i + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FloatBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slatey-700 shadow-sm transition-all hover:scale-110 hover:bg-coral-500 hover:text-white active:scale-95"
    >
      {children}
    </button>
  );
}
