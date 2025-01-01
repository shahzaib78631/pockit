// Generated by ts-to-zod
import { z } from "zod";
import { Json } from "./../../database/database.types";

export const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z
    .union([
      z.string(),
      z.number(),
      z.boolean(),
      z.record(z.union([jsonSchema, z.undefined()])),
      z.array(jsonSchema),
    ])
    .nullable(),
);

export const categoriesRowSchema = z.object({
  created_at: z.string(),
  deleted: z.boolean(),
  id: z.string(),
  name: z.string(),
  updated_at: z.string(),
});

export const categoriesInsertSchema = z.object({
  created_at: z.string().optional(),
  deleted: z.boolean().optional(),
  id: z.string().optional(),
  name: z.string(),
  updated_at: z.string().optional(),
});

export const categoriesUpdateSchema = z.object({
  created_at: z.string().optional(),
  deleted: z.boolean().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  updated_at: z.string().optional(),
});

export const categoriesRelationshipsSchema = z.tuple([]);

export const inventoryRowSchema = z.object({
  created_at: z.string(),
  deleted: z.boolean(),
  id: z.string(),
  item_id: z.string(),
  location_id: z.string().nullable(),
  unit_count: z.number(),
  updated_at: z.string(),
  whole_count: z.number(),
});

export const inventoryInsertSchema = z.object({
  created_at: z.string().optional(),
  deleted: z.boolean().optional(),
  id: z.string().optional(),
  item_id: z.string(),
  location_id: z.string().optional().nullable(),
  unit_count: z.number().optional(),
  updated_at: z.string().optional(),
  whole_count: z.number().optional(),
});

export const inventoryUpdateSchema = z.object({
  created_at: z.string().optional(),
  deleted: z.boolean().optional(),
  id: z.string().optional(),
  item_id: z.string().optional(),
  location_id: z.string().optional().nullable(),
  unit_count: z.number().optional(),
  updated_at: z.string().optional(),
  whole_count: z.number().optional(),
});

