// 右侧空状态 — 未生成时的引导

import { Wand2 } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <div className="relative mb-7">
        <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-coral-100 opacity-50 blur-3xl" />
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-coral-400 to-coral-600 shadow-pop animate-pop-in">
          <Wand2 className="text-white" size={40} />
        </div>
      </div>
      <h2 className="font-serif text-2xl font-bold text-slatey-800">
        一键生成主图与文案草稿
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-slatey-400">
        在左侧填写商品信息、上传商品图，选择风格与数量，点击顶部「生成草稿」即可批量产出可挑选、可微调的草稿。
      </p>
      <div className="mt-7 flex gap-6 text-xs text-slatey-400">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-coral-400" /> 4 种视觉风格
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-coral-400" /> 多模板随机
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-coral-400" /> 可下载可编辑
        </span>
      </div>
    </div>
  );
}
