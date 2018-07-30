require('dotenv').config()

const mongo = require('./db')
mongo.connect(collection => { 
  getTweets(collection)
})

const Twitter = require('./model/Twitter')
const twitter = new Twitter
const bigInt = require('big-integer')

function getTweets(db) {
  db.find({}).sort({id_str: 1}).toArray().then(oldest => {
    const max_id = oldest.length>0 ? decrease_id(oldest[0].id_str) : null
  
    twitter.get((error, tweets) => {
      if (error) { throw(error) }
      
      db.insertMany(tweets).then(error => {
        const date = new Date()
        const time = `${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }`
        console.log(`Got ${ tweets.length } tweets at ${ time }`)
        setTimeout(() => { getTweets(db) }, 5000)
      }).catch(error => {
        console.log(error)
      })
    }, max_id)
  })
}

function decrease_id(id_str) {
  const id = bigInt(id_str)
  return id.subtract(1)
}