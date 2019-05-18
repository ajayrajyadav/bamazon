const dbQueries = require('./dbQueries');
const mainMenu = require('./mainMenu');
const bamazonCustomer = require('./bamazonCustomer');
const bamazonManager = require('./bamazonManager');
const bamazonExec = require('./bamazonExecutive');
const addItem = require('./addItem');


function selectAllRecords(callback) {
  dbQueries.selectAllRecords(function(error, data) {
    console.log(data);

    callback(error, data);
  });
}

// function addNewItem(callback) {
//   addItem.displayNewItemMenu(callback);
// }

function showItems(callback) {
  bamazonCustomer.displayInventory(function(){
    bamazonCustomer.purchase(callback);
  });
  // addItem.displayNewItemMenu(callback);
}

function displayCustomerMenu(callback){
  bamazonCustomer.printCustomerOptions(callback)
}


function displayManagerMenu(callback){
  bamazonManager.printManagerOptions(callback)
}

function displayExecMenu(callback){
  bamazonExec.printExecutiveOptions(callback)
}

function exit(callback) {
  callback(null, null);
  process.exit();
}

// const menuOptions = {
//   'Add Item': addNewItem,
//   'Show Options': selectAllRecords,
//   'Exit': exit
// };

const menuOptions = {
  "Customer": displayCustomerMenu,
  "Manager": displayManagerMenu,
  "Executive": displayExecMenu,
  "Exit": exit
};

function showMainMenu(error) {
  if(error) {
    console.log(error);
  } else {
    mainMenu.showMainMenu(menuOptions, showMainMenu);
  }
}

showMainMenu();
