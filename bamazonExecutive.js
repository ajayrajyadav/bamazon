var inquirer = require("inquirer");
var colors = require("colors/safe")
var table = require('cli-table');
const boxen = require('boxen');
// const dbConnection = require('./dbConnection');
const dbQueries = require('./dbQueries');
const bamazonCustomer = require('./bamazonCustomer');
const mainMenu = require('./mainMenu');

function ViewProductSales(callback) {
    console.log("in viewProduct function");
    callback();
    // bamazonCustomer.displayInventory(function () {
    //     mainMenu.showMainMenu(managerOptions, callback);
    // });
}

function createDepartment(callback) {
    console.log("in createDepartment function: ");
    callback();
    // bamazonCustomer.displayInventory(function () {
    //     mainMenu.showMainMenu(managerOptions, callback);
    // });
}

const executiveOptions = {
    "View Product Sales by Department" : ViewProductSales,
    "Create New Department": createDepartment,
    "Back to Main Menu": backToMainMenu
}

function backToMainMenu(Callback){
    Callback();
}
function printExecutiveOptions(callback){
    mainMenu.showMainMenu(executiveOptions, callback);
}

module.exports = {
    printExecutiveOptions: printExecutiveOptions
}