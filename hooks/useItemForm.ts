import { generateId } from "@/utils/helpers";
import { itemsTable$ } from "@/store/items";
import { itemSchema } from "@/schema";
import { Item, ItemFormValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Params {
  item: Item | null;
}

const useItemForm = ({item}: Params) => {
  /**
   * Form controller with dynamic initial values and Zod validation
   */
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm<ItemFormValues>({
    /** Use Zod schema for form validation */
    defaultValues: item 
    ? {
      ...item,
      created_at: new Date(item.created_at).toISOString().toString(),
      updated_at: new Date().toISOString().toString(),
    } : {
      image_url: null, // Optional field
      barcode: null, // Optional field
      category_id: null, // Optional field
      created_at: new Date().toISOString().toString(), // Default to current timestamp
      deleted: false, // Default to not deleted
      id: generateId(), // Default to empty string for unique ID
      sku: '', // Default to empty string for stock-keeping unit
      sale_type: "whole", // Default to whole sale type
      updated_at: new Date().toISOString().toString(), // Default to current timestamp
    },
    resolver: zodResolver(itemSchema),
  });

  const updateItem = (item: ItemFormValues) => {

    const { units, prices, ...itemData } = item;
    

    if (itemsTable$ && itemsTable$[itemData.id]) {
      itemsTable$[item.id].assign(item);
    }

    // if (units && units?.length > 0) {
    //   units?.forEach(unit => {
    //     itemUnitsTable$[unit.id].assign(unit);
    //   });
    // }

    // if (prices && prices?.length > 0) {
    //   prices?.forEach(price => {
    //     itemPricesTable$[price.id].assign(price);
    //   });
    // }

  };

  const createItem = (item: ItemFormValues) => {

    const { units, prices, ...itemData } = item;

    if (itemsTable$ && itemsTable$[itemData.id]) {
      itemsTable$[item.id].assign(itemData);
    }

    // if (units && units?.length > 0) {
    //   units?.forEach(unit => {
    //     itemUnitsTable$[unit.id].assign(unit);
    //   });
    // }

    // if (prices && prices?.length > 0) {
    //   prices?.forEach(price => {
    //     itemPricesTable$[price.id].assign(price);
    //   });
    // }
  }

  return {
    control,
    handleSubmit,
    errors,
    watch,
    setValue,
    getValues,
    updateItem,
    createItem,
    setError,
  };
};

export default useItemForm;
