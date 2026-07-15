import { COPY_LIBRARY } from "./copyLibrary";
import type { CopyDraft, ProductInput } from "@/types";

function fill(tpl: string, input: ProductInput, point: string): string {
  return tpl
    .replace(/\{name\}/g, input.name || "好物")
    .replace(/\{point\}/g, point || "品质出众")
    .replace(/\{price\}/g, input.price || "")
    .replace(/\{category\}/g, input.category)
    .replace(/\{brand\}/g, input.brand || "")
    .replace(/\{material\}/g, input.material || "")
    .replace(/\{size\}/g, input.size || "")
    .replace(/\{color\}/g, input.color || "")
    .replace(/\{targetAudience\}/g, input.targetAudience || "");
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function generateCopy(input: ProductInput): CopyDraft {
  const lib = COPY_LIBRARY[input.style];
  const validPoints = input.sellingPoints.filter((s) => s.trim());
  
  const title = fill(pick(lib.titleTemplates), input, validPoints[0] || "品质出众");
  
  const sellingPoints: string[] = [];
  const usedPointIndices = new Set<number>();
  
  for (let i = 0; i < 2 && i < validPoints.length; i++) {
    const idx = Math.floor(Math.random() * validPoints.length);
    if (!usedPointIndices.has(idx)) {
      usedPointIndices.add(idx);
      const point = validPoints[idx];
      const template = pick(lib.sellingPointTemplates);
      sellingPoints.push(fill(template, input, point));
    }
  }
  
  if (sellingPoints.length === 0) {
    sellingPoints.push(fill(pick(lib.sellingPointTemplates), input, "品质出众"));
  }

  return { id: uid(), title, sellingPoints };
}

export function generateCopies(input: ProductInput): CopyDraft[] {
  const copies: CopyDraft[] = [];
  for (let i = 0; i < input.copyCount; i++) {
    copies.push(generateCopy(input));
  }
  return copies;
}
