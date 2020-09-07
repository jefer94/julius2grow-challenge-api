import mongoose from 'mongoose'

function clearCollections() {
  for (var collection in mongoose.connection.collections) {
    mongoose.connection.collections[collection].remove(function() {});
  }
}

/** Database connection. */
export default function db(connection = 'mongodb://localhost/choco'): void {
  if (process.env.NODE_ENV !== 'test')
    mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
  else {
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(`${connection}-test`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) throw err;
        return clearCollections()
      });
    }
    else return clearCollections()
  }
}
