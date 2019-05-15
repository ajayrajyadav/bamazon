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
    
}


const managerOptions = {
    "View Products": viewProducts,
    "View Low Inventory": viewLowInventory,
    // "Add to Inventory": addInventory,
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

