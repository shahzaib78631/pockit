import { z } from "zod";
import { categorySchema, itemFormSchema, unitSchema } from "@/schema/form/schema";

export type ItemFormValues = z.infer<typeof itemFormSchema>;

export type CategoryFormValues = z.infer<typeof categorySchema>;

export type UnitsFormValues = z.infer<typeof unitSchema>;