import { useWorkbench } from "@/store/useWorkbench";
import { CopyCard } from "./CopyCard";

export function CopyList() {
  const copies = useWorkbench((s) => s.result?.copies ?? []);

  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-4 w-1 rounded-full bg-coral-500" />
        <h3 className="font-serif text-lg font-bold text-slatey-800">文案草稿</h3>
        <span className="ml-1 rounded-full bg-slatey-100 px-2 py-0.5 text-xs font-medium text-slatey-500">
          {copies.length} 条
        </span>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {copies.map((c, i) => (
          <CopyCard key={c.id} draft={c} index={i} />
        ))}
      </div>
    </section>
  );
}
