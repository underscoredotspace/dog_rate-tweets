const express = require('express')
const app = express()

const Tweets = require('./model/Tweets')
const twitter = new Tweets

app.get('/', (req, res) => {
  twitter.get((error, tweets) => {
    if (error) {
      res.status(500).json({error})
      return
    }

    res.json(tweets)
  })
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})