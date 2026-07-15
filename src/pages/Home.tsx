import { useEffect } from "react";
import { TopBar } from "@/components/TopBar";
import { InputPanel } from "@/components/InputPanel";
import { ResultPanel } from "@/components/ResultPanel";
import { MaterialPanel } from "@/components/MaterialPanel";
import { ImportPanel } from "@/components/ImportPanel";
import { PreviewModal } from "@/components/result/PreviewModal";
import { useWorkbench } from "@/store/useWorkbench";

export default function Home() {
  const loadMaterials = useWorkbench((s) => s.loadMaterials);

  useEffect(() => {
    loadMaterials();
  }, [loadMaterials]);

  return (
    <div className="flex h-screen flex-col">
      <TopBar />
      <main className="flex flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
        <aside className="border-b border-slatey-100 bg-slatey-50/50 p-4 lg:w-[400px] lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-r">
          <InputPanel />
        </aside>
        <section className="flex-1 p-4 sm:p-6 lg:overflow-y-auto">
          <ResultPanel />
        </section>
      </main>
      <PreviewModal />
      <MaterialPanel />
      <ImportPanel />
    </div>
  );
}
