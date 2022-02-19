const connectToMongo = require('./db')
const express = require('express')

connectToMongo();

const app = express()
const port = 5000 || process.env.PORT;

app.use(express.json());

// available routes 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello Sourabh!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})