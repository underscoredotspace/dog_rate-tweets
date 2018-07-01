const express = require('express')
const app = express()

require('dotenv').config()

const credentials = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET
}

const Tweets = require('./model/Tweets')
const twitter = new Tweets(credentials)

app.get('/', (req, res) => {
  twitter.get((error, tweets) => {
    if (error) {
      res.status(500).json({error})
      return
    }

    const tweets_short = tweets.map(tweet => {
      const {created_at, id_str, full_text} = tweet
      const tweet_short = {created_at, id_str, full_text}

      if (tweet.extended_entities && tweet.extended_entities.media) {
        tweet_short.pictures = tweet.extended_entities.media
      }

      return tweet_short
    })
    res.json(tweets_short)
  })
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})