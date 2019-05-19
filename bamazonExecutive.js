var inquirer = require("inquirer");
var table = require('cli-table');
const boxen = require('boxen');
const dbQueries = require('./dbQueries');
const bamazonCustomer = require('./bamazonCustomer');
const mainMenu = require('./mainMenu');

function ViewProductSales(callback) {
    let query = "SELECT * FROM totalprofits";
    dbQueries.doQuery(query, function (error, data) {
        printTable(data, function () {
            mainMenu.showMainMenu(executiveOptions, "Executive Menu",callback);
        });
    })
}

function printTable(result, callback) {
    var displayTable = new table({
        head: ['Department ID', 'Department Name', 'Overhead Cost', 'Total Sales', 'Total Profit'],
        style: {
            head: ["red"],
            compact: false,
            colAligns: ["center"],
        }
    });

    for (let i = 0; i < result.length; i++) {
        displayTable.push(
            [result[i].DepartmentID, result[i].DepartmentName, result[i].OverHeadCosts, result[i].TotalSales, result[i].TotalProfit]
        )
    }
    console.log("\n")
    console.log(displayTable.toString());
    console.log("\n");
    callback();
}

function createDepartment(callback) {
    addCustomerHelper(callback);
}

function addCustomerHelper(callback){
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'Please enter the name of the new department you would like to add.',
        },
        {
            type: 'input',
            name: 'overheadCost',
            message: 'What are the overhead costs for this department?',
            filter: Number
        }
    ])
    .then(function (answer){
        let queryInsert = "INSERT INTO departments(DepartmentName, OverHeadCosts, TotalSales) VALUES (\"" + answer.deptName + "\"," + answer.overheadCost + ", 0.0)";
        dbQueries.doQuery(queryInsert, function (error, data) {
            if (error) { throw new Error("database error: " + error) }
            else {
                console.log(boxen("Updated department List"))
                ViewProductSales(callback);
                // ViewProductSales(function () {
                //     mainMenu.showMainMenu(executiveOptions, "Executive Menu",callback);
                // });
            }
        });
    });
}

const executiveOptions = {
    "View Product Sales by Department" : ViewProductSales,
    "Create New Department": createDepartment,
    "Back to Main Menu": backToMainMenu
}

function backToMainMenu(callback) {
    callback();
}
function printExecutiveOptions(callback){
    mainMenu.showMainMenu(executiveOptions, "Executive Menu",callback);
}

module.exports = {
    printExecutiveOptions: printExecutiveOptions
}