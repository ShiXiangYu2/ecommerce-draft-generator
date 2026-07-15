// 主图 Canvas 合成引擎 — 加载图片、调用模板绘制、导出 dataUrl

import { pickTemplate } from "./templates";
import type { MainImageDraft, ProductInput } from "@/types";

const W = 800;
const H = 800;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function ensureFonts(): Promise<void> {
  if (document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      /* 忽略字体加载异常 */
    }
  }
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

/** 生成单张主图，index 用于在风格模板池中错开选择 */
export async function generateMainImage(
  input: ProductInput,
  index: number,
): Promise<MainImageDraft> {
  await ensureFonts();
  const template = pickTemplate(input.style, index);

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D 上下文不可用");

  let image: HTMLImageElement | null = null;
  if (input.images[0]) {
    try {
      image = await loadImage(input.images[0]);
    } catch {
      image = null;
    }
  }

  template.draw({ ctx, width: W, height: H, product: input, image });

  return {
    id: uid(),
    dataUrl: canvas.toDataURL("image/png"),
    templateId: template.id,
  };
}

/** 批量生成主图草稿 */
export async function generateMainImages(input: ProductInput): Promise<MainImageDraft[]> {
  return Promise.all(
    Array.from({ length: input.mainImageCount }, (_, i) => generateMainImage(input, i)),
  );
}
