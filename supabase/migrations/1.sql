-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------
-- Categories Table
-- ----------------------------------
CREATE TABLE categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- Insert dummy data for categories
INSERT INTO categories (name, deleted) VALUES
('Raw Materials', FALSE),
('Finished Goods', FALSE),
('Packaging', FALSE),
('Supplies', FALSE);

-- ----------------------------------
-- Units Table
-- ----------------------------------
CREATE TABLE units (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    symbol TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- Insert dummy data for units
INSERT INTO units (name, symbol, deleted) VALUES
('Piece', 'pcs', FALSE),
('Kilogram', 'kg', FALSE),
('Liter', 'l', FALSE),
('Box', 'bx', FALSE),
('gram', 'gm', FALSE);


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
-- Sample Data for Locations Table
-- ----------------------------------
INSERT INTO locations (name, address)
VALUES 
    ('Warehouse A', '123 Main Street, Cityville, State, 12345'),
    ('Warehouse B', '456 Industrial Road, Townsville, State, 67890'),
    ('Retail Store 1', '789 Commerce Ave, Shopsville, State, 11223'),
    ('Retail Store 2', '101 Marketplace Blvd, Buytown, State, 44556');
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
    address2 TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL,
    country TEXT NOT NULL,
    comments TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- Insert dummy data for people
INSERT INTO people (first_name, last_name, gender, phone_number, email, address1, address2, city, state, zip, country, comments) VALUES
('John', 'Doe', 1, '123-456-7890', 'john.doe@example.com', '123 Elm St', '', 'Springfield', 'IL', '62704', 'USA', 'Reliable contact'),
('Jane', 'Smith', 2, '987-654-3210', 'jane.smith@example.com', '456 Maple Ave', 'Apt 2B', 'Metropolis', 'NY', '10101', 'USA', 'Preferred supplier'),
('Robert', 'Brown', 1, '555-123-4567', 'robert.brown@example.com', '789 Oak Blvd', '', 'Gotham', 'CA', '90210', 'USA', 'New client'),
('Alice', 'White', 2, '111-222-3333', 'alice.white@example.com', '321 Pine St', '', 'Star City', 'TX', '73301', 'USA', 'Key stakeholder');

-- ----------------------------------
-- Suppliers Table
-- ----------------------------------
CREATE TABLE suppliers (
    person_id UUID PRIMARY KEY REFERENCES people(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    agency_name TEXT NOT NULL,
    account_number TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- Insert dummy data for suppliers
INSERT INTO suppliers (person_id, company_name, agency_name, account_number, deleted) VALUES
((SELECT id FROM people WHERE first_name = 'John'), 'Doe Enterprises', 'Doe Agency', 'ACC12345', FALSE),
((SELECT id FROM people WHERE first_name = 'Jane'), 'Smith Supplies', 'Smith Co', 'ACC54321', FALSE),
((SELECT id FROM people WHERE first_name = 'Robert'), 'Brown Industries', 'Brown Group', 'ACC67890', FALSE),
((SELECT id FROM people WHERE first_name = 'Alice'), 'White Solutions', 'White Partners', 'ACC09876', FALSE);

-- ----------------------------------
-- Items Table
-- ----------------------------------
CREATE TABLE items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sku TEXT NOT NULL UNIQUE,
    barcode TEXT UNIQUE,
    name TEXT NOT NULL,
    selling_type TEXT NOT NULL DEFAULT 'whole',
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    whole_unit_id UUID REFERENCES units(id) ON DELETE SET NULL,
    sub_unit_id UUID REFERENCES units(id) ON DELETE SET NULL,
    units_per_whole REAL CHECK (units_per_whole > 0),
    -- Pricing Information
    whole_buying_price NUMERIC DEFAULT 0 NOT NULL,
    whole_selling_price NUMERIC DEFAULT 0 NOT NULL,
    unit_buying_price NUMERIC DEFAULT 0 NOT NULL,
    unit_selling_price NUMERIC DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- Insert dummy data for items
INSERT INTO items (
    sku, name, selling_type, category_id, whole_unit_id, sub_unit_id, 
    units_per_whole, whole_buying_price, whole_selling_price, unit_buying_price, unit_selling_price
) VALUES
('SKU001', 'Item 1', 'whole',
    (SELECT id FROM categories WHERE name = 'Raw Materials'),
    (SELECT id FROM units WHERE name = 'Box'),
    (SELECT id FROM units WHERE name = 'Piece'),
    12, 5.00, 6.00, 0.50, 0.60),
('SKU002', 'Item 2', 'unit',
    (SELECT id FROM categories WHERE name = 'Finished Goods'),
    (SELECT id FROM units WHERE name = 'Kilogram'),
    (SELECT id FROM units WHERE name = 'gram'),
    25, 10, 12, 0.50, 0.60);

-- ----------------------------------
-- Inventory Table
-- ----------------------------------
CREATE TABLE inventory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    item_id UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    whole_count REAL DEFAULT 0 NOT NULL,
    units_count REAL DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    UNIQUE (item_id, location_id) -- Ensure one inventory record per item per location
);

-- Insert dummy data for inventory
INSERT INTO inventory (item_id, location_id, whole_count, units_count) VALUES
((SELECT id FROM items WHERE sku = 'SKU001'), (SELECT id FROM locations WHERE name = 'Warehouse A'), 5, 4),
((SELECT id FROM items WHERE sku = 'SKU002'), (SELECT id FROM locations WHERE name = 'Warehouse A'), 20, 10);


CREATE TABLE purchase_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    supplier_id UUID NOT NULL REFERENCES suppliers(person_id) ON DELETE CASCADE, -- Supplier for the purchase
    purchase_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL, -- Date of purchase
    total_amount NUMERIC DEFAULT 0 NOT NULL, -- Total cost for the purchase (updated via trigger)
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE purchase_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    purchase_order_id UUID NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE, -- Related purchase order
    item_id UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE, -- Purchased item
    quantity REAL NOT NULL CHECK (quantity > 0), -- Quantity purchased
    price_per_unit NUMERIC NOT NULL, -- Price per unit/whole
    purchase_type TEXT CHECK (purchase_type IN ('unit', 'whole')) DEFAULT 'whole', -- Purchase by unit or whole
    total_price NUMERIC GENERATED ALWAYS AS (quantity * price_per_unit) STORED, -- Total cost for this line item
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON purchase_orders
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON purchase_items
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE OR REPLACE FUNCTION update_total_amount()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE purchase_orders
    SET total_amount = (
        SELECT COALESCE(SUM(total_price), 0)
        FROM purchase_items
        WHERE purchase_order_id = NEW.purchase_order_id
    )
    WHERE id = NEW.purchase_order_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_total_amount
AFTER INSERT OR UPDATE OR DELETE ON purchase_items
FOR EACH ROW
EXECUTE FUNCTION update_total_amount();

INSERT INTO purchase_orders (id, supplier_id) 
VALUES ('96fd6a2e-137c-454c-9386-978fac86e957' , (SELECT id FROM people WHERE first_name = 'John')) 
RETURNING id;

INSERT INTO purchase_items (purchase_order_id, item_id, quantity, price_per_unit, purchase_type)
VALUES
('96fd6a2e-137c-454c-9386-978fac86e957', (SELECT id FROM items WHERE sku = 'SKU001'), 10, 5.00, 'whole'),
('96fd6a2e-137c-454c-9386-978fac86e957', (SELECT id FROM items WHERE sku = 'SKU002'), 20, 0.50, 'unit');

-- This will set the `created_at` column on create and `updated_at` column on every update
CREATE OR REPLACE FUNCTION handle_times()
    RETURNS trigger AS
    $$
    BEGIN
    IF (TG_OP = 'INSERT') THEN
        NEW.created_at := now();
        NEW.updated_at := now();
    ELSEIF (TG_OP = 'UPDATE') THEN
        NEW.created_at = OLD.created_at;
        NEW.updated_at = now();
    END IF;
    RETURN NEW;
    END;
    $$ language plpgsql;

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON items
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON categories
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON units
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON inventory
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON locations
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON suppliers
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON people
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();