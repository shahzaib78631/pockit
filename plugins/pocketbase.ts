import PocketBase, { ListResult, RecordModel, RecordSubscription, UnsubscribeFunc } from "pocketbase";
import { TypedPocketBase } from '@tigawanna/typed-pocketbase';
import { Schema } from '@/types/database';

// POCKETBASE URL
const SERVER_URL = process.env.EXPO_PUBLIC_API_BASE_URL as string;

const db = new TypedPocketBase<Schema>('http://localhost:8090');

export { db };
