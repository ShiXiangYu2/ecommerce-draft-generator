import { create } from "zustand";
import { DEFAULT_PRODUCT_INPUT } from "@/types";
import type { GeneratedDraft, ProductInput, SavedMaterial, MainImageDraft, CopyDraft } from "@/types";
import type { ImportedProduct } from "@/lib/csvParser";
import { generateMainImage, generateMainImages } from "@/lib/imageGenerator";
import { generateCopy, generateCopies } from "@/lib/copyGenerator";
import { getMaterials, saveMaterial, deleteMaterial, applyMaterial } from "@/lib/materialLibrary";

interface WorkbenchState {
  input: ProductInput;
  result: GeneratedDraft | null;
  isGenerating: boolean;
  previewImage: string | null;
  error: string | null;
  materials: SavedMaterial[];
  showMaterialPanel: boolean;
  importedProducts: ImportedProduct[];
  showImportPanel: boolean;

  updateInput: (patch: Partial<ProductInput>) => void;
  addImage: (dataUrl: string) => void;
  removeImage: (index: number) => void;
  addSellingPoint: () => void;
  removeSellingPoint: (index: number) => void;
  updateSellingPoint: (index: number, value: string) => void;
  addReference: (item: ProductInput["references"][0]) => void;
  removeReference: (id: string) => void;
  clearAll: () => void;

  generate: () => Promise<void>;
  regenerateMainImage: (index: number) => Promise<void>;
  regenerateCopy: (index: number) => void;

  loadMaterials: () => void;
  deleteMaterial: (id: string) => void;
  applyMaterial: (material: SavedMaterial) => void;
  toggleMaterialPanel: () => void;

  setPreviewImage: (dataUrl: string | null) => void;
  clearError: () => void;

  importProducts: (products: ImportedProduct[]) => void;
  toggleProductSelection: (id: string) => void;
  selectAllProducts: () => void;
  deselectAllProducts: () => void;
  applyProduct: (product: ImportedProduct) => void;
  toggleImportPanel: () => void;
}

function freshInput(): ProductInput {
  return { ...DEFAULT_PRODUCT_INPUT, sellingPoints: ["", ""], references: [] };
}

export const useWorkbench = create<WorkbenchState>((set, get) => ({
  input: freshInput(),
  result: null,
  isGenerating: false,
  previewImage: null,
  error: null,
  materials: [],
  showMaterialPanel: false,
  importedProducts: [],
  showImportPanel: false,

  updateInput: (patch) => set((s) => ({ input: { ...s.input, ...patch } })),

  addImage: (dataUrl) =>
    set((s) => ({ input: { ...s.input, images: [...s.input.images, dataUrl] } })),

  removeImage: (index) =>
    set((s) => ({ input: { ...s.input, images: s.input.images.filter((_, i) => i !== index) } })),

  addSellingPoint: () =>
    set((s) => ({ input: { ...s.input, sellingPoints: [...s.input.sellingPoints, ""] } })),

  removeSellingPoint: (index) =>
    set((s) => ({
      input: {
        ...s.input,
        sellingPoints: s.input.sellingPoints.filter((_, i) => i !== index),
      },
    })),

  updateSellingPoint: (index, value) =>
    set((s) => ({
      input: {
        ...s.input,
        sellingPoints: s.input.sellingPoints.map((p, i) => (i === index ? value : p)),
      },
    })),

  addReference: (item) =>
    set((s) => ({ input: { ...s.input, references: [...s.input.references, item] } })),

  removeReference: (id) =>
    set((s) => ({ input: { ...s.input, references: s.input.references.filter((r) => r.id !== id) } })),

  clearAll: () =>
    set({ input: freshInput(), result: null, error: null, previewImage: null }),

  generate: async () => {
    const { input } = get();
    if (!input.name.trim() && input.images.length === 0) {
      set({ error: "请至少填写商品名称，或上传一张商品图" });
      return;
    }
    set({ isGenerating: true, error: null });
    try {
      const mainImages = await generateMainImages(input);
      const copies = generateCopies(input);

      if (input.saveToLibrary) {
        saveMaterial(input);
        get().loadMaterials();
      }

      set({ result: { mainImages, copies }, isGenerating: false });
    } catch {
      set({ isGenerating: false, error: "生成失败，请稍后重试" });
    }
  },

  regenerateMainImage: async (index: number) => {
    const { input, result } = get();
    if (!result) return;
    try {
      const idx = Math.floor(Math.random() * 6);
      const draft = await generateMainImage(input, idx);
      const newImages = [...result.mainImages];
      newImages[index] = draft;
      set({ result: { ...result, mainImages: newImages } });
    } catch {
      /* 单张重生成失败静默忽略 */
    }
  },

  regenerateCopy: (index: number) => {
    const { input, result } = get();
    if (!result) return;
    const draft = generateCopy(input);
    const newCopies = [...result.copies];
    newCopies[index] = draft;
    set({ result: { ...result, copies: newCopies } });
  },

  loadMaterials: () => set({ materials: getMaterials() }),

  deleteMaterial: (id) => {
    deleteMaterial(id);
    get().loadMaterials();
  },

  applyMaterial: (material) => {
    set((s) => ({ input: applyMaterial(s.input, material), showMaterialPanel: false }));
  },

  toggleMaterialPanel: () => {
    set((s) => ({ showMaterialPanel: !s.showMaterialPanel }));
    if (!get().showMaterialPanel) {
      get().loadMaterials();
    }
  },

  setPreviewImage: (dataUrl) => set({ previewImage: dataUrl }),
  clearError: () => set({ error: null }),

  importProducts: (products) => set({ importedProducts: products, showImportPanel: true }),
  toggleProductSelection: (id) =>
    set((s) => ({
      importedProducts: s.importedProducts.map((p) =>
        p.id === id ? { ...p, selected: !p.selected } : p,
      ),
    })),
  selectAllProducts: () =>
    set((s) => ({ importedProducts: s.importedProducts.map((p) => ({ ...p, selected: true })) })),
  deselectAllProducts: () =>
    set((s) => ({ importedProducts: s.importedProducts.map((p) => ({ ...p, selected: false })) })),
  applyProduct: (product) => {
    set((s) => ({
      input: {
        ...s.input,
        name: product.name,
        price: product.price,
        category: product.category,
        brand: product.brand,
        material: product.material,
        size: product.size,
        color: product.color,
        targetAudience: product.targetAudience,
        sellingPoints: [...product.sellingPoints, ""],
      },
      showImportPanel: false,
    }));
  },
  toggleImportPanel: () => set((s) => ({ showImportPanel: !s.showImportPanel })),
}));
