const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const AuthRouter = require('./routes/AuthRouter')
const PostRouter = require('./routes/PostRouter')

const PORT = process.env.PORT || 3001

const db = require('./db')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(fileUpload())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(`${__dirname}/dist`))

app.use('/api/auth', AuthRouter)
app.use('/api/posts', PostRouter)

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`)
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
