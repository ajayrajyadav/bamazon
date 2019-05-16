var inquirer = require("inquirer");
var colors = require("colors/safe")
var table = require('cli-table');
const boxen = require('boxen');
// const dbConnection = require('./dbConnection');
const dbQueries = require('./dbQueries');
const bamazonCustomer = require('./bamazonCustomer');
const mainMenu = require('./mainMenu');


function viewProducts(callback) {
    bamazonCustomer.displayInventory(function(){
        mainMenu.showMainMenu(managerOptions, callback);
    });
}

function viewLowInventory(callback){
    let query = "SELECT * FROM products WHERE stock_quantity < 5"
    dbQueries.doQuery(query, function(error, data) {
        printTable(data, function(){
            mainMenu.showMainMenu(managerOptions, callback);
        });
    })
}
function viewInventoryForManager(callback){
    dbQueries.doQuery('SELECT * FROM products', function(error, data) {
        printTable(data, callback);
    });
}

function printTable(result, callback){
    var displayTable = new table({
        head: ["Item ID#", "Product Name",  "Department", "Price", "Stock Qty"],
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
function addInventory(callback){
    bamazonCustomer.displayInventory(function(){
        addInventoryhelper(callback);
    });
}

function addInventoryhelper(callback){
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
    .then(function(answer){
        let querySelect = "SELECT * FROM products WHERE item_id ="+ answer.item_id
        let queryUpdate = "UPDATE products SET stock_quantity = stock_quantity + "+ answer.quantity + " WHERE item_id = " + answer.item_id;
        dbQueries.doQuery(queryUpdate, function(error, data){
            if (error){ throw new Error("database error: "+error)}
        else{
            console.log("Updated prodcut List")
            viewInventoryForManager(function(){
                mainMenu.showMainMenu(managerOptions, callback);
            })
            // callback();
        }
        })
    })
}

function validateInput(value){
    var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return "Please enter a whole non-zero number.";
	}
}

function addNewProduct(callback){
    let departmentChoics = getDepartmentArray();
    console.log("inside addnewproduct: " + departmentChoics);
}

function getDepartmentArray(){
    // let queryString = "SELECT DISTINCT department_name FROM products";
    let queryString = "SELECT department_name FROM products";
    var departments = [];
    dbQueries.doQuery(queryString, function(error, data) {
        if (error)
        { 
            throw new Error(error);
        }
        else{
            data.forEach(element => {
                // console.log("Element: " + element.department_name)
                departments.push(element.department_name);
            });
            
            return departments;
        }
        console.log("Outside for loop inside else: " +departments)
        // console.log("Outside of else: " +departments)
    })
    // console.log(departments)
}

function prodcutQuestions(callback){
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
        }
    ])
    .then(function(data){
        console.log(data);
    })
}
var departments = function(){
    let queryString = "SELECT DISTINCT department_name FROM products";
    var d = [];
    dbQueries.doQuery(queryString, function(error, data) {
        if (error)
        { 
            throw new Error(error);
        }
        else{
            data.forEach(element => {
                // console.log("Element: " + element.department_name)
                d.push(element.department_name);
            });
            // console.log("Outside for loop inside else: " +departments)

            return d;
        }
        // console.log("Outside of else: " +departments)
    })
    // console.log(departments)
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
    // showManagerMenu(managerOptions, callback)
    mainMenu.showMainMenu(managerOptions,callback)
}

// printManagerOptions();

module.exports = {
    printManagerOptions: printManagerOptions
};

