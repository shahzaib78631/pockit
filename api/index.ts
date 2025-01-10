import $axios from "@/plugins/axios"
import { db } from "@/plugins/pocketbase";
import { Category, Item, Unit } from "@/types"
import { eq } from "@tigawanna/typed-pocketbase";

type Options = {
    offset: number;
    limit: number;
    filters?: any
}

export const getCategories = async () => {
    const {data} = await $axios.get<{items: Category[]}>("/collections/categories/records")
    return data.items
}

export const getItems = async ({ offset, limit, filters }: Options) => {
    try {
        // Fetch items from the database
        const { items } = await db.from("items_view").getList(offset, limit);
        return items

    } catch (error) {
        console.error("Error fetching items:", error);
        throw new Error("Failed to fetch items");
    }
};

export const getItem = async (id: string, item?: Item) => {
    try {
        // Fetch item details if not provided
        const itemData = item || (await db.from("items").getOne(id));

        if (!itemData) {
            throw new Error(`Item with ID ${id} not found`);
        }

        const itemUnits = await db.from("item_units").getFullList({
            filter: eq("item_id", `${itemData?.id}`),
            sort: ["-unit_id", "+is_base_unit"],
        });

        const itemPrices = await db.from("item_prices").getFullList({
            filter: eq("item_id", `${itemData?.id}`),
            sort: ["-unit_id"],
        });
        
        
        // Combine item with its related units and prices
        return {
            ...itemData,
            units: itemUnits,
            prices: itemPrices,
        };
    } catch (error) {
        console.error(`Error fetching details for item ${id}:`, error);
        throw new Error(`Failed to fetch item details for ID ${id}`);
    }
};


export const saveItem = async (item: Item) => {
    return await $axios.post(`/item/${item.id}`, item)
}

export const getUnits = async () => {
    const {data} = await $axios.get<{items: Unit[]}>("/collections/units/records")
    return data.items
}

const API = {
    getCategories,
    getItems,
    saveItem,
    getUnits,
    getItem
}

export default API