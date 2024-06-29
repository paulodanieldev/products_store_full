CREATE DATABESE db_softexpert_products;

USE db_softexpert_products;

CREATE TABLE tb_product_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE tb_products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    product_type_id INT NOT NULL,
    FOREIGN KEY (product_type_id) REFERENCES tb_product_types(id)
);

CREATE TABLE tb_taxes (
    id SERIAL PRIMARY KEY,
    product_type_id INT NOT NULL,
    tax_rate DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (product_type_id) REFERENCES tb_product_types(id)
);

CREATE TABLE tb_sales (
    id SERIAL PRIMARY KEY,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    total_tax DECIMAL(10, 2) NOT NULL
);

CREATE TABLE tb_sale_items (
    id SERIAL PRIMARY KEY,
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (sale_id) REFERENCES tb_sales(id),
    FOREIGN KEY (product_id) REFERENCES tb_products(id)
);