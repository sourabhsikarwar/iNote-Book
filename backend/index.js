const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

connectToMongo();

const app = express()
const port = 5000 || process.env.PORT;

app.use(express.json());
app.use(cors())

// available routes 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello Sourabh!')
})

app.listen(port, () => {
  console.log(`iNotebook Backend listening on port ${port}`)
})