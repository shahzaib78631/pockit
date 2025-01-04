import { z } from "zod";
import { categoriesRowSchema, itemPricesRowSchema, itemsRowSchema, itemUnitsRowSchema, unitsInsertSchema, unitsRowSchema } from "./schemas";

export type ItemFormValues = z.infer<typeof itemsRowSchema>;

export type CategoryFormValues = z.infer<typeof categoriesRowSchema>;

export type ItemUnitFormValues = z.infer<typeof itemUnitsRowSchema>;

export type ItemPricesFormValues = z.infer<typeof itemPricesRowSchema>;

export type UnitsFormValues = z.infer<typeof unitsRowSchema>;