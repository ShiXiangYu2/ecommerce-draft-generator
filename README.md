# 电商草稿生成器

帮助电商运营批量生成商品主图和文案草稿的工具。

## 功能特性

- **商品信息输入**：名称、类目、品牌、材质、尺寸、颜色、适用人群等完整字段
- **图片上传**：支持白底图/场景图上传
- **参考物上传**：支持上传历史爆款截图或添加参考链接
- **主图生成**：Canvas 2D 合成，支持 4 种视觉风格（促销爆品、极简质感、国潮东方、科技未来）
- **文案生成**：标题 + 1-2 句卖点文案，基于模板组合生成
- **批量生成**：支持同时生成多张主图和多条文案供筛选
- **CSV 批量导入**：上传商品列表，支持批量生成
- **素材库管理**：保存、查看、搜索、应用已保存的素材

## 技术栈

- React 18 + TypeScript
- Vite 6
- TailwindCSS 3
- Zustand（状态管理）
- Lucide React（图标）

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 类型检查
npm run check
```

## GitHub Pages 部署

### 方法一：使用 GitHub Actions（推荐）

1. 确保 `vite.config.ts` 中配置了正确的 `base` 路径：
   ```typescript
   base: '/ecommerce-draft-generator/'
   ```

2. `.github/workflows/deploy.yml` 已配置自动部署，每次推送到 `master` 分支会自动构建并部署到 GitHub Pages。

3. 在 GitHub 仓库设置中：
   - 进入 **Settings > Pages**
   - 设置 **Source** 为 **GitHub Actions**

### 方法二：手动部署

```bash
# 构建
npm run build

# 安装 gh-pages
npm install -g gh-pages

# 部署
gh-pages -d dist
```

## 使用说明

1. **填写商品信息**：在左侧面板填写商品名称、价格、类目、品牌等信息
2. **上传图片**：上传商品白底图或场景图
3. **添加参考物**（可选）：上传爆款截图或添加参考链接
4. **选择风格**：选择适合的视觉风格
5. **设置生成数量**：设置要生成的主图和文案数量
6. **点击生成**：系统自动生成主图和文案草稿
7. **筛选微调**：从多个候选中挑选合适的，进行编辑和下载

## 项目结构

```
src/
├── components/          # 组件
│   ├── input/           # 输入组件
│   ├── result/          # 结果组件
│   ├── ui/              # UI 基础组件
│   ├── ImportPanel.tsx  # 批量导入面板
│   ├── MaterialPanel.tsx # 素材库面板
│   └── ...
├── lib/                 # 工具函数
│   ├── imageGenerator.ts # 主图生成引擎
│   ├── copyGenerator.ts  # 文案生成引擎
│   ├── copyLibrary.ts    # 文案话术库
│   ├── csvParser.ts      # CSV 解析器
│   └── ...
├── store/               # 状态管理
├── types/               # 类型定义
└── pages/               # 页面
```

## License

MIT
