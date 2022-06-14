const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// NOTE: Protect private routes with json web token and jwt secret
const protect = asyncHandler(async (req, res, next) => {
    let token

    // if authorization in header and the authorization is a Bearer Token (which always starts with 'Bearer')
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1] // ['Bearer', TOKEN]
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Get user from token
            // exclude password
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized')
    }
})

module.exports = { protect }
