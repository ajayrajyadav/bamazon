
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(20,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    product_sales DECIMAL(20,2) NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO Products(product_name, department_name, price, stock_quantity, product_sales)
VALUES 
    ("Eggs", "grocery", 1.99, 12, 0.0),
    ("Horizen Milk", "grocery", 6.99, 24, 0.0),
    ("Sony Playstation 4", "electronics", 199.99, 5, 0.0),
    ("Microsoft Xbox 1 ", "electronics", 179.99, 7, 0.0),
    ("iPad", "electronics", 399.99, 18, 0.0),
    ("Bicycle", "sporting goods", 599.99, 2, 0.0),
    ("Football", "sporting goods", 9.99, 49, 0.0),
    ("Harry Potter and Chamber of Secrets", "books", 9.99, 69, 0.0),
    ("Game of Thrones", "books", 19.99, 33, 0.0),
    ("Fight Club", "books", 11.99, 6, 0.0),
    ("Fight Club", "dvds", 13.99, 36, 0.0),  
    ("Office Space", "dvds", 9.99, 21, 0.0),
    ("Dark Side of the Moon", "music", 11.55, 15, 0.0);

CREATE TABLE Departments(
    DepartmentID INTEGER AUTO_INCREMENT PRIMARY KEY,
    DepartmentName VARCHAR(30),
    OverHeadCosts DOUBLE(10,2),
    TotalSales DOUBLE(10,2));

INSERT INTO Departments(DepartmentName, OverHeadCosts, TotalSales)
VALUES 
    ("grocery", 10500.00, -10000.00), -- More fun stuff (refunds for days!) ;)
    ("electronics", 25000.00, 0.00),
    ("sporting goods", 15000.00, 0.00),
    ("books", 5000.00, 0.00),
    ("dvds", 20000.00, 0.00),
    ("music", 7500.00, 0.00);
    
-- This creates the alias table TotalProfits that will exist only when requested by the executive 
SHOW TABLES;
CREATE VIEW bamazon.TotalProfits AS SELECT DepartmentId, DepartmentName, OverHeadCosts, TotalSales, TotalSales-OverHeadCosts AS TotalProfit FROM Departments;
