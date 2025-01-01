import { Tables } from "@/database/database.types";

export type Units = Tables<"units">[]
export type Unit = Tables<"units">

export type Categories = Tables<"categories">[]
export type Category = Tables<"categories">

export type Peoples = Tables<"people">[]
export type People = Tables<"people">

export type Suppliers = (Tables<"suppliers"> & { profile?: Peoples })[];
export type Supplier =  Tables<"suppliers"> & { profile?: Peoples };

export type Inventories = Tables<"inventory">[]
export type Inventory = Tables<"inventory">

export type Locations = Tables<"locations">[]
export type Location = Tables<"locations">

export type Items = (Tables<"items"> & { inventory?: Inventories })[];
export type Item = Tables<"items"> & { inventory?: Inventories };
