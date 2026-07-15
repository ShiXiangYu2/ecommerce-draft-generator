// 主图模板接口定义

import type { StyleKey, ProductInput } from "@/types";

export interface DrawContext {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  product: ProductInput;
  image: HTMLImageElement | null;
}

export interface MainImageTemplate {
  id: string;
  name: string;
  style: StyleKey;
  draw: (c: DrawContext) => void;
}
