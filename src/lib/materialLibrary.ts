import type { SavedMaterial, ProductInput } from "@/types";

const STORAGE_KEY = "ecommerce-materials";

export function getMaterials(): SavedMaterial[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveMaterial(input: ProductInput): SavedMaterial {
  const materials = getMaterials();
  const newMaterial: SavedMaterial = {
    id: Math.random().toString(36).slice(2, 10),
    name: input.name || "未命名商品",
    category: input.category,
    brand: input.brand,
    images: [...input.images],
    material: input.material,
    size: input.size,
    color: input.color,
    targetAudience: input.targetAudience,
    sellingPoints: [...input.sellingPoints],
    createdAt: Date.now(),
  };
  materials.unshift(newMaterial);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(materials.slice(0, 50)));
  return newMaterial;
}

export function deleteMaterial(id: string): void {
  const materials = getMaterials();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(materials.filter((m) => m.id !== id)));
}

export function applyMaterial(input: ProductInput, material: SavedMaterial): ProductInput {
  return {
    ...input,
    name: material.name,
    category: material.category,
    brand: material.brand,
    images: [...material.images],
    material: material.material,
    size: material.size,
    color: material.color,
    targetAudience: material.targetAudience,
    sellingPoints: [...material.sellingPoints],
  };
}
