import { ImageUploader } from "@/components/input/ImageUploader";
import { BasicInfoForm } from "@/components/input/BasicInfoForm";
import { SellingPointsEditor } from "@/components/input/SellingPointsEditor";
import { ReferenceUploader } from "@/components/input/ReferenceUploader";
import { StyleSelector, CountControls } from "@/components/input/StyleSelector";

export function InputPanel() {
  return (
    <div className="flex flex-col gap-4">
      <ImageUploader />
      <BasicInfoForm />
      <SellingPointsEditor />
      <ReferenceUploader />
      <StyleSelector />
      <CountControls />
    </div>
  );
}
