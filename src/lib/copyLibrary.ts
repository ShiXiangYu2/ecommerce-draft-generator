import type { StyleKey } from "@/types";

export interface CopyPattern {
  titleTemplates: string[];
  sellingPointTemplates: string[];
}

export const COPY_LIBRARY: Record<StyleKey, CopyPattern> = {
  promo: {
    titleTemplates: [
      "{brand}{name}",
      "{name} {color}款",
      "{brand}{name} {targetAudience}适用",
      "{name} {material}材质",
      "{category}{name} {size}可选",
      "{name}限时特惠",
      "{name}爆单来袭",
      "{brand}正品{name}",
    ],
    sellingPointTemplates: [
      "{point}，{material}材质更耐用",
      "{color}百搭，{targetAudience}都能穿",
      "{point}，{size}齐全随心选",
      "{brand}品质保障，{material}舒适亲肤",
      "{point}，{price}元超值入手",
      "{point}，{color}显白显气质",
      "{material}面料，{point}",
      "{targetAudience}专属，{point}",
    ],
  },
  minimal: {
    titleTemplates: [
      "{name}",
      "{brand}{name}",
      "{name} · {material}",
      "{name} {color}",
      "{category}{name}",
    ],
    sellingPointTemplates: [
      "{material}材质，{point}",
      "{color}经典，{point}",
      "{size}合身，{point}",
      "{point}，{material}舒适",
      "{targetAudience}适用，{point}",
    ],
  },
  national: {
    titleTemplates: [
      "{name} · 东方韵味",
      "{brand}{name} · 国风新韵",
      "{name} {color}款",
      "{material}匠心{name}",
    ],
    sellingPointTemplates: [
      "{material}材质，{point}",
      "{point}，{color}雅致",
      "{targetAudience}皆宜，{point}",
      "{point}，{material}考究",
    ],
  },
  tech: {
    titleTemplates: [
      "{brand}{name} · 科技升级",
      "{name} {material}科技版",
      "{category}{name} 智能体验",
      "{name} {size}配置",
    ],
    sellingPointTemplates: [
      "{material}材质，{point}",
      "{point}，性能强劲",
      "{size}设计，{point}",
      "{targetAudience}首选，{point}",
    ],
  },
};
