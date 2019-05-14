const dbQueries = require('./dbQueries');
const mainMenu = require('./mainMenu');
const bamazonCustomer = require('./bamazonCustomer');

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
  bamazonCustomer.displayInventory(callback)
  // addItem.displayNewItemMenu(callback);
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
  // "Manager": bamazonManager,
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
