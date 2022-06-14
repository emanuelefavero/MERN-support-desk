// add async functionality to express
// '''npm i express-async-handler'''
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// User = mongoose.model('User', userSchema)
const User = require('../models/userModel')

// --- NOTE: Register User ---
// @description Register a new user
// @route       /api/users
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    // find if user already exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        throw new Error('User already exists')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    // this will hash the req.body.password:
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    // if user is created:
    if (user) {
        // show json with user data
        // 201 - Created
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            // NOTE: the token has the id in it
            // TIP: you can go to https://jwt.io/ and paste the generated token to see the id of the user
        })
    } else {
        res.status(400) // 400 Bad Request
        throw new error('Invalid user data')
    }
})

// --- NOTE: Login User ---
// @description Login a user
// @route       /api/users/login
// @access      Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    // Check that user and password match
    if (user && (await bcrypt.compare(password, user.password))) {
        // 200 - OK
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        // 401 - Unauthorized
        res.status(401)
        throw new Error('Invalid Credentials')
    }
})

// --- NOTE: Get Current User ---
// @description Get current user
// @route       /api/users/me
// @access      Private
const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    }

    res.status(200).json(user)
})

// generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // 30 days
    })
}

// EXPORT
module.exports = {
    registerUser,
    loginUser,
    getMe,
}
