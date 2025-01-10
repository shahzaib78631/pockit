import { categorySchema, itemSchema, itemUnitPriceSchema, itemUnitSchema, unitSchema } from "@/schema/form/schema";
import { z } from "zod";

export type ItemUnitPrices = z.infer<typeof itemUnitPriceSchema>[];
export type ItemUnitPrice = z.infer<typeof itemUnitPriceSchema>

export type ItemUnits = z.infer<typeof itemUnitSchema>[];
export type ItemUnit = z.infer<typeof itemUnitSchema>


export type Units = z.infer<typeof unitSchema>[];
export type Unit = z.infer<typeof unitSchema>

export type Categories = z.infer<typeof categorySchema>[];
export type Category = z.infer<typeof categorySchema>

export type Items = z.infer<typeof itemSchema>[];
export type Item = z.infer<typeof itemSchema>

