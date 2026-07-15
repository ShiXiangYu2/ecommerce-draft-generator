export type StyleKey = "promo" | "minimal" | "national" | "tech";

export interface StyleOption {
  key: StyleKey;
  label: string;
  desc: string;
}

export const STYLE_OPTIONS: StyleOption[] = [
  { key: "promo", label: "促销爆品", desc: "高饱和抢眼，价格放大" },
  { key: "minimal", label: "极简质感", desc: "留白克制，质感优先" },
  { key: "national", label: "国潮东方", desc: "墨色衬线，东方韵味" },
  { key: "tech", label: "科技未来", desc: "霓虹深色，未来感强" },
];

export interface ProductInput {
  images: string[];
  name: string;
  price: string;
  category: string;
  brand: string;
  material: string;
  size: string;
  color: string;
  targetAudience: string;
  sellingPoints: string[];
  references: ReferenceItem[];
  style: StyleKey;
  saveToLibrary: boolean;
  mainImageCount: number;
  copyCount: number;
}

export interface ReferenceItem {
  id: string;
  type: "image" | "link";
  value: string;
  name?: string;
}

export interface SavedMaterial {
  id: string;
  name: string;
  category: string;
  brand: string;
  images: string[];
  material: string;
  size: string;
  color: string;
  targetAudience: string;
  sellingPoints: string[];
  createdAt: number;
}

export interface MainImageDraft {
  id: string;
  dataUrl: string;
  templateId: string;
}

export interface CopyDraft {
  id: string;
  title: string;
  sellingPoints: string[];
}

export interface GeneratedDraft {
  mainImages: MainImageDraft[];
  copies: CopyDraft[];
}

export const DEFAULT_PRODUCT_INPUT: ProductInput = {
  images: [],
  name: "",
  price: "",
  category: "服饰鞋包",
  brand: "",
  material: "",
  size: "",
  color: "",
  targetAudience: "",
  sellingPoints: ["", ""],
  references: [],
  style: "promo",
  saveToLibrary: false,
  mainImageCount: 3,
  copyCount: 3,
};

export const CATEGORIES = [
  "服饰鞋包",
  "美妆个护",
  "食品生鲜",
  "数码家电",
  "家居日用",
  "母婴玩具",
  "运动户外",
  "其他",
];

export const TARGET_AUDIENCES = [
  "男女通用",
  "女士",
  "男士",
  "儿童",
  "青少年",
  "中老年",
  "情侣",
  "家庭",
];

export const COLORS = [
  "黑色",
  "白色",
  "灰色",
  "蓝色",
  "红色",
  "绿色",
  "黄色",
  "粉色",
  "紫色",
  "橙色",
  "棕色",
  "多色可选",
];
