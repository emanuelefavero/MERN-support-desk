require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 8000

const app = express()

app.get('/', (req, res) => {
    // ADD res.status(200) SENDS 200 CODE TO THIS GET REQUEST
    res.status(200).json({ message: 'Welcome to the support desk API' })
})

app.listen(PORT, () => console.log(`server start on port ${PORT}`))
