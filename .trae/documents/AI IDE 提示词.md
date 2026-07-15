# 电商主图文案生成工作台 — AI IDE 代码生成提示词

---

## 🔧 任务目标

请帮我生成一个「电商主图文案生成工作台」单页面应用的完整代码。这是一个纯前端工具，用于帮助电商运营快速批量生成商品主图和营销文案草稿。

---

## 🛠️ 技术栈要求

- **框架**：React 18 + TypeScript
- **构建工具**：Vite 6
- **样式**：TailwindCSS 3
- **状态管理**：Zustand（轻量状态管理）
- **图标**：lucide-react
- **字体**：Noto Sans SC（正文）、Noto Serif SC（标题）、JetBrains Mono（数字/价格）
- **纯前端**：无后端，无数据库，所有生成逻辑在前端完成

---

## 📁 项目结构

```
src/
├── components/
│   ├── ui/
│   │   ├── Card.tsx          # 卡片容器组件
│   │   ├── Button.tsx        # 按钮组件
│   │   └── SectionLabel.tsx  # 区块标题组件
│   ├── input/
│   │   ├── ImageUploader.tsx     # 商品图上传（拖拽/点击）
│   │   ├── BasicInfoForm.tsx     # 基础信息表单（名称/价格/类目）
│   │   ├── SellingPointsEditor.tsx # 卖点编辑器（多条增删）
│   │   └── StyleSelector.tsx     # 风格选择器（4种风格）+ 生成数量控制
│   ├── result/
│   │   ├── EmptyState.tsx        # 空状态引导
│   │   ├── SkeletonResult.tsx    # 生成中骨架屏
│   │   ├── MainImageGrid.tsx     # 主图草稿网格（预览/下载/重生成）
│   │   ├── CopyCard.tsx          # 单条文案卡片（编辑/复制/重生成）
│   │   ├── CopyList.tsx          # 文案草稿列表
│   │   └── PreviewModal.tsx      # 主图大图预览弹窗
│   ├── InputPanel.tsx       # 左侧输入面板（组合输入子组件）
│   ├── ResultPanel.tsx      # 右侧结果面板（根据状态切换）
│   └── TopBar.tsx           # 顶部操作栏（Logo/清空/生成按钮）
├── lib/
│   ├── utils.ts             # 通用工具函数（cn、copyText）
│   ├── drawUtils.ts         # Canvas 绘制工具函数
│   ├── copyLibrary.ts       # 文案话术库（按风格组织）
│   ├── copyGenerator.ts     # 文案生成引擎
│   ├── imageGenerator.ts    # 主图 Canvas 合成引擎
│   └── templates/
│       ├── types.ts         # 模板类型定义
│       ├── promo.ts         # 促销爆品风格模板（3个）
│       ├── minimal.ts       # 极简质感风格模板（3个）
│       ├── national.ts      # 国潮东方风格模板（3个）
│       ├── tech.ts          # 科技未来风格模板（3个）
│       └── index.ts         # 模板汇总与查询
├── store/
│   └── useWorkbench.ts      # Zustand 全局状态管理
├── types.ts                 # 核心类型定义
├── pages/
│   └── Home.tsx             # 工作台首页
├── App.tsx                  # 应用入口
├── main.tsx                 # React 挂载
└── index.css                # 全局样式（含 Tailwind 指令）
```

---

## 🎨 设计规范

### 颜色主题
- **主色**：珊瑚橙 `#FF5A3C`（用于主按钮、选中态、强调元素）
- **深色**：深石板 `#1A1D2E`（文字、侧边栏）
- **背景**：浅雾灰 `#F5F6F8`（页面背景）
- **卡片**：纯白 `#FFFFFF`（内容卡片）

### 布局
- **桌面端**：顶部 64px 操作栏 + 左侧 380px 固定输入区 + 右侧自适应结果区
- **移动端**：上下堆叠，输入区在上，结果区在下

### 交互细节
- 按钮 hover 有缩放和阴影变化（`hover:scale-[1.02]`）
- 卡片 hover 阴影加深
- 生成结果带淡入动画
- 骨架屏带闪烁效果

