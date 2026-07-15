export interface ImportedProduct {
  id: string;
  name: string;
  price: string;
  category: string;
  brand: string;
  material: string;
  size: string;
  color: string;
  targetAudience: string;
  sellingPoints: string[];
  selected: boolean;
}

export function parseCSV(text: string): ImportedProduct[] {
  const lines = text.split("\n").filter((l) => l.trim());
  if (lines.length === 0) return [];

  const headers = lines[0]
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .map((h) => h.replace(/['"]/g, ""));

  const products: ImportedProduct[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values = parseCSVLine(line);
    
    const product: Partial<ImportedProduct> = {};
    
    headers.forEach((header, idx) => {
      const value = values[idx]?.trim()?.replace(/['"]/g, "") || "";
      switch (header) {
        case "name":
        case "商品名称":
        case "产品名称":
        case "标题":
          product.name = value;
          break;
        case "price":
        case "价格":
        case "售价":
        case "单价":
          product.price = value;
          break;
        case "category":
        case "类目":
        case "分类":
        case "品类":
          product.category = value;
          break;
        case "brand":
        case "品牌":
          product.brand = value;
          break;
        case "material":
        case "材质":
        case "面料":
          product.material = value;
          break;
        case "size":
        case "尺寸":
        case "规格":
          product.size = value;
          break;
        case "color":
        case "颜色":
        case "色系":
          product.color = value;
          break;
        case "targetaudience":
        case "target_audience":
        case "适用人群":
        case "受众":
        case "人群":
          product.targetAudience = value;
          break;
        case "sellingpoints":
        case "selling_points":
        case "卖点":
        case "核心卖点":
        case "特色":
          product.sellingPoints = value.split(/[,，;；、]/).filter((s) => s.trim());
          break;
      }
    });

    if (product.name) {
      products.push({
        id: Math.random().toString(36).slice(2, 10),
        name: product.name,
        price: product.price || "",
        category: product.category || "其他",
        brand: product.brand || "",
        material: product.material || "",
        size: product.size || "",
        color: product.color || "",
        targetAudience: product.targetAudience || "",
        sellingPoints: product.sellingPoints || [],
        selected: true,
      });
    }
  }

  return products;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);

  return result;
}

export function sampleCSVContent(): string {
  return `商品名称,价格,类目,品牌,材质,尺寸,颜色,适用人群,卖点
纯棉T恤,99,服饰鞋包,优衣库,纯棉,均码,白色,男女通用,舒适透气,百搭经典
无线蓝牙耳机,199,数码家电,苹果,ABS塑料,通用,黑色,青少年,降噪效果好,续航持久
护肤面霜,299,美妆个护,兰蔻,玻尿酸,50ml,粉色,女士,补水保湿,提亮肤色
不锈钢保温杯,59,家居日用,膳魔师,不锈钢,500ml,银色,家庭,保温保冷,便携设计
运动跑鞋,399,运动户外,耐克,网布,42码,蓝色,男士,轻便舒适,防滑耐磨`;
}
