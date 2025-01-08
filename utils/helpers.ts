// Function to dynamically filter properties matching the keys of a target type
export const pickValuesByType = <T, U>(obj: T, template: U): Partial<U> => {
    const result: Partial<U> = {};
    for (const key in template) {
      if (key in obj) {
        result[key as keyof U] = obj[key as keyof T] as any;
      }
    }
    return result;
  };