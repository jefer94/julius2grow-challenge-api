#!/bin/node

const mongoose = require('mongoose')

function clearCollections() {
  for (var collection in mongoose.connection.collections) {
    mongoose.connection.collections[collection].remove(function() {})
  }
}

/** Database connection. */
function db(connection = 'mongodb://localhost/choco') {
  mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err
    return clearCollections()
  })
}

db()
