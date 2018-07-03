require('dotenv').config()

const mongo = require('./db')
let db
mongo.connect(collection => { db=collection })

const express = require('express')
const app = express()

app.use(express.static('src/client'))

app.get('/api/tweets', (req, res) => {
  db.find({$and: [ {media: {$exists: true}}, {"media.type": 'photo'} ]}).limit(10).toArray().then(tweets => {
    res.json(tweets)
  })
})

app.listen(3001, () => {
  console.log('http://localhost:3001')
})