// 主图模板汇总 — 按风格分组，提供查询

import type { StyleKey } from "@/types";
import type { MainImageTemplate } from "./types";
import { promoTemplates } from "./promo";
import { minimalTemplates } from "./minimal";
import { nationalTemplates } from "./national";
import { techTemplates } from "./tech";

export type { MainImageTemplate, DrawContext } from "./types";

export const ALL_TEMPLATES: MainImageTemplate[] = [
  ...promoTemplates,
  ...minimalTemplates,
  ...nationalTemplates,
  ...techTemplates,
];

const BY_STYLE: Record<StyleKey, MainImageTemplate[]> = {
  promo: promoTemplates,
  minimal: minimalTemplates,
  national: nationalTemplates,
  tech: techTemplates,
};

/** 获取某风格的全部模板 */
export function getTemplatesByStyle(style: StyleKey): MainImageTemplate[] {
  return BY_STYLE[style] ?? promoTemplates;
}

/** 按索引循环取模板（用于批量生成时分配模板） */
export function pickTemplate(style: StyleKey, index: number): MainImageTemplate {
  const list = getTemplatesByStyle(style);
  return list[index % list.length];
}
