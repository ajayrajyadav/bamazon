var inquirer = require("inquirer");
var colors = require("colors/safe")
var table = require('cli-table');
const boxen = require('boxen');
// const dbConnection = require('./dbConnection');
const dbQueries = require('./dbQueries');
const bamazonCustomer = require('./bamazonCustomer');
const mainMenu = require('./mainMenu');


function viewProducts(callback) {
    bamazonCustomer.displayInventory(function () {
        mainMenu.showMainMenu(managerOptions, "Manager Menu" , callback);
    });
}

function viewLowInventory(callback) {
    let query = "SELECT * FROM products WHERE stock_quantity < 5"
    dbQueries.doQuery(query, function (error, data) {
        printTable(data, function () {
            mainMenu.showMainMenu(managerOptions, "Manager Menu" , callback);
        });
    })
}
function viewInventoryForManager(callback) {
    dbQueries.doQuery('SELECT * FROM products', function (error, data) {
        printTable(data, callback);
    });
}

function printTable(result, callback) {
    var displayTable = new table({
        head: ["Item ID#", "Product Name", "Department", "Price", "Stock Qty"],
        style: {
            head: ["red"],
            compact: false,
            colAligns: ["center"],
        }
    });

    for (let i = 0; i < result.length; i++) {
        displayTable.push(
            [result[i].item_id, result[i].product_name, result[i].department_name, result[i].price, result[i].stock_quantity]
        )
    }
    console.log("\n")
    console.log(displayTable.toString());
    console.log("\n");
    callback();
}
//adding new inventory
function addInventory(callback) {
    bamazonCustomer.displayInventory(function () {
        addInventoryhelper(callback);
    });
}

function addInventoryhelper(callback) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'What is the ID number of the product you want to add inventory for',
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many items do you want to add to the inventory?',
            validate: validateInput,
            filter: Number
        }
    ])
        .then(function (answer) {
            let querySelect = "SELECT * FROM products WHERE item_id =" + answer.item_id
            let queryUpdate = "UPDATE products SET stock_quantity = stock_quantity + " + answer.quantity + " WHERE item_id = " + answer.item_id;
            dbQueries.doQuery(queryUpdate, function (error, data) {
                if (error) { throw new Error("database error: " + error) }
                else {
                    console.log("Updated prodcut List")
                    viewInventoryForManager(function () {
                        mainMenu.showMainMenu(managerOptions, "Manager Menu" , callback);
                    })
                    // callback();
                }
            })
        })
}

function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return "Please enter a whole non-zero number.";
    }
}

function addNewProduct(callback) {
    getDepartments(callback);
    // addNewProductHelper(callback);
}



function getDepartments(callback) {
    let queryString = "SELECT DepartmentName FROM departments";
    var departments = [];
    dbQueries.doQuery(queryString, function (error, data) {
        if (error) {
            throw new Error(error);
        }
        else {
            data.forEach(element => {
                departments.push(element.DepartmentName);
            });
            addNewProductHelper(departments, callback)
        }
    })
}

function addNewProductHelper(departments, callback) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'productName',
            message: 'Please enter the name of the prodcut.',
        },
        {
            type: "list",
            name: "departmentName",
            message: "enter department name",
            choices: departments
        },
        {
            type: "input",
            name: "price",
            message: "enter price for this product",
            filter: Number
        },
        {
            type: "input",
            name: "qty",
            message: "enter quantity for this product",
            filter: Number
        }
    ])
        .then(function (answer) {
            console.log(answer);
            let queryInsert = 'INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) VALUES (\"' + answer.productName +'\",\"' + answer.departmentName + '\",' +answer.price + ',' + answer.qty + ', 0.0)' 
            dbQueries.doQuery(queryInsert, function(error, data){
                if (error) { throw new Error("database error: " + error) }
                else{
                    console.log(boxen("New prodcut "+ answer.productName + " has been added"));
                    viewInventoryForManager(function(){
                        mainMenu.showMainMenu(managerOptions, "Manager Menu" ,callback)
                    })
                }
            });          
        })
        // callback();
}

//question menu
const managerOptions = {
    "View Products": viewProducts,
    "View Low Inventory": viewLowInventory,
    "Add to Inventory": addInventory,
    "Add New Product": addNewProduct,
    "back to Main Menu": backToMainMenu,
};

function backToMainMenu(callback) {
    callback();
}

function printManagerOptions(callback) {
    mainMenu.showMainMenu(managerOptions, "Manager Menu" , callback)
}

module.exports = {
    printManagerOptions: printManagerOptions
};

