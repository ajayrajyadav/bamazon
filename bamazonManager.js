var inquirer = require("inquirer");
var colors = require("colors/safe")
var table = require('cli-table');
const boxen = require('boxen');
// const dbConnection = require('./dbConnection');
const dbQueries = require('./dbQueries');
const bamazonCustomer = require('./bamazonCustomer');


function viewProducts(callback) {
    bamazonCustomer.displayInventory(callback);
}


const managerOptions = {
    "View Products": viewProducts,
    // "View Low Inventory": viewLowInventory,
    // "Add to Inventory": addInventory,
    // "Add New Product": addNewProduct,
    "back to Main Menu": backToMainMenu,
};

function backToMainMenu(callback) {
    callback();
}

function showManagerMenu(options, callback) {
    inquirer.prompt([
        {
            name: 'selectedOption',
            type: 'list',
            choices: Object.keys(options)
        }
    ])
        .then(function (selection) {
            const behavior = options[selection.selectedOption];
            behavior(callback)
        })

}

function printManagerOptions(callback) {
    showManagerMenu(managerOptions, callback)
}

// printManagerOptions();

module.exports = {
    printManagerOptions: printManagerOptions
};

