const express = require('express')
const { connectDb } = require('./db')
const { port, db, apiUrl } = require('./config')
const axios = require('axios')

const app = express()

const startServer = () => {
  app.listen(port, () => {
    console.log(`Auth server listening on port ${port}`)
    console.log(`Auth database running on  ${db}`)
  })
}

app.get('/test', (req, res) => {
  res.send('Auth working')
})

app.get('/api/user', (req, res) => {
  res.json({
    id: '1234',
    email: 'foo@gmail.com',
  })
})

app.get('/test-api-data', (req, res) => {
  axios
    .get(apiUrl + '/test-api-data')
    .then((response) => {
      res.json({
        testData: response.data,
      })
    })
    .catch((err) => console.log(err))
})

connectDb()
  .on('error', () => console.log('error'))
  .on('disconnected', connectDb)
  .once('open', startServer)
