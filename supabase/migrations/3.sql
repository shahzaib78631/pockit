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
    base_unit BOOLEAN DEFAULT FALSE,
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

CREATE TABLE person_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    person_id UUID REFERENCES people(id) ON DELETE CASCADE,
    role TEXT NOT NULL, -- e.g., 'Supplier', 'Customer'
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
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- ----------------------------------
-- Item Units Table
-- ----------------------------------
CREATE TABLE item_units (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    item_id UUID REFERENCES items(id) ON DELETE CASCADE,
    unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT FALSE,
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
    unit_id UUID REFERENCES units(id) ON DELETE SET NULL,
    quantity REAL DEFAULT 0 NOT NULL,
    change_type TEXT, -- 'Initial', 'Purchase', 'Sale', 'Adjustment', etc.
    reason TEXT,
    created_by UUID REFERENCES people(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
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
-- Orders Table
-- ----------------------------------
CREATE TABLE orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_type TEXT NOT NULL, -- 'Sales' or 'Purchase'
    customer_id UUID REFERENCES people(id) ON DELETE SET NULL,
    supplier_id UUID REFERENCES people(id) ON DELETE SET NULL,
    order_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
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
-- Users Table
-- ----------------------------------
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    person_id UUID REFERENCES people(id) ON DELETE SET NULL,
    role TEXT,
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
    permission TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- ----------------------------------
-- Triggers (handle_times)
-- ----------------------------------
CREATE OR REPLACE FUNCTION handle_times()
RETURNS trigger AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        NEW.created_at := now();
        NEW.updated_at := now();
    ELSIF (TG_OP = 'UPDATE') THEN
        NEW.created_at := OLD.created_at;
        NEW.updated_at := now();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_times
BEFORE INSERT OR UPDATE ON categories
FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
BEFORE INSERT OR UPDATE ON units
FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
BEFORE INSERT OR UPDATE ON unit_conversions
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
BEFORE INSERT OR UPDATE ON person_roles
FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
BEFORE INSERT OR UPDATE ON items
FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
BEFORE INSERT OR UPDATE ON inventory
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
BEFORE INSERT OR UPDATE ON orders
FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
BEFORE INSERT OR UPDATE ON order_items
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
