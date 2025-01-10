import { z } from "zod";

export const categorySchema = z.object({
  created_at: z.string(),
  deleted: z.boolean(),
  description: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  updated_at: z.string(),
});

export const unitSchema = z.object({
  base_unit: z.boolean().nullable(),
  category: z.string().nullable(),
  created_at: z.string(),
  deleted: z.boolean(),
  id: z.string(),
  name: z.string(),
  symbol: z.string().nullable(),
  updated_at: z.string(),
});


export const itemUnitSchema = z.object({
  id: z.string(),
  item_id: z.string(),
  unit_id: z
    .string()
    .trim()
    .refine((value) => value.trim().length > 0, "Please select unit"),
  is_base_unit: z.boolean().default(false),
  conversion_factor: z.coerce
    .number()
    .refine((value) => value > 0, "Conversion factor must be atleast 1"),
  created_at: z.string().default(new Date().toISOString().toString()),
  updated_at: z.string().default(new Date().toISOString().toString()),
  deleted: z.boolean().default(false),
});

export const itemUnitPriceSchema = z.object({
  id: z.string(),
  item_id: z.string(),
  unit_id: z.string(),
  buying_price: z.coerce.number().gt(0),
  selling_price: z.coerce.number().gt(0),
  created_at: z.string().default(new Date().toISOString().toString()),
  updated_at: z.string().default(new Date().toISOString().toString()),
  deleted: z.boolean().default(false),
});

export const saleType = z.enum(["whole", "unit"]);

export const itemSchema = z
  .object({
    barcode: z.string().nullable(),
    category_id: z.string().nullable(),
    created_at: z.string(),
    deleted: z.boolean(),
    id: z.string(),
    image_url: z.string().nullable().optional(),
    name: z.string(),
    sku: z.string(),
    updated_at: z.string(),
    sale_type: z.enum(["whole", "unit"]),
    units: z.array(itemUnitSchema).optional(),
    prices: z.array(itemUnitPriceSchema).optional(),
  })
  .refine(
    (data) =>
      data.sale_type !== "unit" || (data.units && data.units.length > 0),
    {
      message: "Units are required when sale_type is 'unit'.",
      path: ["units"], // Points to the error location
    }
  )
  .refine(
    (data) =>
      data.sale_type !== "unit" || (data.prices && data.prices.length > 0),
    {
      message: "Prices are required when sale_type is 'unit'.",
      path: ["prices"], // Points to the error location
    }
  );
