const inquirer = require('inquirer');
const dbQueries = require('./dbQueries');

function displayNewItemMenu (callback){
  inquirer
  .prompt([
    {
      name: 'name',
      description: 'Item Name'
    },
    {
      name: 'category',
      description: 'Item Category'
    },
    {
      name: 'startingBid',
      description: 'Starting Bid',
      validate: function(value) {
        const parsedValue = parseFloat(value);

        return !isNaN(parsedValue) && parsedValue >= 0;
      }
    }
  ])
  .then(function(results) {
    dbQueries.addNewItem(results, callback);
  });
}

module.exports = {
  displayNewItemMenu: displayNewItemMenu
};
