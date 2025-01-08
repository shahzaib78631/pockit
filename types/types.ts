import { Tables } from "@/database/database.types";
import { itemUnitPriceSchema, itemUnitSchema } from "@/schema/form/schema";
import { z } from "zod";
// Utility type to make specific fields optional
type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Units = Tables<"units">[]
export type Unit = Tables<"units">

export type Categories = Tables<"categories">[]
export type Category = Tables<"categories">

export type Peoples = Tables<"people">[]
export type People = Tables<"people">

export type Inventories = Tables<"inventory">[]
export type Inventory = Tables<"inventory">

export type Locations = Tables<"locations">[]
export type Location = Tables<"locations">

export type ItemUnitPrices = z.infer<typeof itemUnitPriceSchema>[];
export type ItemUnitPrice = z.infer<typeof itemUnitPriceSchema>

export type ItemUnits = z.infer<typeof itemUnitSchema>[];
export type ItemUnit = z.infer<typeof itemUnitSchema>

export type Items = (Tables<"items"> & { inventory?: Inventories })[];
export type Item = Tables<"items"> & { inventory?: Inventories , units?: ItemUnit[], prices?: ItemUnitPrice[]  };

