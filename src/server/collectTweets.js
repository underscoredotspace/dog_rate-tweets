require('dotenv').config()

const mongo = require('./db')
mongo.connect(collection => { 
  getTweets(collection)
})

const Twitter = require('./model/Twitter')
const twitter = new Twitter

function getTweets(db) {
  db.find({}).sort({id_str: 1}).limit(1).toArray().then(tweets => {
    const max_id = tweets.length>0?`${Number(tweets[0].id_str)-1}`:null

    twitter.get((error, tweets) => {
      if (error) { throw(error) }
      
      db.insert(tweets).then(() => {
        const date = new Date()
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        console.log(`Got ${tweets.length} tweets at ${time}`)
        setTimeout(() => {getTweets(db)}, 5000)
      })
    }, max_id)

  })
}
