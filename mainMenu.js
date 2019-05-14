const inquirer = require('inquirer');

function showMainMenu(options, callback) {
  const userOptions = Object.keys(options);

  inquirer.prompt([
    {
      name: 'selectedOption',
      type: 'list',
      choices: userOptions
    }
  ])
  .then(function(selection){
    const behavior = options[selection.selectedOption];
    console.log(options)
    behavior(callback);
  });
}

module.exports = {
  showMainMenu: showMainMenu
};
