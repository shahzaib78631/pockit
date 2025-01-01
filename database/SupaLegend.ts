import "react-native-get-random-values";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import { v4 as uuidv4 } from "uuid";
import { syncedSupabase } from "@legendapp/state/sync-plugins/supabase";
import "react-native-get-random-values";
import { configureSynced ,  } from "@legendapp/state/sync";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { enable$GetSet } from "@legendapp/state/config/enable$GetSet";
enable$GetSet()

// Initialize Supabase client
export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL || "",
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Provide a function to generate ids locally
export const generateId = () => uuidv4();

// Create a configured sync function
export const customSynced = configureSynced(syncedSupabase, {
  // Use React Native MMKV
  persist: {
    name: "Pokit",
    plugin: ObservablePersistMMKV,
  },
  syncMode: "auto",
  generateId,
  supabase,
  // Enable syncing only changes since last-sync
  changesSince: 'last-sync',
  fieldCreatedAt: 'created_at',
  fieldUpdatedAt: 'updated_at',
  // Optionally enable soft deletes
  fieldDeleted: 'deleted',
  updatePartial: true,
});
/**
 * Supported operators for Supabase filters.
 */
type Operator =
  | 'eq'    // Equal
  | 'neq'   // Not Equal
  | 'gt'    // Greater Than
  | 'gte'   // Greater Than or Equal
  | 'lt'    // Less Than
  | 'lte'   // Less Than or Equal
  | 'like'  // Pattern Matching (case-sensitive)
  | 'ilike' // Pattern Matching (case-insensitive)
  | 'is'    // Check for NULL or NOT NULL
  | 'in';   // Value in a set (array)

/**
 * Options to customize query building.
 */
interface QueryOptions {
  /** 
   * The search text to filter results. 
   */
  search?: string;

  /**
   * List of fields to search in.
   */
  searchFields?: string[];

  /**
   * Sorting fields in the format 'field' for ascending or '-field' for descending.
   */
  sort?: string;

  /**
   * Fields to retrieve in the query.
   */
  fields?: string[];

  /**
   * Page number for pagination (1-indexed). Ignored if `getAll` is true.
   */
  page?: number;

  /**
   * Number of items per page for pagination. Ignored if `getAll` is true.
   */
  limit?: number;

  /**
   * If true, fetch all data, ignoring pagination.
   */
  getAll?: boolean;

  /**
   * Filters with Supabase operators.
   * Example: { fieldName: { operator: 'eq', value: 'example' } }
   */
  filters?: Record<string, { operator: Operator; value: any }>;
}

/**
 * Builds a query with filtering, sorting, field selection, and pagination.
 * 
 * @param query - The initial query object to be modified.
 * @param options - Options to customize the query.
 * @returns The modified query object.
 */
export function buildQuery(
  query: any, 
  options: QueryOptions = {}
): any {
  // 1. Handle field selection
  query = handleFieldSelection(query, options.fields);

  // 2. Handle search functionality
  query = handleSearch(query, options.search, options.searchFields);

  // 3. Handle Supabase filters
  query = handleFilters(query, options.filters);

  // 4. Handle sorting
  query = handleSorting(query, options.sort);

  // 5. Handle pagination or get all data
  query = handlePagination(query, options.page, options.limit, options.getAll);

  return query;
}

/**
 * Handles field selection in the query.
 */
function handleFieldSelection(query: any, fields?: string[]): any {
  if (fields && fields.length > 0) {
    return query.select(fields.join(', '));
  }
  return query.select('*'); // Default to selecting all fields
}

/**
 * Handles search functionality in the query.
 */
function handleSearch(query: any, search?: string, searchFields?: string[]): any {
  if (search && searchFields && searchFields.length > 0) {
    const orQuery = searchFields
      .map(field => `${field}.ilike.%${search}%`)
      .join(',');
    return query.or(orQuery);
  }
  return query;
}

/**
 * Handles Supabase filters using operators like eq, neq, gt, lt, etc.
 */
function handleFilters(query: any, filters?: Record<string, { operator: Operator; value: any }>): any {
  if (filters) {
    Object.entries(filters).forEach(([field, { operator, value }]) => {
      switch (operator) {
        case 'eq':
          query = query.eq(field, value);
          break;
        case 'neq':
          query = query.neq(field, value);
          break;
        case 'gt':
          query = query.gt(field, value);
          break;
        case 'gte':
          query = query.gte(field, value);
          break;
        case 'lt':
          query = query.lt(field, value);
          break;
        case 'lte':
          query = query.lte(field, value);
          break;
        case 'like':
          query = query.like(field, `%${value}%`);
          break;
        case 'ilike':
          query = query.ilike(field, `%${value}%`);
          break;
        case 'is':
          query = query.is(field, value);
          break;
        case 'in':
          query = query.in(field, Array.isArray(value) ? value : [value]);
          break;
        default:
          throw new Error(`Unsupported operator: ${operator}`);
      }
    });
  }
  return query;
}

/**
 * Handles sorting in the query.
 */
function handleSorting(query: any, sort?: string): any {
  if (sort) {
    const sortFields = sort.split(',').map(sortField => {
      const trimmedField = sortField.trim();
      return {
        field: trimmedField.startsWith('-') ? trimmedField.slice(1) : trimmedField,
        ascending: !trimmedField.startsWith('-'),
      };
    });

    sortFields.forEach(({ field, ascending }) => {
      query = query.order(field, { ascending });
    });
  }
  return query;
}

/**
 * Handles pagination or fetch-all logic in the query.
 *
 * @param query - The initial query object to be modified.
 * @param page - The current page number (1-indexed).
 * @param limit - The number of items per page.
 * @param getAll - If true, skip pagination.
 * @returns The modified query object.
 */
function handlePagination(query: any, page?: number, limit?: number, getAll?: boolean): any {
  if (getAll) {
    return query;
  }

  if (page && limit) {
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    return query.range(start, end);
  }
  return query;
}