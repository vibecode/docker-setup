const express = require('express')
const { connectDb } = require('./db')
const { port, db, authUrl } = require('./config')
const mongoose = require('mongoose')
const axios = require('axios')

const app = express()
const postSchema = new mongoose.Schema({
  name: String,
})

const Post = mongoose.model('Post', postSchema)

const startServer = () => {
  app.listen(port, () => {
    console.log(`Api server listening on port ${port}`)
    console.log(`Database running on  ${db}`)

    Post.find(function (err, posts) {
      if (err) {
        return console.log(err)
      }

      console.log('posts', posts)
    })

    const silence = new Post({
      name: 'Silence',
    })

    silence.save(function (err, savedPost) {
      if (err) return console.log(err)

      console.log('savedPost', savedPost)
    })
  })
}

app.get('/test', (req, res) => {
  res.send('api working')
})

app.get('/test-auth', (req, res) => {
  axios
    .get(authUrl + '/user')
    .then((response) => {
      res.json({
        currentUser: response.data,
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

app.get('/api/test-api-data', (req, res) => {
  res.json({
    testData: { lol: 'kek' },
  })
})

connectDb()
  .on('error', () => console.log('error'))
  .on('disconnected', connectDb)
  .once('open', startServer)
