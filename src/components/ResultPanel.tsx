// 右侧结果面板 — 根据状态切换空态/骨架/结果

import { useWorkbench } from "@/store/useWorkbench";
import { EmptyState } from "./result/EmptyState";
import { SkeletonResult } from "./result/SkeletonResult";
import { MainImageGrid } from "./result/MainImageGrid";
import { CopyList } from "./result/CopyList";

export function ResultPanel() {
  const result = useWorkbench((s) => s.result);
  const isGenerating = useWorkbench((s) => s.isGenerating);

  return (
    <div className="h-full">
      {isGenerating ? (
        <SkeletonResult />
      ) : result ? (
        <div className="animate-fade-up">
          <MainImageGrid />
          <CopyList />
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