export const inventoryRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("inventory_item_id_fkey"),
    columns: z.tuple([z.literal("item_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("items"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("inventory_location_id_fkey"),
    columns: z.tuple([z.literal("location_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("locations"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const itemsRowSchema = z.object({
  barcode: z.string().nullable(),
  category_id: z.string().nullable(),
  created_at: z.string(),
  deleted: z.boolean(),
  id: z.string(),
  is_active: z.boolean(),
  name: z.string(),
  selling_type: z.string(),
  sku: z.string(),
  sub_unit_id: z.string().nullable(),
  supplier_id: z.string().nullable(),
  unit_buying_price: z.number(),
  unit_selling_price: z.number(),
  units_per_whole: z.number(),
  updated_at: z.string(),
  whole_buying_price: z.number(),
  whole_selling_price: z.number(),
  whole_unit_id: z.string().nullable(),
});

export const itemsInsertSchema = z.object({
  barcode: z.string().optional().nullable(),
  category_id: z.string().optional().nullable(),
  created_at: z.string().optional(),
  deleted: z.boolean().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  name: z.string(),
  selling_type: z.string().optional(),
  sku: z.string(),
  sub_unit_id: z.string().optional().nullable(),
  supplier_id: z.string().optional().nullable(),
  unit_buying_price: z.number().optional(),
  unit_selling_price: z.number().optional(),
  units_per_whole: z.number().optional(),
  updated_at: z.string().optional(),
  whole_buying_price: z.number().optional(),
  whole_selling_price: z.number().optional(),
  whole_unit_id: z.string().optional().nullable(),
});

export const itemsUpdateSchema = z.object({
  barcode: z.string().optional().nullable(),
  category_id: z.string().optional().nullable(),
  created_at: z.string().optional(),
  deleted: z.boolean().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  name: z.string().optional(),
  selling_type: z.string().optional(),
  sku: z.string().optional(),
  sub_unit_id: z.string().optional().nullable(),
  supplier_id: z.string().optional().nullable(),
  unit_buying_price: z.number().optional(),
  unit_selling_price: z.number().optional(),
  units_per_whole: z.number().optional(),
  updated_at: z.string().optional(),
  whole_buying_price: z.number().optional(),
  whole_selling_price: z.number().optional(),
  whole_unit_id: z.string().optional().nullable(),
});

export const itemsRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("items_category_id_fkey"),
    columns: z.tuple([z.literal("category_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("categories"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("items_sub_unit_id_fkey"),
    columns: z.tuple([z.literal("sub_unit_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("units"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("items_supplier_id_fkey"),
    columns: z.tuple([z.literal("supplier_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("suppliers"),
    referencedColumns: z.tuple([z.literal("person_id")]),
  }),
  z.object({
    foreignKeyName: z.literal("items_whole_unit_id_fkey"),
    columns: z.tuple([z.literal("whole_unit_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("units"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const locationsRowSchema = z.object({
  address: z.string().nullable(),
  created_at: z.string(),
  deleted: z.boolean(),
  id: z.string(),
  name: z.string(),
  updated_at: z.string(),
});

export const locationsInsertSchema = z.object({
  address: z.string().optional().nullable(),
  created_at: z.string().optional(),
  deleted: z.boolean().optional(),
  id: z.string().optional(),
  name: z.string(),
  updated_at: z.string().optional(),
});

export const locationsUpdateSchema = z.object({
  address: z.string().optional().nullable(),
  created_at: z.string().optional(),
  deleted: z.boolean().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  updated_at: z.string().optional(),
});

export const locationsRelationshipsSchema = z.tuple([]);

export const peopleRowSchema = z.object({
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  comments: z.string().nullable(),
  country: z.string(),
  created_at: z.string(),
  deleted: z.boolean(),
  email: z.string(),
  first_name: z.string(),
  gender: z.number().nullable(),
  id: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  state: z.string(),
  updated_at: z.string(),
  zip: z.string(),
});

export const peopleInsertSchema = z.object({
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  comments: z.string().optional().nullable(),
  country: z.string(),
  created_at: z.string().optional(),
  deleted: z.boolean().optional(),
  email: z.string(),
  first_name: z.string(),
  gender: z.number().optional().nullable(),
  id: z.string().optional(),
  last_name: z.string(),
  phone_number: z.string(),
  state: z.string(),
  updated_at: z.string().optional(),
  zip: z.string(),
});

export const peopleUpdateSchema = z.object({
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  comments: z.string().optional().nullable(),
  country: z.string().optional(),
  created_at: z.string().optional(),
  deleted: z.boolean().optional(),
  email: z.string().optional(),
  first_name: z.string().optional(),
  gender: z.number().optional().nullable(),
  id: z.string().optional(),
  last_name: z.string().optional(),
  phone_number: z.string().optional(),
  state: z.string().optional(),
  updated_at: z.string().optional(),
  zip: z.string().optional(),
});

export const peopleRelationshipsSchema = z.tuple([]);

export const suppliersRowSchema = z.object({
  account_number: z.string().nullable(),
  agency_name: z.string(),
  company_name: z.string(),
  created_at: z.string(),
  deleted: z.boolean(),
  person_id: z.string(),
  updated_at: z.string(),
});

export const suppliersInsertSchema = z.object({
  account_number: z.string().optional().nullable(),
  agency_name: z.string(),
  company_name: z.string(),
  created_at: z.string().optional(),
  deleted: z.boolean().optional(),
  person_id: z.string(),
  updated_at: z.string().optional(),
});

export const suppliersUpdateSchema = z.object({
  account_number: z.string().optional().nullable(),
  agency_name: z.string().optional(),
  company_name: z.string().optional(),
  created_at: z.string().optional(),
  deleted: z.boolean().optional(),
  person_id: z.string().optional(),
  updated_at: z.string().optional(),
});

export const suppliersRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("suppliers_person_id_fkey"),
    columns: z.tuple([z.literal("person_id")]),
    isOneToOne: z.literal(true),
    referencedRelation: z.literal("people"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const unitsRowSchema = z.object({
  created_at: z.string(),
  deleted: z.boolean(),
  id: z.string(),
  name: z.string(),
  symbol: z.string().nullable(),
  updated_at: z.string(),
});

export const unitsInsertSchema = z.object({
  created_at: z.string().optional(),
  deleted: z.boolean().optional(),
  id: z.string().optional(),
  name: z.string(),
  symbol: z.string().optional().nullable(),
  updated_at: z.string().optional(),
});

export const unitsUpdateSchema = z.object({
  created_at: z.string().optional(),
  deleted: z.boolean().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  symbol: z.string().optional().nullable(),
  updated_at: z.string().optional(),
});

export const unitsRelationshipsSchema = z.tuple([]);