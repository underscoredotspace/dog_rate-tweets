const express = require('express')
const app = express()

const credentials = {
  key: process.env.CONSUMER_KEY,
  secret: process.env.CONSUMER_SECRET
}

app.get('/', (req, res) => {
  res.send('Hi!')
})

app.listen(process.env.PORT)
