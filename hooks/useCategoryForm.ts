import { useAppContext } from "@/context/AppContext";
import { generateId } from "@/database/SupaLegend";
import { CategoryFormValues } from "@/types/form/types";
import { categoryFormSchema } from "@/schema/form/schema";
import {  categoriesTable$ } from "@/store/categories";
import { Category } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


interface Params {
  category: Category | null;
  onChange?: (category: Category) => void;
}

const useCategoryForm = ({category, onChange}: Params) => {

  const {store$} = useAppContext();

  /**
   * Form controller with dynamic initial values and Zod validation
   */
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    /** Use Zod schema for form validation */
    defaultValues: category 
    ? {
      ... category,
      created_at: new Date(category.created_at).toISOString().toString(),
      updated_at: new Date().toISOString().toString(),

    } : {
        id: "",
        name: "",
        description: "",
        deleted: false,
        created_at: new Date().toISOString().toString(),
      updated_at: new Date().toISOString().toString(),
    },
    resolver: zodResolver(categoryFormSchema),
  });

  const updateCategory = (category: Category) => {
    if (categoriesTable$ && categoriesTable$[category.id]) {
      categoriesTable$[category.id].assign(category);

      if (onChange) {
        onChange(categoriesTable$[category.id].get());
      }
    }
  };

  const createCategory = (category: Category) => {
    const id = generateId()
    categoriesTable$[id].assign({...category, id});

    if (onChange) {
      onChange({...category, id});
    }

  }

  return {
    control,
    handleSubmit,
    errors,
    watch,
    setValue,
    getValues,
    updateCategory,
    createCategory
  };
};

export default useCategoryForm;
