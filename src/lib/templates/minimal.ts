// 极简质感风格模板 — 留白、克制、质感

import { drawImageContain, fitText, roundRect, wrapText } from "../drawUtils";
import type { MainImageTemplate } from "./types";

const W = 800;
const H = 800;

export const minimalTemplates: MainImageTemplate[] = [
  {
    id: "minimal-center",
    name: "居中留白",
    style: "minimal",
    draw: ({ ctx, product, image }) => {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, W, H);

      // 商品图居中大圆角
      if (image) {
        drawImageContain(ctx, image, 120, 90, W - 240, 520, { radius: 24 });
      } else {
        ctx.fillStyle = "#F5F6F8";
        roundRect(ctx, 120, 90, W - 240, 520, 24);
        ctx.fill();
      }

      // 底部细字商品名 + 卖点
      ctx.textAlign = "center";
      ctx.fillStyle = "#1A1D2E";
      ctx.font = "600 40px 'Noto Serif SC'";
      fitText(ctx, product.name || "商品名称", W / 2, 640, W - 160, "top");
      const point = product.sellingPoints.find((s) => s.trim()) || "简而不凡";
      ctx.font = "400 24px 'Noto Sans SC'";
      ctx.fillStyle = "#6B7388";
      fitText(ctx, point, W / 2, 700, W - 160, "top");

      // 极细分割线
      ctx.strokeStyle = "#E9EBEF";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(W / 2 - 40, 624);
      ctx.lineTo(W / 2 + 40, 624);
      ctx.stroke();
    },
  },
  {
    id: "minimal-split",
    name: "左右分栏",
    style: "minimal",
    draw: ({ ctx, product, image }) => {
      ctx.fillStyle = "#F7F5F0";
      ctx.fillRect(0, 0, W, H);
      // 左半商品图白卡
      ctx.fillStyle = "#FFFFFF";
      roundRect(ctx, 56, 56, 380, H - 112, 20);
      ctx.fill();
      if (image) {
        drawImageContain(ctx, image, 76, 76, 340, H - 152, { radius: 12 });
      }

      // 右半文字
      ctx.textAlign = "left";
      ctx.fillStyle = "#A8B0BE";
      ctx.font = "500 22px 'Noto Sans SC'";
      ctx.fillText("MINIMAL · 极简", 472, 150);

      ctx.fillStyle = "#1A1D2E";
      ctx.font = "700 52px 'Noto Serif SC'";
      wrapText(ctx, product.name || "商品名称", 472, 200, 280, 64, 3);

      const point = product.sellingPoints.find((s) => s.trim()) || "质感生活";
      ctx.font = "400 26px 'Noto Sans SC'";
      ctx.fillStyle = "#3D4360";
      wrapText(ctx, point, 472, 420, 280, 38, 3);

      // 价格
      ctx.fillStyle = "#1A1D2E";
      ctx.font = "500 22px 'Noto Sans SC'";
      ctx.fillText("¥", 472, 660);
      ctx.font = "700 56px 'JetBrains Mono'";
      ctx.fillText(product.price || "??", 500, 652);
    },
  },
  {
    id: "minimal-float",
    name: "悬浮卡片",
    style: "minimal",
    draw: ({ ctx, product, image }) => {
      ctx.fillStyle = "#EEF0F3";
      ctx.fillRect(0, 0, W, H);

      // 悬浮商品图带阴影
      ctx.save();
      ctx.shadowColor = "rgba(26,29,46,0.12)";
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 16;
      ctx.fillStyle = "#FFFFFF";
      roundRect(ctx, 110, 100, W - 220, 500, 24);
      ctx.fill();
      ctx.restore();
      if (image) {
        drawImageContain(ctx, image, 126, 116, W - 252, 468, { radius: 14 });
      }

      // 底部信息
      ctx.textAlign = "center";
      ctx.fillStyle = "#1A1D2E";
      ctx.font = "600 42px 'Noto Serif SC'";
      fitText(ctx, product.name || "商品名称", W / 2, 636, W - 160, "top");
      const point = product.sellingPoints.find((s) => s.trim()) || "日常悦己";
      ctx.font = "400 24px 'Noto Sans SC'";
      ctx.fillStyle = "#6B7388";
      fitText(ctx, point, W / 2, 696, W - 160, "top");
    },
  },
];
