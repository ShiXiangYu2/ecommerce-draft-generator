import { useState, useRef } from "react";
import { Link2, ImagePlus, X, Upload } from "lucide-react";
import { useWorkbench } from "@/store/useWorkbench";
import { Card, SectionLabel } from "@/components/ui/Card";
import type { ReferenceItem } from "@/types";

export function ReferenceUploader() {
  const references = useWorkbench((s) => s.input.references);
  const addReference = useWorkbench((s) => s.addReference);
  const removeReference = useWorkbench((s) => s.removeReference);
  const [mode, setMode] = useState<"image" | "link">("image");
  const [linkValue, setLinkValue] = useState("");
  const [linkName, setLinkName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleImageUpload(files: FileList | null) {
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => {
        addReference({
          id: Math.random().toString(36).slice(2, 10),
          type: "image",
          value: reader.result as string,
          name: file.name,
        });
      };
      reader.readAsDataURL(file);
    });
  }

  function handleAddLink() {
    if (!linkValue.trim()) return;
    addReference({
      id: Math.random().toString(36).slice(2, 10),
      type: "link",
      value: linkValue.trim(),
      name: linkName.trim() || "参考链接",
    });
    setLinkValue("");
    setLinkName("");
  }

  return (
    <Card>
      <SectionLabel step={4} icon={<Link2 size={16} />} title="参考物" hint="爆款截图或参考链接" />

      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setMode("image")}
          className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors ${
            mode === "image"
              ? "bg-coral-50 text-coral-700"
              : "bg-slatey-50 text-slatey-500 hover:bg-slatey-100"
          }`}
        >
          <ImagePlus size={14} /> 上传截图
        </button>
        <button
          onClick={() => setMode("link")}
          className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors ${
            mode === "link"
              ? "bg-coral-50 text-coral-700"
              : "bg-slatey-50 text-slatey-500 hover:bg-slatey-100"
          }`}
        >
          <Link2 size={14} /> 添加链接
        </button>
      </div>

      {mode === "image" ? (
        <div
          onClick={() => fileRef.current?.click()}
          className="cursor-pointer rounded-lg border-2 border-dashed border-slatey-200 bg-slatey-50 py-4 text-center hover:border-coral-300 hover:bg-coral-50/40 transition-colors"
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleImageUpload(e.target.files)}
          />
          <Upload className="mx-auto mb-2 text-slatey-400" size={20} />
          <p className="text-xs text-slatey-500">点击上传参考图片（爆款截图等）</p>
        </div>
      ) : (
        <div className="space-y-2">
          <input
            className="w-full rounded-lg border border-slatey-200 bg-white px-3 py-2 text-sm text-slatey-800 outline-none placeholder:text-slatey-300 focus:border-coral-400"
            placeholder="链接名称（可选）"
            value={linkName}
            onChange={(e) => setLinkName(e.target.value)}
          />
          <input
            className="w-full rounded-lg border border-slatey-200 bg-white px-3 py-2 text-sm text-slatey-800 outline-none placeholder:text-slatey-300 focus:border-coral-400"
            placeholder="参考链接地址"
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddLink()}
          />
          <button
            onClick={handleAddLink}
            disabled={!linkValue.trim()}
            className="w-full rounded-lg bg-coral-500 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            添加链接
          </button>
        </div>
      )}

      {references.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {references.map((ref) => (
            <ReferenceTag key={ref.id} item={ref} onRemove={() => removeReference(ref.id)} />
          ))}
        </div>
      )}
    </Card>
  );
}

function ReferenceTag({ item, onRemove }: { item: ReferenceItem; onRemove: () => void }) {
  if (item.type === "image") {
    return (
      <div className="group relative h-12 w-12 overflow-hidden rounded-lg border border-slatey-200">
        <img src={item.value} alt={item.name} className="h-full w-full object-cover" />
        <button
          onClick={onRemove}
          className="absolute inset-0 flex items-center justify-center bg-slatey-900/60 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <X size={14} className="text-white" />
        </button>
      </div>
    );
  }
  return (
    <div className="group flex items-center gap-1.5 rounded-lg border border-slatey-200 bg-white px-2 py-1">
      <Link2 size={12} className="text-slatey-400" />
      <span className="max-w-[120px] truncate text-xs text-slatey-600">{item.name}</span>
      <button
        onClick={onRemove}
        className="opacity-0 transition-opacity group-hover:opacity-100"
      >
        <X size={12} className="text-slatey-400" />
      </button>
    </div>
  );
}
