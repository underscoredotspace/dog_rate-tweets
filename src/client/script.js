function getTweets() {
  return fetch('/api/tweets').then(res => res.json())
}

function newTweetElement(tweet, parentElement) {
  const template = document.querySelector('template#tweet')
  const tweetElement = document.importNode(template.content, true)

  const textKeys = ["created_at", "id_str", "full_text","retweet_count", "favorite_count"]

  for (const key of textKeys) {
    const element = tweetElement.querySelector(`.${key}`)
    element.textContent = tweet[key]
  }

  if (tweet.media) {
    const photos = tweet.media.filter(media => media.type==='photo')
    const mediaContainer = tweetElement.querySelector('.media')
    photos.forEach(photo => {
      const img = document.createElement('img')
      img.src = photo.url
      mediaContainer.appendChild(img)
    })
  }

  parentElement.appendChild(tweetElement)
}

const parentElement = document.body

getTweets().then(tweets => {
  tweets.forEach(tweet => {
    newTweetElement(tweet, parentElement)
  })
})