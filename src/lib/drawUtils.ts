// Canvas 绘制工具函数 — 供主图模板使用

type Ctx = CanvasRenderingContext2D;

/** 圆角矩形路径 */
export function roundRect(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

/** contain 模式绘制图片，可选圆角裁剪、阴影、底色 */
export function drawImageContain(
  ctx: Ctx,
  image: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  opts?: { radius?: number; shadow?: boolean; bg?: string },
) {
  const iw = image.naturalWidth || image.width;
  const ih = image.naturalHeight || image.height;
  const scale = Math.min(w / iw, h / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = x + (w - dw) / 2;
  const dy = y + (h - dh) / 2;

  ctx.save();
  if (opts?.bg) {
    ctx.fillStyle = opts.bg;
    roundRect(ctx, x, y, w, h, opts.radius ?? 0);
    ctx.fill();
  }
  if (opts?.shadow) {
    ctx.shadowColor = "rgba(0,0,0,0.20)";
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 10;
  }
  if (opts?.radius) {
    roundRect(ctx, dx, dy, dw, dh, opts.radius);
    ctx.clip();
  }
  ctx.drawImage(image, dx, dy, dw, dh);
  ctx.restore();
}

/** 中文友好换行绘制，超出 maxLines 截断加省略号，返回总高度 */
export function wrapText(
  ctx: Ctx,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 3,
): number {
  const chars = Array.from(text || "");
  const lines: string[] = [];
  let line = "";
  for (const ch of chars) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = ch;
      if (lines.length >= maxLines - 1) break;
    } else {
      line = test;
    }
  }
  if (lines.length < maxLines) lines.push(line);

  // 末行截断
  const lastIdx = lines.length - 1;
  let last = lines[lastIdx];
  while (ctx.measureText(last + "…").width > maxWidth && last.length > 0) {
    last = last.slice(0, -1);
  }
  lines[lastIdx] = last + "…";

  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight));
  return lines.length * lineHeight;
}

/** 绘制单行文字（不换行），自动缩小到 maxWidth */
export function fitText(
  ctx: Ctx,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  baseline: CanvasTextBaseline = "top",
) {
  ctx.save();
  ctx.textBaseline = baseline;
  let t = text;
  while (ctx.measureText(t).width > maxWidth && t.length > 1) {
    t = t.slice(0, -1);
  }
  if (t !== text) t = t.slice(0, -1) + "…";
  ctx.fillText(t, x, y);
  ctx.restore();
}

/** 绘制胶囊形标签 */
export function drawPill(
  ctx: Ctx,
  text: string,
  x: number,
  y: number,
  opts: { bg: string; color: string; font: string; padX?: number; padY?: number },
) {
  const padX = opts.padX ?? 14;
  const padY = opts.padY ?? 6;
  ctx.save();
  ctx.font = opts.font;
  const tw = ctx.measureText(text).width;
  const w = tw + padX * 2;
  const h = parseInt(opts.font, 10) * 1.0 + padY * 2;
  ctx.fillStyle = opts.bg;
  roundRect(ctx, x, y, w, h, h / 2);
  ctx.fill();
  ctx.fillStyle = opts.color;
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + padX, y + h / 2);
  ctx.restore();
  return w;
}

/** 绘制线性渐变背景 */
export function gradientBg(ctx: Ctx, w: number, h: number, stops: [number, string][]) {
  const g = ctx.createLinearGradient(0, 0, w, h);
  stops.forEach(([offset, color]) => g.addColorStop(offset, color));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}
