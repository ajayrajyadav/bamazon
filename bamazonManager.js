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


const managerOptions = {
    "View Products": viewProducts,
    "View Low Inventory": viewLowInventory,
    "Add to Inventory": addInventory,
    // "Add New Product": addNewProduct,
    "back to Main Menu": backToMainMenu,
};

function backToMainMenu(callback) {
    callback();
}

// function showManagerMenu(options, callback) {
//     inquirer.prompt([
//         {
//             name: 'selectedOption',
//             type: 'list',
//             choices: Object.keys(options)
//         }
//     ])
//         .then(function (selection) {
//             const behavior = options[selection.selectedOption];
//             behavior(callback)
//         })

// }

function printManagerOptions(callback) {
    // showManagerMenu(managerOptions, callback)
    mainMenu.showMainMenu(managerOptions,callback)
}

// printManagerOptions();

module.exports = {
    printManagerOptions: printManagerOptions
};

