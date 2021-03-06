var inquirer = require("inquirer");
var colors = require("colors/safe")
var table = require('cli-table');
const boxen = require('boxen');
// const dbConnection = require('./dbConnection');
const dbQueries = require('./dbQueries');
const mainMenu = require('./mainMenu');


function calltheDatabase(callback){
    displayInventory(function(){
        mainMenu.showMainMenu(customerOptions, "Customer Menu",callback);
    })
}

function displayInventory(callback){
    dbQueries.doQuery('SELECT item_id, product_name, price FROM Products', function(error, data) {
        printTable(data, callback);
    })
}


function printTable(result, callback) {
    var displayTable = new table({
        head: ["Item ID#", "Product Name", "Price"],
        style: {
            head: ["blue"],
            compact: false,
            colAligns: ["center"],
        }
    });

    for (let i = 0; i < result.length; i++) {
        displayTable.push(
            [result[i].item_id, result[i].product_name, result[i].price]
        )
    }
    console.log("\n")
    console.log(displayTable.toString());
    console.log("\n");
    callback();
}

function purchase(callback) {
    inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			validate: validateInput,
			filter: Number
		}
	])
    .then(function(answer){
        queryDatabaseForSingleItem(answer, callback)
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

function queryDatabaseForSingleItem(answer, callback){
    let queryString = "SELECT * FROM products WHERE item_id=" + answer.item_id
    dbQueries.doQuery(queryString, function(error, data) {
        updateStock(data, answer, callback);
    })
}

function updateStock(data, value, callback){
    let department = data[0].department_name;
    console.log("department_name:" + department);
    
    if (data[0].stock_quantity < value.quantity) {
        console.log(boxen("That product is out of stock, please pick again. \n", {padding: 1}))
        mainMenu.showMainMenu(customerOptions, "Customer Menu", callback)
    } else if (data[0].stock_quantity >= value.quantity) {
        var saleTotal = data[0].price * value.quantity;
        console.log(boxen(value.quantity + " items purchased of " + data[0].product_name + " priced at $" + data[0].price +" each\n" + "Your Total is $" + saleTotal, {padding: 1}))
        let newQty = data[0].stock_quantity - value.quantity;
        
        updateStockInDatabase(newQty, value, department, saleTotal, callback);
    }
}

function updateStockInDatabase(newQty, value, departmentName, saleTotal, callback){
    let queryString = "UPDATE products SET stock_quantity= "+ newQty +" WHERE item_id= "+ value.item_id;
    
    dbQueries.doQuery(queryString, function(error, data) {
        if (error){ throw new Error()}
        else{
            updateTotalSales(departmentName, saleTotal, callback)
        }
    })
    // callback();
}

function updateTotalSales(departmentName, saleTotal, callback){
    let queryString = "UPDATE departments SET totalSales = totalSales + " + saleTotal + " WHERE departmentName = \"" + departmentName + "\"";
    dbQueries.doQuery(queryString, function(error, data) {
        if (error){ throw new Error("this is the error: " + error)}
        else{
            mainMenu.showMainMenu(customerOptions, "Customer Menu", callback)
        }
    })
}

//question menu
const customerOptions = {
    "Display Inventory": calltheDatabase,
    "Purchase an Item": purchase,
    "Back to Main Menu": backToMainMenu
};

function backToMainMenu(callback) {
    callback();
}

function printCustomerOptions(callback) {
    mainMenu.showMainMenu(customerOptions, "Customer Menu", callback)
}

module.exports = {
    printCustomerOptions : printCustomerOptions,
    displayInventory: displayInventory,
    purchase : purchase
  };