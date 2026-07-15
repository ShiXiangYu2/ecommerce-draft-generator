// 商品图上传 — 支持点击与拖拽，多图，可删除

import { useRef, useState } from "react";
import { ImagePlus, X, UploadCloud } from "lucide-react";
import { useWorkbench } from "@/store/useWorkbench";
import { Card, SectionLabel } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function ImageUploader() {
  const images = useWorkbench((s) => s.input.images);
  const addImage = useWorkbench((s) => s.addImage);
  const removeImage = useWorkbench((s) => s.removeImage);
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => addImage(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  return (
    <Card>
      <SectionLabel
        step={1}
        icon={<ImagePlus size={16} />}
        title="商品图"
        hint="可上传多张，首张用于主图"
      />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-7 transition-colors",
          dragging
            ? "border-coral-400 bg-coral-50"
            : "border-slatey-200 bg-slatey-50 hover:border-coral-300 hover:bg-coral-50/40",
        )}
      >
        <UploadCloud className="mb-2 text-coral-500" size={26} />
        <p className="text-sm font-medium text-slatey-600">点击或拖拽上传商品图</p>
        <p className="mt-1 text-xs text-slatey-400">支持 JPG / PNG，建议 800×800 以上</p>
      </div>

      {images.length > 0 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {images.map((src, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-lg border border-slatey-100 bg-white"
            >
              <img src={src} alt={`商品图${i + 1}`} className="h-full w-full object-contain" />
              {i === 0 && (
                <span className="absolute left-1 top-1 rounded bg-coral-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  主图
                </span>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(i);
                }}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slatey-800/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="删除"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
