const connectToMongo = require('./db')
const express = require('express')

connectToMongo();

const app = express()
const port = 3000 || process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello Sourabh!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})