const ObjectID = require('bson-objectid');

function generateId() {
  return ObjectID.generate();
}

module.exports = generateId;
