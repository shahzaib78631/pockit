-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------
-- Categories Table
-- ----------------------------------
CREATE TABLE categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT, 
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- ----------------------------------
-- Units Table
-- ----------------------------------
CREATE TABLE units (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    symbol TEXT,
    base_unit BOOLEAN DEFAULT FALSE, -- Indicates if this is the base unit for the item
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- ----------------------------------
-- Unit Conversions Table
-- ----------------------------------
CREATE TABLE unit_conversions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
    base_unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
    conversion_factor REAL NOT NULL, 
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- ----------------------------------
-- Locations Table
-- ----------------------------------
CREATE TABLE locations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- ----------------------------------
-- People Table
-- ----------------------------------
CREATE TABLE people (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    gender INTEGER, 
    phone_number TEXT NOT NULL,
    email TEXT NOT NULL,
    address1 TEXT NOT NULL,
    address2 TEXT,
    city TEXT NOT NULL,
    state TEXT,
    zip TEXT,
    country TEXT NOT NULL,
    comments TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- ----------------------------------
-- Suppliers Table
-- ----------------------------------
CREATE TABLE suppliers (
    person_id UUID PRIMARY KEY REFERENCES people(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    agency_name TEXT,
    account_number TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- ----------------------------------
-- Customers Table
-- ----------------------------------
CREATE TABLE customers (
    person_id UUID PRIMARY KEY REFERENCES people(id) ON DELETE CASCADE,
    customer_type TEXT, -- e.g., Retail, Wholesale
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- ----------------------------------
-- Items Table
-- ----------------------------------
CREATE TABLE items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sku TEXT NOT NULL UNIQUE,
    barcode TEXT UNIQUE,
    name TEXT NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE, -- e.g., Raw Material, Finished Good, Service
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- ----------------------------------
-- Item Units Table (Many-to-many relationship between Items and Units)
-- ----------------------------------
CREATE TABLE item_units (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    item_id UUID REFERENCES items(id) ON DELETE CASCADE,
    unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT FALSE, -- Indicates the primary unit for this item
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    UNIQUE (item_id, unit_id)
);

-- ----------------------------------
-- Inventory Table
-- ----------------------------------
CREATE TABLE inventory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    item_id UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    unit_id UUID REFERENCES units(id) ON DELETE SET NULL, -- Store the unit for this inventory record
    quantity REAL DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    UNIQUE (item_id, location_id, unit_id) -- Ensure one inventory record per item, location, and unit
);

-- ----------------------------------
-- Inventory History Table
-- ----------------------------------
CREATE TABLE inventory_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    inventory_id UUID REFERENCES inventory(id) ON DELETE CASCADE,
    quantity_change REAL NOT NULL,
    reason TEXT, 
    created_by UUID REFERENCES people(id), -- User who made the change
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ----------------------------------
-- Price Lists Table
-- ----------------------------------
CREATE TABLE price_lists (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- ----------------------------------
-- Item Prices Table
-- ----------------------------------
CREATE TABLE item_prices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    item_id UUID REFERENCES items(id) ON DELETE CASCADE,
    price_list_id UUID REFERENCES price_lists(id) ON DELETE CASCADE,
    unit_id UUID REFERENCES units(id) ON DELETE SET NULL, 
    buying_price NUMERIC,
    selling_price NUMERIC,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    UNIQUE (item_id, price_list_id, unit_id)
);

-- ----------------------------------
-- Sales Orders Table
-- ----------------------------------
CREATE TABLE sales_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES customers(person_id) ON DELETE SET NULL,
    order_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status TEXT, -- e.g., Pending, Processing, Shipped, Completed
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- ----------------------------------
-- Sales Order Items Table
-- ----------------------------------
CREATE TABLE sales_order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sales_order_id UUID REFERENCES sales_orders(id) ON DELETE CASCADE,
    item_id UUID REFERENCES items(id) ON DELETE SET NULL,
    unit_id UUID REFERENCES units(id) ON DELETE SET NULL, 
    quantity REAL NOT NULL,
    unit_price NUMERIC NOT NULL,
    discount NUMERIC, 
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);
-- ----------------------------------
-- Purchase Orders Table
-- ----------------------------------
CREATE TABLE purchase_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    supplier_id UUID REFERENCES suppliers(person_id) ON DELETE SET NULL,
    order_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status TEXT, -- e.g., Pending, Received, Completed
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- ----------------------------------
-- Purchase Order Items Table
-- ----------------------------------
CREATE TABLE purchase_order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    purchase_order_id UUID REFERENCES purchase_orders(id) ON DELETE CASCADE,
    item_id UUID REFERENCES items(id) ON DELETE SET NULL,
    unit_id UUID REFERENCES units(id) ON DELETE SET NULL, 
    quantity REAL NOT NULL,
    unit_price NUMERIC NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- ----------------------------------
-- Users Table
-- ----------------------------------
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL, -- Store hashed passwords
    person_id UUID REFERENCES people(id) ON DELETE SET NULL, 
    role TEXT, -- e.g., Admin, Manager, Cashier
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- ----------------------------------
-- User Permissions Table
-- ----------------------------------
CREATE TABLE user_permissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    permission TEXT, -- e.g., 'view_inventory', 'create_orders', 'edit_prices'
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- ----------------------------------
-- Triggers (handle_times)
-- ----------------------------------
CREATE OR REPLACE FUNCTION handle_times()
    RETURNS trigger AS
    $$
    BEGIN
    IF (TG_OP = 'INSERT') THEN
        NEW.created_at := now();
        NEW.updated_at := now();
    ELSEIF (TG_OP = 'UPDATE') THEN
        NEW.created_at = OLD.created_at;
        NEW.updated_at := now();
    END IF;
    RETURN NEW;
    END;
    $$ language plpgsql;

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON categories
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON units
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON locations
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON people
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON suppliers
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON customers
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON items
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON item_units
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON inventory
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON inventory_history
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON price_lists
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON item_prices
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON sales_orders
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON sales_order_items
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON purchase_orders
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON purchase_order_items
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON users
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON user_permissions
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();