---

## ✅ 核心功能清单

### 输入区功能
1. **商品图上传**
   - 支持点击上传和拖拽上传
   - 可上传多张，首张自动标记为「主图」
   - 显示缩略图，支持删除

2. **基础信息表单**
   - 商品名称输入（最大 30 字符）
   - 价格输入（仅数字和小数点）
   - 类目下拉选择（8个选项）

3. **卖点编辑器**
   - 支持 1-6 条卖点
   - 可增删，每条有编号
   - 占位提示文案

4. **风格选择器**
   - 4 种风格：促销爆品、极简质感、国潮东方、科技未来
   - 卡片式布局，带描述文字
   - 选中态带珊瑚橙边框和背景

5. **生成数量控制**
   - 主图：1-9 张（默认 4）
   - 文案：1-6 条（默认 3）
   - 步进器样式（- / 数字 / +）

### 结果区功能
1. **主图草稿网格**
   - 响应式网格展示（移动端 2 列，桌面端 3 列）
   - hover 显示浮层按钮组（预览、下载、重生成）
   - 每张主图有编号标记

2. **文案草稿列表**
   - 卡片式展示，包含标题、副标题、标签、正文
   - 支持编辑标题和正文
   - 支持一键复制（复制全部内容）
   - 支持单条重生成

3. **预览弹窗**
   - 点击预览按钮打开大图弹窗
   - 显示高清主图，支持下载和关闭

4. **空状态**
   - 居中插画 + 引导文字
   - 说明使用方式

5. **加载态**
   - 生成按钮旋转加载
   - 结果区显示骨架屏

### 生成引擎
1. **主图生成**（Canvas 2D）
   - 画布尺寸：800×800
   - 4 种风格，每种 3 个模板，共 12 个模板
   - 自动组合：商品图 + 模板背景 + 文案叠加
   - 支持 contain 模式绘制商品图

2. **文案生成**（模板组合）
   - 按风格获取话术库
   - 随机选择标题/副标题/标签/正文模板
   - 填充占位符：{name} {point} {price} {category}

---

## 📝 类型定义

```typescript
// 核心类型（src/types.ts）
export type StyleKey = "promo" | "minimal" | "national" | "tech";

export interface ProductInput {
  images: string[];
  name: string;
  price: string;
  category: string;
  sellingPoints: string[];
  style: StyleKey;
  mainImageCount: number;
  copyCount: number;
}

export interface MainImageDraft {
  id: string;
  dataUrl: string;
  templateId: string;
}

export interface CopyDraft {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  text: string;
}

export interface GeneratedDraft {
  mainImages: MainImageDraft[];
  copies: CopyDraft[];
}

// 默认值
export const DEFAULT_PRODUCT_INPUT: ProductInput = {
  images: [],
  name: "",
  price: "",
  category: "服饰鞋包",
  sellingPoints: ["", ""],
  style: "promo",
  mainImageCount: 4,
  copyCount: 3,
};

export const CATEGORIES = ["服饰鞋包", "美妆个护", "食品生鲜", "数码家电", "家居日用", "母婴玩具", "运动户外", "其他"];

export const STYLE_OPTIONS = [
  { key: "promo", label: "促销爆品", desc: "高饱和抢眼，价格放大" },
  { key: "minimal", label: "极简质感", desc: "留白克制，质感优先" },
  { key: "national", label: "国潮东方", desc: "墨色衬线，东方韵味" },
  { key: "tech", label: "科技未来", desc: "霓虹深色，未来感强" },
];
```

---

---

## 🔍 核心生成逻辑示例

### 1. Canvas 模板 draw 函数示例（促销爆品风格）

