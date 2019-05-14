var inquirer = require("inquirer");
var colors = require("colors/safe")
var table = require('cli-table');
// const dbConnection = require('./dbConnection');
const dbQueries = require('./dbQueries');

function displayInventory(callback){

    dbQueries.doQuery('SELECT item_id, product_name, price FROM Products', function(error, data) {
        printTable(data, callback);
    })

    // dbQueries.selectAllRecords(function(error, data) {
    //     // console.log(data);
    //     printTable(data, callback);
    //     // callback(error, data);
    // });
    // dbConnection.query("SELECT item_id, product_name, price FROM Products", callback);
    // console.log(data);
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
    console.log("\n")
    
    purchase(callback);
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
        // console.log(answer);
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
    console.log(answer);
    let queryString = "SELECT * FROM products WHERE item_id=" + answer.item_id
    dbQueries.doQuery(queryString, function(error, data) {
        updateStock(data, answer, callback);
    })

    // callback();
}

function updateStock(data, value, callback){
    if (data[0].stock_quantity < value.quantity) {
        console.log("That product is out of stock, please pick again. \n")
        main();
    } else if (data[0].stock_quantity >= value.quantity) {
        console.log(value.quantity + " items purchased of " + data[0].product_name + " at $" + data[0].price)
        var saleTotal = data[0].price * value.quantity;
        console.log("Your Total is $" + saleTotal)
        let newQty = data[0].stock_quantity - value.quantity;
        updateStockInDatabase(newQty, value, callback);
    }


    // callback();
}

function updateStockInDatabase(newQty, value, callback){
    console.log(callback)
    callback();
}




module.exports = {
    displayInventory: displayInventory
  };