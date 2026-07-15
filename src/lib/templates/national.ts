// 国潮东方风格模板 — 墨色衬线、东方韵味、金边印章

import { drawImageContain, drawPill, fitText, roundRect, wrapText } from "../drawUtils";
import type { MainImageTemplate } from "./types";

const W = 800;
const H = 800;

export const nationalTemplates: MainImageTemplate[] = [
  {
    id: "national-ink",
    name: "墨韵金边",
    style: "national",
    draw: ({ ctx, product, image }) => {
      ctx.fillStyle = "#2A1B1B";
      ctx.fillRect(0, 0, W, H);
      // 金色细边框
      ctx.strokeStyle = "#C9A86A";
      ctx.lineWidth = 2;
      roundRect(ctx, 36, 36, W - 72, H - 72, 8);
      ctx.stroke();

      // 顶部标题
      ctx.textAlign = "center";
      ctx.fillStyle = "#C9A86A";
      ctx.font = "500 26px 'Noto Serif SC'";
      ctx.fillText("东 方 有 礼", W / 2, 110);

      // 商品图圆角卡（米色底）
      ctx.fillStyle = "#F5EBD6";
      roundRect(ctx, 120, 160, W - 240, 440, 16);
      ctx.fill();
      if (image) {
        drawImageContain(ctx, image, 136, 176, W - 272, 408, { radius: 10 });
      }

      // 底部商品名（金色衬线）+ 卖点
      ctx.fillStyle = "#F5EBD6";
      ctx.font = "700 46px 'Noto Serif SC'";
      fitText(ctx, product.name || "商品名称", W / 2, 636, W - 160, "top");
      const point = product.sellingPoints.find((s) => s.trim()) || "古法今承";
      ctx.font = "400 24px 'Noto Serif SC'";
      ctx.fillStyle = "#C9A86A";
      fitText(ctx, point, W / 2, 700, W - 160, "top");
    },
  },
  {
    id: "national-paper",
    name: "宣纸印章",
    style: "national",
    draw: ({ ctx, product, image }) => {
      ctx.fillStyle = "#F5EBD6";
      ctx.fillRect(0, 0, W, H);
      // 红色印章角标
      ctx.save();
      ctx.translate(W - 130, 80);
      ctx.fillStyle = "#B23A2C";
      roundRect(ctx, -36, -36, 72, 72, 6);
      ctx.fill();
      ctx.fillStyle = "#F5EBD6";
      ctx.textAlign = "center";
      ctx.font = "700 22px 'Noto Serif SC'";
      ctx.fillText("国", 0, -8);
      ctx.fillText("潮", 0, 18);
      ctx.restore();

      // 左侧竖排标题
      ctx.fillStyle = "#2A1B1B";
      ctx.textAlign = "center";
      ctx.font = "700 56px 'Noto Serif SC'";
      const name = product.name || "商品名称";
      const chars = Array.from(name).slice(0, 6);
      chars.forEach((ch, i) => ctx.fillText(ch, 110, 200 + i * 72));

      // 右侧商品图
      if (image) {
        drawImageContain(ctx, image, 240, 140, 480, 480, { radius: 12, bg: "#FFFFFF" });
      } else {
        ctx.fillStyle = "#FFFFFF";
        roundRect(ctx, 240, 140, 480, 480, 12);
        ctx.fill();
      }

      // 底部卖点
      const point = product.sellingPoints.find((s) => s.trim()) || "一物一境";
      ctx.fillStyle = "#B23A2C";
      ctx.font = "500 28px 'Noto Serif SC'";
      ctx.fillText(`— ${point} —`, W / 2, 680);
    },
  },
  {
    id: "national-gold",
    name: "墨金分割",
    style: "national",
    draw: ({ ctx, product, image }) => {
      ctx.fillStyle = "#13151F";
      ctx.fillRect(0, 0, W, H);
      // 上半商品图
      if (image) {
        drawImageContain(ctx, image, 0, 0, W, 480, {});
      } else {
        ctx.fillStyle = "#2A2F48";
        ctx.fillRect(0, 0, W, 480);
      }
      // 金色分割线
      ctx.strokeStyle = "#C9A86A";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 480);
      ctx.lineTo(W, 480);
      ctx.stroke();

      // 下半文字
      ctx.textAlign = "center";
      ctx.fillStyle = "#C9A86A";
      ctx.font = "500 22px 'Noto Serif SC'";
      ctx.fillText("承 古 融 今", W / 2, 540);

      ctx.fillStyle = "#F5EBD6";
      ctx.font = "700 48px 'Noto Serif SC'";
      fitText(ctx, product.name || "商品名称", W / 2, 580, W - 120, "top");

      const point = product.sellingPoints.find((s) => s.trim()) || "匠意东方";
      ctx.font = "400 26px 'Noto Serif SC'";
      ctx.fillStyle = "#A89A6E";
      fitText(ctx, point, W / 2, 660, W - 120, "top");

      // 价格
      ctx.fillStyle = "#C9A86A";
      ctx.font = "700 32px 'JetBrains Mono'";
      ctx.fillText(`¥${product.price || "??"}`, W / 2, 710);
    },
  },
];
