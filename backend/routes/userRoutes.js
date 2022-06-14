const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getMe,
} = require('../controllers/userController')

// NOTE: to protect a route, just add protect as a second argument in router
const { protect } = require('../middleware/authMiddleware')

// MAIN URL ROUTE /api/users/ (SEE server.js)
router.post('/', registerUser) // /api/users/
router.post('/login', loginUser) // /api/users/login
router.get('/me', protect, getMe) // /api/users/me NOTE: PROTECTED

// EXPORT router
module.exports = router
