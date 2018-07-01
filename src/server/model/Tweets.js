const Twit = require('twit')

class Tweets {
  constructor(credentials) {
    this.credentials = Object.assign({app_only_auth:true}, credentials)
    this.twit = new Twit(this.credentials)
    this.options = {
      screen_name: 'dog_rates', 
      count: 10,
      trim_user: true,
      tweet_mode: 'extended'
    }
  }

  get(callback, since_id) {
    const options = Object.assign({}, this.options)
    if (since_id) { options = Object.assign(options, {since_id}) }
    this.twit.get('statuses/user_timeline', options, function(err, data, response) {
      callback(err, data)
    })
  }
}

module.exports = Tweets