const Twit = require('twit')

require('dotenv').config()

const credentials = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET
}

class Tweets {
  constructor() {
    this.credentials = Object.assign({app_only_auth:true}, credentials)
    this.twit = new Twit(this.credentials)
    this.options = {
      screen_name: 'dog_rates', 
      count: 100,
      trim_user: true,
      tweet_mode: 'extended'
    }
  }

  get(callback, since_id) {
    const options = Object.assign({}, this.options)
    if (since_id) { options = Object.assign(options, {since_id}) }
    this.twit.get('statuses/user_timeline', options, (err, data, response) => {
      if (err) {
        callback(err)
        return
      }

      this.squash(data).then(tweets_short => {
        callback(null, tweets_short)
      })
    })
  }

  squash(tweets) {
    return new Promise(function(resolve) {
      const tweets_short = tweets.map(tweet => {
        const {created_at, id_str, full_text, retweet_count, favorite_count} = tweet
        const tweet_short = {created_at, id_str, full_text, retweet_count, favorite_count}

        if (tweet.extended_entities && tweet.extended_entities.media) {
          tweet_short.media = tweet.extended_entities.media.map(pic => {
            const media =  {
              id: pic.id_str, 
              url: pic.media_url_https,
              type: pic.type
            }

            if (pic.video_info) {
              media.video_info = pic.video_info
            }

            return media
          })
        }
        return tweet_short
      })

      resolve(tweets_short)
    })
  }
}

module.exports = Tweets