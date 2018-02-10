// The MongoDB implementation of tasks

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://127.0.0.1:27017';
 
// Update Database and Collection names.
const dbName = 'your_db';
const collName = 'your_collection';

// Insert a document into the collection

const insertDocument = function(db, doc, callback) {
  db.collection(collName).insertOne(doc, function(err, result) {
    assert.equal(null, err);
    assert.equal(1, result.insertedCount);
    callback(result);
  });
}

function addTask(task) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
 
    const db = client.db(dbName);
    insertDocument(db, task, function() {
      client.close();
    });
  }); 
}

var MongoDBTasks = {
  addTask: addTask,
}

module.exports = MongoDBTasks;
