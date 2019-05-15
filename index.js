const dbQueries = require('./dbQueries');
const mainMenu = require('./mainMenu');
const bamazonCustomer = require('./bamazonCustomer');
const bamazonManager = require('./bamazonManager');
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


function displayManagerMenu(callback){
  bamazonManager.printManagerOptions(callback)
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
  "Customer": showItems,
  "Manager": displayManagerMenu,
  // "Executive": bamazonExec,
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
