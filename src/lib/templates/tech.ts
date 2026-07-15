// 科技未来风格模板 — 深色霓虹、参数感、未来感

import { drawImageContain, fitText, gradientBg, roundRect, wrapText } from "../drawUtils";
import type { MainImageTemplate } from "./types";

const W = 800;
const H = 800;

/** 绘制网格线背景 */
function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number, color: string) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let x = 0; x <= w; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
}

export const techTemplates: MainImageTemplate[] = [
  {
    id: "tech-neon",
    name: "霓虹边框",
    style: "tech",
    draw: ({ ctx, product, image }) => {
      gradientBg(ctx, W, H, [
        [0, "#0B1226"],
        [1, "#1A2348"],
      ]);
      // 霓虹边框
      ctx.strokeStyle = "#3FE0D0";
      ctx.lineWidth = 3;
      ctx.shadowColor = "#3FE0D0";
      ctx.shadowBlur = 24;
      roundRect(ctx, 40, 40, W - 80, H - 80, 16);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 顶部标签
      ctx.fillStyle = "#3FE0D0";
      ctx.font = "700 22px 'JetBrains Mono'";
      ctx.textAlign = "left";
      ctx.fillText("// NEXT-GEN", 80, 100);

      // 商品图发光
      if (image) {
        ctx.save();
        ctx.shadowColor = "rgba(63,224,208,0.5)";
        ctx.shadowBlur = 32;
        drawImageContain(ctx, image, 140, 150, W - 280, 420, { radius: 18 });
        ctx.restore();
      } else {
        ctx.fillStyle = "#1A2348";
        roundRect(ctx, 140, 150, W - 280, 420, 18);
        ctx.fill();
      }

      // 底部商品名 + 参数式卖点
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "700 44px 'Noto Sans SC'";
      fitText(ctx, product.name || "商品名称", 80, 610, W - 160, "top");
      const point = product.sellingPoints.find((s) => s.trim()) || "性能跃迁";
      ctx.font = "500 24px 'JetBrains Mono'";
      ctx.fillStyle = "#3FE0D0";
      fitText(ctx, `> ${point}`, 80, 672, W - 160, "top");
      ctx.fillStyle = "#A8B0BE";
      ctx.font = "500 24px 'JetBrains Mono'";
      ctx.fillText(`¥${product.price || "??"} · 现货发售`, 80, 712);
    },
  },
  {
    id: "tech-grid",
    name: "网格参数",
    style: "tech",
    draw: ({ ctx, product, image }) => {
      ctx.fillStyle = "#0A0A0F";
      ctx.fillRect(0, 0, W, H);
      drawGrid(ctx, W, H, "rgba(63,224,208,0.08)");

      // 左侧商品图
      if (image) {
        ctx.save();
        ctx.strokeStyle = "#3FE0D0";
        ctx.lineWidth = 2;
        roundRect(ctx, 56, 56, 360, 360, 12);
        ctx.stroke();
        ctx.clip();
        drawImageContain(ctx, image, 56, 56, 360, 360, {});
        ctx.restore();
      } else {
        ctx.strokeStyle = "#3FE0D0";
        roundRect(ctx, 56, 56, 360, 360, 12);
        ctx.stroke();
      }

      // 右侧参数列表
      ctx.textAlign = "left";
      ctx.fillStyle = "#3FE0D0";
      ctx.font = "700 24px 'JetBrains Mono'";
      ctx.fillText("SPEC SHEET", 460, 90);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "700 40px 'Noto Sans SC'";
      wrapText(ctx, product.name || "商品名称", 460, 130, 290, 50, 3);

      const points = product.sellingPoints.filter((s) => s.trim());
      const list = points.length ? points : ["性能跃迁", "算力拉满"];
      ctx.font = "500 22px 'JetBrains Mono'";
      list.slice(0, 5).forEach((p, i) => {
        const y = 320 + i * 44;
        ctx.fillStyle = "#3FE0D0";
        ctx.fillText("[#]", 460, y);
        ctx.fillStyle = "#E9EBEF";
        fitText(ctx, p, 510, y, 240, "top");
      });

      // 底部价格
      ctx.fillStyle = "#3FE0D0";
      ctx.font = "700 48px 'JetBrains Mono'";
      ctx.fillText(`¥${product.price || "??"}`, 56, 700);
    },
  },
  {
    id: "tech-aurora",
    name: "极光光斑",
    style: "tech",
    draw: ({ ctx, product, image }) => {
      gradientBg(ctx, W, H, [
        [0, "#1A0B3D"],
        [0.5, "#3D1A6B"],
        [1, "#0B1A3D"],
      ]);
      // 光斑
      ctx.save();
      ctx.globalAlpha = 0.4;
      const g1 = ctx.createRadialGradient(180, 200, 0, 180, 200, 240);
      g1.addColorStop(0, "#FF5A3C");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);
      const g2 = ctx.createRadialGradient(640, 600, 0, 640, 600, 260);
      g2.addColorStop(0, "#3FE0D0");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // 商品图
      if (image) {
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.4)";
        ctx.shadowBlur = 36;
        drawImageContain(ctx, image, 160, 120, W - 320, 460, { radius: 20 });
        ctx.restore();
      }

      // 底部文字
      ctx.textAlign = "center";
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "700 46px 'Noto Sans SC'";
      fitText(ctx, product.name || "商品名称", W / 2, 620, W - 120, "top");
      const point = product.sellingPoints.find((s) => s.trim()) || "未来已来";
      ctx.font = "500 26px 'JetBrains Mono'";
      ctx.fillStyle = "#3FE0D0";
      fitText(ctx, point, W / 2, 684, W - 120, "top");
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "700 30px 'JetBrains Mono'";
      ctx.fillText(`¥${product.price || "??"}`, W / 2, 724);
    },
  },
];
