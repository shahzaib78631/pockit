// === start of custom type ===
  // ItemsView.ItemsViewPrices.prices
  export type ItemsViewPrices = Array<{
 
  }>;
  // === end of custom type ===

/**
 * This file was @generated using typed-pocketbase
 */

// https://pocketbase.io/docs/collections/#base-collection
export interface BaseCollectionResponse {
	/**
	 * 15 characters string to store as record ID.
	 */
	id: string;
	/**
	 * Date string representation for the creation date.
	 */
	created: string;
	/**
	 * Date string representation for the creation date.
	 */
	updated: string;
	/**
	 * The collection id.
	 */
	collectionId: string;
	/**
	 * The collection name.
	 */
	collectionName: string;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface BaseCollectionCreate {
	/**
	 * 15 characters string to store as record ID.
	 * If not set, it will be auto generated.
	 */
	id?: string;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface BaseCollectionUpdate {}

// https://pocketbase.io/docs/collections/#auth-collection
export interface AuthCollectionResponse extends BaseCollectionResponse {
	/**
	 * The username of the auth record.
	 */
	username: string;
	/**
	 * Auth record email address.
	 */
	email: string;
	/**
	 * Auth record email address.
	 */
	tokenKey?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility: boolean;
	/**
	 * Indicates whether the auth record is verified or not.
	 */
	verified: boolean;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface AuthCollectionCreate extends BaseCollectionCreate {
	/**
	 * The username of the auth record.
	 * If not set, it will be auto generated.
	 */
	username?: string;
	/**
	 * Auth record email address.
	 */
	email?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility?: boolean;
	/**
	 * Auth record password.
	 */
	password: string;
	/**
	 * Auth record password confirmation.
	 */
	passwordConfirm: string;
	/**
	 * Indicates whether the auth record is verified or not.
	 * This field can be set only by admins or auth records with "Manage" access.
	 */
	verified?: boolean;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface AuthCollectionUpdate {
	/**
	 * The username of the auth record.
	 */
	username?: string;
	/**
	 * The auth record email address.
	 * This field can be updated only by admins or auth records with "Manage" access.
	 * Regular accounts can update their email by calling "Request email change".
	 */
	email?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility?: boolean;
	/**
	 * Old auth record password.
	 * This field is required only when changing the record password. Admins and auth records with "Manage" access can skip this field.
	 */
	oldPassword?: string;
	/**
	 * New auth record password.
	 */
	password?: string;
	/**
	 * New auth record password confirmation.
	 */
	passwordConfirm?: string;
	/**
	 * Indicates whether the auth record is verified or not.
	 * This field can be set only by admins or auth records with "Manage" access.
	 */
	verified?: boolean;
}

// https://pocketbase.io/docs/collections/#view-collection
export interface ViewCollectionRecord {
	id: string;
}

// utilities

type MaybeArray<T> = T | T[];

// ===== _mfas block =====
// ===== _mfas =====

export interface MfasResponse extends BaseCollectionResponse {
	collectionName: '_mfas';
	id: string;
	collectionRef: string;
	recordRef: string;
	method: string;
	created: string;
	updated: string;
}

export interface MfasCreate extends BaseCollectionCreate {
	id?: string;
	collectionRef: string;
	recordRef: string;
	method: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface MfasUpdate extends BaseCollectionUpdate {
	id: string;
	collectionRef: string;
	recordRef: string;
	method: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface MfasCollection {
	type: 'base';
	collectionId: string;
	collectionName: '_mfas';
	response: MfasResponse;
	create: MfasCreate;
	update: MfasUpdate;
	relations: Record<string, never>;
}

// ===== _otps block =====
// ===== _otps =====

export interface OtpsResponse extends BaseCollectionResponse {
	collectionName: '_otps';
	id: string;
	collectionRef: string;
	recordRef: string;
	created: string;
	updated: string;
}

export interface OtpsCreate extends BaseCollectionCreate {
	id?: string;
	collectionRef: string;
	recordRef: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface OtpsUpdate extends BaseCollectionUpdate {
	id: string;
	collectionRef: string;
	recordRef: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface OtpsCollection {
	type: 'base';
	collectionId: string;
	collectionName: '_otps';
	response: OtpsResponse;
	create: OtpsCreate;
	update: OtpsUpdate;
	relations: Record<string, never>;
}

// ===== _externalAuths block =====
// ===== _externalAuths =====

export interface ExternalAuthsResponse extends BaseCollectionResponse {
	collectionName: '_externalAuths';
	id: string;
	collectionRef: string;
	recordRef: string;
	provider: string;
	providerId: string;
	created: string;
	updated: string;
}

export interface ExternalAuthsCreate extends BaseCollectionCreate {
	id?: string;
	collectionRef: string;
	recordRef: string;
	provider: string;
	providerId: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface ExternalAuthsUpdate extends BaseCollectionUpdate {
	id: string;
	collectionRef: string;
	recordRef: string;
	provider: string;
	providerId: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface ExternalAuthsCollection {
	type: 'base';
	collectionId: string;
	collectionName: '_externalAuths';
	response: ExternalAuthsResponse;
	create: ExternalAuthsCreate;
	update: ExternalAuthsUpdate;
	relations: Record<string, never>;
}

// ===== _authOrigins block =====
// ===== _authOrigins =====

export interface AuthOriginsResponse extends BaseCollectionResponse {
	collectionName: '_authOrigins';
	id: string;
	collectionRef: string;
	recordRef: string;
	fingerprint: string;
	created: string;
	updated: string;
}

export interface AuthOriginsCreate extends BaseCollectionCreate {
	id?: string;
	collectionRef: string;
	recordRef: string;
	fingerprint: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface AuthOriginsUpdate extends BaseCollectionUpdate {
	id: string;
	collectionRef: string;
	recordRef: string;
	fingerprint: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface AuthOriginsCollection {
	type: 'base';
	collectionId: string;
	collectionName: '_authOrigins';
	response: AuthOriginsResponse;
	create: AuthOriginsCreate;
	update: AuthOriginsUpdate;
	relations: Record<string, never>;
}

// ===== _superusers block =====
// ===== _superusers =====

export interface SuperusersResponse extends AuthCollectionResponse {
	collectionName: '_superusers';
	id: string;
	tokenKey: string;
	email: string;
	emailVisibility: boolean;
	verified: boolean;
	created: string;
	updated: string;
}

export interface SuperusersCreate extends AuthCollectionCreate {
	id?: string;
	email: string;
	emailVisibility?: boolean;
	verified?: boolean;
	created?: string | Date;
	updated?: string | Date;
}

export interface SuperusersUpdate extends AuthCollectionUpdate {
	id: string;
	email: string;
	emailVisibility?: boolean;
	verified?: boolean;
	created?: string | Date;
	updated?: string | Date;
}

export interface SuperusersCollection {
	type: 'auth';
	collectionId: string;
	collectionName: '_superusers';
	response: SuperusersResponse;
	create: SuperusersCreate;
	update: SuperusersUpdate;
	relations: Record<string, never>;
}

// ===== items block =====
// ===== items =====

export interface ItemsResponse extends BaseCollectionResponse {
	collectionName: 'items';
	id: string;
	name: string;
	barcode: string;
	sku: string;
	sale_type: string;
	deleted: boolean;
	category_id: string;
	created: string;
	updated: string;
}

export interface ItemsCreate extends BaseCollectionCreate {
	id?: string;
	name?: string;
	barcode?: string;
	sku?: string;
	sale_type?: string;
	deleted?: boolean;
	category_id?: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface ItemsUpdate extends BaseCollectionUpdate {
	id: string;
	name?: string;
	barcode?: string;
	sku?: string;
	sale_type?: string;
	deleted?: boolean;
	category_id?: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface ItemsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'items';
	response: ItemsResponse;
	create: ItemsCreate;
	update: ItemsUpdate;
	relations: {
		category_id: CategoriesCollection;
		item_prices_via_item_id: ItemPricesCollection[];
		item_units_via_item_id: ItemUnitsCollection[];
	};
}

// ===== categories block =====
// ===== categories =====

export interface CategoriesResponse extends BaseCollectionResponse {
	collectionName: 'categories';
	id: string;
	name: string;
	description: string;
	deleted: boolean;
	created: string;
	updated: string;
}

export interface CategoriesCreate extends BaseCollectionCreate {
	id?: string;
	name?: string;
	description?: string;
	deleted?: boolean;
	created?: string | Date;
	updated?: string | Date;
}

export interface CategoriesUpdate extends BaseCollectionUpdate {
	id: string;
	name?: string;
	description?: string;
	deleted?: boolean;
	created?: string | Date;
	updated?: string | Date;
}

export interface CategoriesCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'categories';
	response: CategoriesResponse;
	create: CategoriesCreate;
	update: CategoriesUpdate;
	relations: {
		items_via_category_id: ItemsCollection[];
		items_view_via_category_id: ItemsViewCollection[];
	};
}

// ===== units block =====
// ===== units =====

export interface UnitsResponse extends BaseCollectionResponse {
	collectionName: 'units';
	id: string;
	name: string;
	symbol: string;
	category: string;
	deleted: boolean;
	created: string;
	updated: string;
}

export interface UnitsCreate extends BaseCollectionCreate {
	id?: string;
	name?: string;
	symbol?: string;
	category?: string;
	deleted?: boolean;
	created?: string | Date;
	updated?: string | Date;
}

export interface UnitsUpdate extends BaseCollectionUpdate {
	id: string;
	name?: string;
	symbol?: string;
	category?: string;
	deleted?: boolean;
	created?: string | Date;
	updated?: string | Date;
}

export interface UnitsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'units';
	response: UnitsResponse;
	create: UnitsCreate;
	update: UnitsUpdate;
	relations: {
		item_prices_via_unit_id: ItemPricesCollection[];
		item_units_via_unit_id: ItemUnitsCollection[];
	};
}

// ===== item_prices block =====
// ===== item_prices =====

export interface ItemPricesResponse extends BaseCollectionResponse {
	collectionName: 'item_prices';
	id: string;
	item_id: string;
	unit_id: string;
	buying_price: number;
	selling_price: number;
	deleted: boolean;
	created: string;
	updated: string;
}

export interface ItemPricesCreate extends BaseCollectionCreate {
	id?: string;
	item_id?: string;
	unit_id?: string;
	buying_price?: number;
	selling_price?: number;
	deleted?: boolean;
	created?: string | Date;
	updated?: string | Date;
}

export interface ItemPricesUpdate extends BaseCollectionUpdate {
	id: string;
	item_id?: string;
	unit_id?: string;
	buying_price?: number;
	'buying_price+'?: number;
	'buying_price-'?: number;
	selling_price?: number;
	'selling_price+'?: number;
	'selling_price-'?: number;
	deleted?: boolean;
	created?: string | Date;
	updated?: string | Date;
}

export interface ItemPricesCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'item_prices';
	response: ItemPricesResponse;
	create: ItemPricesCreate;
	update: ItemPricesUpdate;
	relations: {
		item_id: ItemsCollection;
		unit_id: UnitsCollection;
	};
}

// ===== item_units block =====
// ===== item_units =====

export interface ItemUnitsResponse extends BaseCollectionResponse {
	collectionName: 'item_units';
	id: string;
	item_id: string;
	unit_id: string;
	is_base_unit: boolean;
	deleted: boolean;
	conversion_factor: number;
	created: string;
	updated: string;
}

export interface ItemUnitsCreate extends BaseCollectionCreate {
	id?: string;
	item_id?: string;
	unit_id?: string;
	is_base_unit?: boolean;
	deleted?: boolean;
	conversion_factor?: number;
	created?: string | Date;
	updated?: string | Date;
}

export interface ItemUnitsUpdate extends BaseCollectionUpdate {
	id: string;
	item_id?: string;
	unit_id?: string;
	is_base_unit?: boolean;
	deleted?: boolean;
	conversion_factor?: number;
	'conversion_factor+'?: number;
	'conversion_factor-'?: number;
	created?: string | Date;
	updated?: string | Date;
}

export interface ItemUnitsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'item_units';
	response: ItemUnitsResponse;
	create: ItemUnitsCreate;
	update: ItemUnitsUpdate;
	relations: {
		item_id: ItemsCollection;
		unit_id: UnitsCollection;
	};
}

// ===== items_view block =====
// ===== items_view =====

export interface ItemsViewResponse extends ViewCollectionResponse {
	collectionName: 'items_view';
	id: string;
	barcode: string;
	category_id: string;
	name: string;
	sku: string;
	sale_type: string;
	created_at: string;
	updated_at: string;
	deleted: boolean;
	base_unit: Record<string, any> | Array<any> | null;
	prices?: ItemsViewPrices
	units: Record<string, any> | Array<any> | null;
}

export interface ItemsViewCollection {
	type: 'view';
	collectionId: string;
	collectionName: 'items_view';
	response: ItemsViewResponse;
	relations: {
		category_id: CategoriesCollection;
	};
}

// ===== Schema =====
export type Schema = {
	_mfas: MfasCollection;
	_otps: OtpsCollection;
	_externalAuths: ExternalAuthsCollection;
	_authOrigins: AuthOriginsCollection;
	_superusers: SuperusersCollection;
	items: ItemsCollection;
	categories: CategoriesCollection;
	units: UnitsCollection;
	prices?: ItemsViewPrices
	item_units: ItemUnitsCollection;
	items_view: ItemsViewCollection;
}