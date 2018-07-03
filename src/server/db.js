const mongo_addr = process.env.MONGO_ADDR
const mongo = require('mongodb').MongoClient
if (!mongo_addr) {throw (new Error('MONGO_ADDR env var is missing'))}

function connect(callback) {
  mongo.connect(mongo_addr, { useNewUrlParser: true })
  .then(client => {
    callback(client.db().collection('tweets'))
    console.log('connected to mongo database')
  })
  .catch(err => console.error(`mongoose error: ${err}`))  
}

module.exports = {connect}