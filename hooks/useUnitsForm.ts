import { useAppContext } from "@/context/AppContext";
import { generateId } from "@/database/SupaLegend";
import { UnitsFormValues } from "@/types/form/types";
import { unitFormSchema } from "@/schema/form/schema";
import { unitsTable$ } from "@/store/units";
import { Unit } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


interface Params {
  unit: Unit | null;
  onChange?: (unit: Unit) => void;
}

const useUnitsForm = ({unit, onChange}: Params) => {

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
  } = useForm<UnitsFormValues>({
    /** Use Zod schema for form validation */
    defaultValues: unit 
    ? {
      ... unit,
      created_at: new Date(unit.created_at).toISOString().toString(),
      updated_at: new Date().toISOString().toString(),

    } : {
        id: generateId(),
        name: "",
        symbol: "",
        base_unit: false,
        deleted: false,
        created_at: new Date().toISOString().toString(),
      updated_at: new Date().toISOString().toString(),
    },
    resolver: zodResolver(unitFormSchema),
  });

  const updateUnit = (unit: Unit) => {
    if (unitsTable$ && unitsTable$[unit.id]) {
      unitsTable$[unit.id].assign(unit);

      if (onChange) {
        onChange(unitsTable$[unit.id].get());
      }
    }
  };

  const createUnit = (unit: Unit) => {
    unitsTable$[unit.id].assign(unit);

    if (onChange) {
      onChange(unit);
    }

  }

  return {
    control,
    handleSubmit,
    errors,
    watch,
    setValue,
    getValues,
    updateUnit,
    createUnit
  };
};

export default useUnitsForm;
