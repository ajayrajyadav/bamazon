const mainMenu = require('./mainMenu');
const bamazonCustomer = require('./bamazonCustomer');
const bamazonManager = require('./bamazonManager');
const bamazonExec = require('./bamazonExecutive');


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
    mainMenu.showMainMenu(menuOptions, "Main Menu",showMainMenu);
  }
}

showMainMenu();
