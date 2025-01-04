import { CategoriesStore$ } from "@/store/categories";
import { InventoryStore$ } from "@/store/inventory";
import { ItemsStore$ } from "@/store/items";
import { SuppliersStore$ } from "@/store/suppliers";
import { UnitsStore$ } from "@/store/units";
import { observable } from "@legendapp/state";
import React, { createContext, useContext, ReactNode } from "react";

// Create the context with a proper type
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Define the props for the provider
interface AppProviderProps {
  children: ReactNode; // ReactNode to represent any valid React children
}

const store$ = observable({
  UnitsStore: UnitsStore$,
  CategoriesStore: CategoriesStore$,
  ItemsStore: ItemsStore$,
});

// Define the interface for the context's value
interface AppContextProps {
  store$: typeof store$;
}

// Implement the provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AppContext.Provider value={{ store$ }}>{children}</AppContext.Provider>
  );
};

// Custom hook to use the context with type safety
export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
