# BAMazon

Created during Week 10 of Rutgers Coding Bootcamp. The goal was to create an Amazon-like store front using Node.js and MySQL.

## Getting Started

- Clone repo.
- Run command in Terminal or Gitbash 'npm install'
- Copy example.env and rename it .env, replace your own credentils.
- Run `Node index` to execute the bamazon CLI

### What this CLI does

1. `node bamazon` will start the CLI
    * Starts with Main Menu:
        * Customer
        * Manager
        * Executive
        * Exit
2. If `Customer` is selected then `Customer Menu` appears
    * `Customer Menu` options:
        * Display Inventory
        * Purchase an item
        * Back to Main Menu

    * `Display Inventory` Prints the products that are available to purchase
    * `Purchase an item` prompts customer which product they would like to purchase by ID number.

        * Asks for quantity
            * If there is a sufficient amount of the product in stock, it will return the total for that purchase.
            * However, if there is not enough of the product in stock, it will tell the user that there isn't enough of the product.
            * If the purchase goes through, it updates the stock quantity to reflect the purchase.
            * It will also update the product sales in the department table.

    * `Exit` will gracefully exit the bamazon CLI

3. If `Manager` is selected then `Manager Menu` appears
    * `Manager Menu` Options:
        * View Products 
        * View Low Inventory 
        * Add to Inventory 
        * Add New Product 
        * back to Main Menu

    * If the manager selects `View Products`, it lists all of the products in the store including all of their details.
        
    * If the manager selects `View Low Inventory`, it'll list all the products with less than five items in its StockQuantity column.

    * If the manager selects `Add to Inventory`, it allows the manager to select a product and add inventory.

    * If the manager selects `Add New Product`, it allows the manager to add a new product to the store.

    * If the manager selects `Back to Main Menu`, brings user to `Main Menu`

4. If `Executive` is selected then `Executive Menu` appears
    * `Executive Menu` Options:
        * View Product Sales by Department 
        * Create New Department 
        * Back to Main Menu

    * If the manager selects `View Product Sales by Department`, it lists the Department Sales and calculates the total sales from the overhead cost and product sales.

    * If the manager selects `Create New Department`, it allows the manager to create a new department and input current overhead costs and product sales. If there are none, by default it will set at 0.

        * If the manager selects `Back to Main Menu`, brings user to `Main Menu`
    
### `.env` parameters
    * DB_HOST = where your mysql server is being hosted
    * PORT = PORT number where your mysql server is being served at
    * DB_USER = username for your mysql server
    * DB_PASSWORD = password for the said username
    * DB_SCHEMA = your database name

---------------------

## Demo Video

* Bamazon CLI (https://youtu.be/FCpB49fmcV8)

## Technologies used
- Node.js
- Inquire NPM Package (https://www.npmjs.com/package/inquirer)
- MYSQL NPM Package (https://www.npmjs.com/package/mysql)
- CLI-Table NPM Package (https://www.npmjs.com/package/cli-table)
- boxen NPM Package (https://www.npmjs.com/package/boxen)

### Prerequisites

```
- Node.js - Download the latest version of Node https://nodejs.org/en/
- Create a MYSQL database called 'bamazon', reference seed.sql
```

## Built With

* MS Visual Code - Text Editor
* MySQLWorkbench
* iTerm

## Authors

* **Ajay Yadav** - [Ajay Yadav](https://github.com/ajayrajyadav)
