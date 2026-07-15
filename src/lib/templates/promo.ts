// 促销爆品风格模板 — 高饱和、价格放大、抢眼

import { drawImageContain, drawPill, fitText, gradientBg, roundRect, wrapText } from "../drawUtils";
import type { MainImageTemplate } from "./types";

const W = 800;
const H = 800;

export const promoTemplates: MainImageTemplate[] = [
  {
    id: "promo-burst",
    name: "爆单胶囊",
    style: "promo",
    draw: ({ ctx, product, image }) => {
      gradientBg(ctx, W, H, [
        [0, "#FF5A3C"],
        [0.55, "#ED3D1C"],
        [1, "#C52E12"],
      ]);
      // 顶部价格胶囊
      const price = product.price || "??";
      ctx.textAlign = "center";
      drawPill(ctx, `到手 ¥${price}`, W / 2, 56, {
        bg: "#FFF1ED",
        color: "#C52E12",
        font: "700 34px 'JetBrains Mono', monospace",
        padX: 32,
        padY: 12,
      });

      // 中间商品图白底卡片
      const cardX = 80, cardY = 170, cardW = W - 160, cardH = 440;
      ctx.save();
      ctx.fillStyle = "#FFFFFF";
      roundRect(ctx, cardX, cardY, cardW, cardH, 24);
      ctx.fill();
      ctx.restore();

      if (image) {
        drawImageContain(ctx, image, cardX + 30, cardY + 30, cardW - 60, cardH - 60, { radius: 16 });
      } else {
        ctx.fillStyle = "#F5F6F8";
        roundRect(ctx, cardX + 30, cardY + 30, cardW - 60, cardH - 60, 16);
        ctx.fill();
        ctx.fillStyle = "#A8B0BE";
        ctx.font = "500 28px 'Noto Sans SC'";
        ctx.fillText("商品图", cardX + cardW / 2, cardY + cardH / 2);
      }

      // 底部商品名 + 卖点
      ctx.textAlign = "center";
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "700 44px 'Noto Sans SC'";
      fitText(ctx, product.name || "商品名称", W / 2, 650, W - 120, "top");
      const point = product.sellingPoints.find((s) => s.trim()) || "热销爆款 限时特惠";
      ctx.font = "500 26px 'Noto Sans SC'";
      ctx.fillStyle = "rgba(255,241,237,0.92)";
      fitText(ctx, point, W / 2, 712, W - 120, "top");
    },
  },
  {
    id: "promo-banner",
    name: "秒杀横幅",
    style: "promo",
    draw: ({ ctx, product, image }) => {
      gradientBg(ctx, W, H, [
        [0, "#FFE066"],
        [1, "#FFB020"],
      ]);
      // 左侧大字
      ctx.fillStyle = "#1A1D2E";
      ctx.textAlign = "left";
      ctx.font = "900 96px 'Noto Serif SC'";
      ctx.fillText("限时", 64, 140);
      ctx.fillStyle = "#C52E12";
      ctx.fillText("秒杀", 64, 250);

      // 价格红字
      ctx.fillStyle = "#C52E12";
      ctx.font = "700 40px 'Noto Sans SC'";
      ctx.fillText("仅需", 64, 320);
      ctx.font = "900 120px 'JetBrains Mono'";
      ctx.fillText(`¥${product.price || "??"} `, 64, 360);

      // 右侧商品图圆角卡
      const ix = 440, iy = 120, iw = 300, ih = 560;
      ctx.fillStyle = "#FFFFFF";
      roundRect(ctx, ix, iy, iw, ih, 24);
      ctx.fill();
      if (image) {
        drawImageContain(ctx, image, ix + 16, iy + 16, iw - 32, ih - 32, { radius: 16 });
      }

      // 底部商品名
      ctx.fillStyle = "#1A1D2E";
      ctx.font = "700 40px 'Noto Sans SC'";
      fitText(ctx, product.name || "商品名称", 64, 540, 350, "top");
      const point = product.sellingPoints.find((s) => s.trim()) || "热销万件";
      ctx.font = "500 26px 'Noto Sans SC'";
      ctx.fillStyle = "#3D4360";
      wrapText(ctx, point, 64, 600, 350, 36, 2);
    },
  },
  {
    id: "promo-card",
    name: "热销卡片",
    style: "promo",
    draw: ({ ctx, product, image }) => {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, W, H);
      // 顶部珊瑚橙色块条
      ctx.fillStyle = "#FF5A3C";
      ctx.fillRect(0, 0, W, 24);
      drawPill(ctx, "热销爆款", 64, 60, {
        bg: "#FFF1ED",
        color: "#C52E12",
        font: "700 24px 'Noto Sans SC'",
      });

      // 商品图
      if (image) {
        drawImageContain(ctx, image, 80, 140, W - 160, 460, { radius: 20, bg: "#F5F6F8" });
      } else {
        ctx.fillStyle = "#F5F6F8";
        roundRect(ctx, 80, 140, W - 160, 460, 20);
        ctx.fill();
      }

      // 价格爆炸贴（圆形）
      const price = product.price || "??";
      ctx.save();
      ctx.translate(W - 150, 200);
      ctx.fillStyle = "#FF5A3C";
      ctx.beginPath();
      ctx.arc(0, 0, 88, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.font = "500 22px 'Noto Sans SC'";
      ctx.fillText("到手", 0, -22);
      ctx.font = "900 48px 'JetBrains Mono'";
      ctx.fillText(`¥${price}`, 0, 18);
      ctx.restore();

      // 底部商品名 + 卖点
      ctx.textAlign = "left";
      ctx.fillStyle = "#1A1D2E";
      ctx.font = "700 44px 'Noto Sans SC'";
      fitText(ctx, product.name || "商品名称", 64, 640, W - 128, "top");
      const point = product.sellingPoints.find((s) => s.trim()) || "品质之选";
      ctx.font = "500 26px 'Noto Sans SC'";
      ctx.fillStyle = "#6B7388";
      fitText(ctx, point, 64, 704, W - 128, "top");
    },
  },
];
