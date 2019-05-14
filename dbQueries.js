const dbConnection = require('./dbConnection');

function selectAllRecords(callback) {
  dbConnection.query('SELECT item_id, product_name, price FROM Products', callback);
}

function doQuery(queryString, callback){
  dbConnection.query(queryString, callback)
}

function addNewItem(itemData, callback) {
  console.log(itemData);
  dbConnection.query(
    'INSERT INTO auctions ' +
    '(item_name, category, starting_bid, highest_bid) ' +
    'values (?, ?, ?, ?)',
    [itemData.name, itemData.category, itemData.startingBid, 0],
    callback
    );
}

module.exports = {
  addNewItem: addNewItem,
  selectAllRecords: selectAllRecords,
  doQuery: doQuery
};
