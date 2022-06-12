const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../controllers/userController')

// MAIN URL ROUTE /api/users/ (SEE server.js)
router.post('/', registerUser) // /api/users/
router.post('/login', loginUser) // /api/users/login

// EXPORT router
module.exports = router
