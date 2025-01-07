import { z } from "zod";
import { categoryFormSchema, itemFormSchema, unitFormSchema } from "@/schema/form/schema";

export type ItemFormValues = z.infer<typeof itemFormSchema>;

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export type UnitsFormValues = z.infer<typeof unitFormSchema>;