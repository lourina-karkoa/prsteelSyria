import type { ConsultationValues } from "../types/form";

export type FieldType = "input" | "select";

export interface FieldConfig {
  name: keyof ConsultationValues; // 🔥 هون الحل
  labelKey: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
}

export const consultationFields: FieldConfig[] = [
  { name: "age", labelKey: "form.age", type: "input", placeholder: "35" },
  { name: "weight", labelKey: "form.weight", type: "input", placeholder: "72 kg" },
  { name: "limbType", labelKey: "form.limbType", type: "select", options: ["leg", "arm"] },
  { name: "city", labelKey: "form.city", type: "input" },
  { name: "phone", labelKey: "form.phone", type: "input" },
  { name: "center", labelKey: "form.center", type: "select", options: ["coast", "aleppo"] },
];