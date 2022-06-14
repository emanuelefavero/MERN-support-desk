require('dotenv').config()
const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 8000

const app = express()

// BODY PARSER (allows to accept json and urlencoded data in the http request)
// '''req.body'''
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    // ADD res.status(200) SENDS 200 CODE TO THIS GET REQUEST
    res.status(200).json({ message: 'Welcome to the support desk API' })
})

// Routes
// SINCE WE EXPORTED router INSIDE userRoutes WE CAN IMPORT router.post HERE
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`server start on port ${PORT}`))
