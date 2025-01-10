import PocketBase, { ListResult, RecordModel, RecordSubscription, UnsubscribeFunc } from "pocketbase";

// POCKETBASE URL
const SERVER_URL = process.env.EXPO_PUBLIC_API_BASE_URL as string;

// INITIALIZE THE POCKETBASE INSTANCE
const pb = new PocketBase("http://127.0.0.1:8090");

// Generic types
interface BaseData {
  id?: string;
  created?: string;
  updated?: string;
}

type SortOrder = "created" | "-created" | "updated" | "-updated";

// Utility functions

/**
 * Fetch all records from a collection.
 * @param collectionName - The name of the collection.
 * @param sortBy - Sorting order (default: "-created").
 * @returns Promise of all records in the collection.
 */
const get = async <T extends BaseData>(
  collectionName: string,
  sortBy: SortOrder = "-created"
): Promise<T[]> =>
  await pb.collection(collectionName).getFullList<T>({
    sort: sortBy,
  });

/**
 * Fetch paginated records from a collection.
 * @param collectionName - The name of the collection.
 * @param page - Page number (default: 1).
 * @param perPage - Items per page (default: 3).
 * @param sortBy - Sorting order (default: "-created").
 * @returns Promise of paginated records.
 */
const getPaged = async <T extends BaseData>(
  collectionName: string,
  page: number = 1,
  perPage: number = 3,
  sortBy: SortOrder = "-created"
): Promise<ListResult<T>> =>
  await pb.collection(collectionName).getList<T>(page, perPage, {
    sort: sortBy,
  });

/**
 * Update a record in the collection.
 * @param collectionName - The name of the collection.
 * @param data - Data to update.
 * @param id - The ID of the record.
 * @returns Promise of updated record.
 */
const put = async <T extends BaseData>(
  collectionName: string,
  data: Partial<T>,
  id: string
): Promise<T> => await pb.collection(collectionName).update<T>(id, data);

/**
 * Create or update a record in the collection.
 * @param collectionName - The name of the collection.
 * @param data - Data to upsert (must include `id` for updates).
 * @returns Promise of created/updated record.
 */
const upsert = async <T extends BaseData>(
  collectionName: string,
  data: Partial<T>
): Promise<T> => {
  if (data?.id) {
    return await put(collectionName, data, data.id);
  } else {
    return await post(collectionName, data);
  }
};

/**
 * Create a new record in the collection.
 * @param collectionName - The name of the collection.
 * @param data - Data to create.
 * @returns Promise of created record.
 */
const post = async <T extends BaseData>(
  collectionName: string,
  data: Partial<T>
): Promise<T> => await pb.collection(collectionName).create<T>(data);

/**
 * Delete a record from the collection.
 * @param collectionName - The name of the collection.
 * @param id - The ID of the record to delete.
 * @returns Promise of deletion response.
 */
const remove = async (collectionName: string, id: string): Promise<boolean> =>
  await pb.collection(collectionName).delete(id);

/**
 * Subscribe to a collection for real-time updates.
 * @param collectionName - The name of the collection.
 * @param onUpdate - Callback to handle updates.
 * @param on - Optional filter for specific events ("*" by default).
 * @returns Promise of subscription response.
 */
const subscribe = async (
  collectionName: string,
  onUpdate: (data: RecordSubscription<RecordModel>) => void,
  on: string = "*"
): Promise<UnsubscribeFunc> =>
  await pb.collection(collectionName).subscribe(on, onUpdate);

/**
 * Unsubscribe from a collection.
 * @param collectionName - The name of the collection.
 * @returns Promise of unsubscription response.
 */
const unSubscribe = async (collectionName: string): Promise<void> =>
  pb.collection(collectionName).unsubscribe();

// API Definitions
export type ApiModule = {
  put: <T extends BaseData>(data: Partial<T>) => Promise<T>;
  upsert: <T extends BaseData>(data: Partial<T>) => Promise<T>;
  get: <T extends BaseData>() => Promise<T[]>;
  post: <T extends BaseData>(data: Partial<T>) => Promise<T>;
  delete: (id: string) => Promise<void>;
  subscribe: (onUpdate: (data: RecordSubscription<RecordModel>) => void) => Promise<void>;
  unSubscribe: () => Promise<void>;
};

export { pb , get, getPaged, put, upsert, post, remove, subscribe, unSubscribe };
