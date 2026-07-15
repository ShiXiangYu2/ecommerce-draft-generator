import { useState } from "react";
import { Copy, Check, RefreshCw, Pencil, Hash } from "lucide-react";
import type { CopyDraft } from "@/types";
import { useWorkbench } from "@/store/useWorkbench";
import { copyText } from "@/lib/utils";

export function CopyCard({ draft, index }: { draft: CopyDraft; index: number }) {
  const regenerate = useWorkbench((s) => s.regenerateCopy);
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(draft.title);
  const [editPoints, setEditPoints] = useState([...draft.sellingPoints]);

  async function copy() {
    const full = [draft.title, ...draft.sellingPoints].join("\n");
    await copyText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleRegenerate() {
    regenerate(index);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="rounded-2xl border border-coral-300 bg-white p-4 shadow-card animate-fade-up">
        <input
          className="w-full rounded-md border border-coral-200 bg-coral-50/40 px-3 py-2 font-serif text-lg font-bold text-slatey-800 outline-none focus:border-coral-400"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <div className="mt-3 space-y-2">
          {editPoints.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <Hash size={14} className="text-coral-400" />
              <input
                className="flex-1 rounded-md border border-slatey-200 px-3 py-2 text-sm text-slatey-700 outline-none focus:border-coral-400"
                value={p}
                onChange={(e) => {
                  const newPoints = [...editPoints];
                  newPoints[i] = e.target.value;
                  setEditPoints(newPoints);
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => setEditing(false)}
            className="rounded-lg px-4 py-2 text-sm text-slatey-600 hover:bg-slatey-50"
          >
            取消
          </button>
          <button
            onClick={handleRegenerate}
            className="rounded-lg bg-coral-500 px-4 py-2 text-sm font-medium text-white hover:bg-coral-600"
          >
            重生成
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slatey-100 bg-white p-4 shadow-card transition-all hover:shadow-cardHover animate-fade-up">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral-100 text-[10px] font-bold text-coral-600">
            {index + 1}
          </span>
          <h4 className="flex-1 font-serif text-lg font-bold leading-snug text-slatey-800">
            {draft.title}
          </h4>
        </div>
        <div className="flex shrink-0 gap-1">
          <IconBtn onClick={() => setEditing(true)} label="编辑">
            <Pencil size={14} />
          </IconBtn>
          <IconBtn onClick={copy} label="复制">
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </IconBtn>
          <IconBtn onClick={handleRegenerate} label="重生成">
            <RefreshCw size={14} />
          </IconBtn>
        </div>
      </div>

      <div className="space-y-2">
        {draft.sellingPoints.map((point, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slatey-100 text-[10px] font-bold text-slatey-500">
              {i + 1}
            </span>
            <p className="text-sm leading-relaxed text-slatey-600">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function IconBtn({
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
      className="flex h-7 w-7 items-center justify-center rounded-md text-slatey-400 transition-colors hover:bg-slatey-50 hover:text-slatey-700"
    >
      {children}
    </button>
  );
}