```typescript
// src/lib/templates/promo.ts — 示例模板
const W = 800;
const H = 800;

export const promoTemplates = [
  {
    id: "promo-burst",
    name: "爆单胶囊",
    style: "promo" as const,
    draw: ({ ctx, product, image }) => {
      // 渐变背景
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#FF5A3C");
      g.addColorStop(0.55, "#ED3D1C");
      g.addColorStop(1, "#C52E12");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // 价格胶囊
      const price = product.price || "??";
      ctx.textAlign = "center";
      ctx.fillStyle = "#FFF1ED";
      ctx.beginPath();
      ctx.roundRect(W / 2 - 120, 56, 240, 60, 30);
      ctx.fill();
      ctx.fillStyle = "#C52E12";
      ctx.font = "700 34px 'JetBrains Mono'";
      ctx.fillText(`到手 ¥${price}`, W / 2, 94);

      // 白底商品图卡片
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.roundRect(80, 170, 640, 440, 24);
      ctx.fill();

      // 绘制商品图（contain模式）
      if (image) {
        const iw = image.width, ih = image.height;
        const scale = Math.min(580 / iw, 380 / ih);
        const dw = iw * scale, dh = ih * scale;
        const dx = 110 + (580 - dw) / 2;
        const dy = 200 + (380 - dh) / 2;
        ctx.drawImage(image, dx, dy, dw, dh);
      }

      // 商品名
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "700 44px 'Noto Sans SC'";
      ctx.fillText(product.name || "商品名称", W / 2, 650);
    },
  },
];
```

### 2. 文案话术库示例

```typescript
// src/lib/copyLibrary.ts — 促销风格话术库
export const COPY_LIBRARY = {
  promo: {
    titleTemplates: [
      "{name} 爆单来袭 手慢无",
      "限时秒杀 {name} 抢到赚到",
      "全网热销 {name} 今日特惠",
    ],
    subtitleTemplates: [
      "{point}，到手价仅需 ¥{price}",
      "热卖万件 · {point}",
    ],
    tagPool: ["限时秒杀", "顺丰包邮", "七天无理由", "买一送一"],
    bodyTemplates: [
      "还在犹豫？{name} 已被 {point} 圈粉无数。今天下单立享专属优惠，库存有限，抢完即止。",
    ],
  },
};
```

### 3. 文案生成引擎核心逻辑

```typescript
// src/lib/copyGenerator.ts
function fill(tpl: string, input, point) {
  return tpl
    .replace(/\{name\}/g, input.name || "好物")
    .replace(/\{point\}/g, point || "品质出众")
    .replace(/\{price\}/g, input.price || "??")
    .replace(/\{category\}/g, input.category);
}

export function generateCopy(input) {
  const lib = COPY_LIBRARY[input.style];
  const point = input.sellingPoints.find(p => p.trim()) || "品质出众";
  return {
    id: Math.random().toString(36).slice(2, 10),
    title: fill(pick(lib.titleTemplates), input, point),
    subtitle: fill(pick(lib.subtitleTemplates), input, point),
    tags: pickN(lib.tagPool, 3),
    text: fill(pick(lib.bodyTemplates), input, point),
  };
}
```

### 4. 主图生成引擎核心逻辑

```typescript
// src/lib/imageGenerator.ts
export async function generateMainImage(input, index) {
  const template = pickTemplate(input.style, index);
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 800;
  const ctx = canvas.getContext("2d");
  
  let image = null;
  if (input.images[0]) {
    image = await loadImage(input.images[0]);
  }
  
  template.draw({ ctx, width: 800, height: 800, product: input, image });
  
  return {
    id: Math.random().toString(36).slice(2, 10),
    dataUrl: canvas.toDataURL("image/png"),
    templateId: template.id,
  };
}
```

---

## 🚀 生成代码

请按上述要求生成完整的单页面应用代码。确保：

1. **代码完整**：所有文件都包含实现代码，不是空壳
2. **类型安全**：使用 TypeScript，所有变量和函数都有类型定义
3. **可运行**：执行 `npm install && npm run dev` 后能正常运行
4. **交互完整**：所有按钮和交互都有实现，不是占位符
5. **样式美观**：遵循设计规范，有良好的视觉效果
6. **错误处理**：有基础的输入校验和错误提示

生成代码后，请告知如何启动项目进行预览。
