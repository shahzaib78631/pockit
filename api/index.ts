import $axios from "@/plugins/axios"
import { Category, Item, Unit } from "@/types"

type Options = {
    offset: number;
    limit: number;
    filters?: any
}

export const getCategories = async () => {
    const {data} = await $axios.get<{items: Category[]}>("/collections/categories/records")
    return data.items
}

export const getItems = async ({offset, limit, filters}: Options) => {
    return await $axios.get<Item[]>("/items", {params: {offset, limit, filters}})
}
export const getItem = async (id: string) => {
    return await $axios.get<Item>(`/item/${id}`)
}

export const saveItem = async (item: Item) => {
    return await $axios.post<Item[]>(`/item/${item.id}`, {data: item})
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