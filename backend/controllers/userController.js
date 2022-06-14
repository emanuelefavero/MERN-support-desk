// add async functionality to express
// '''npm i express-async-handler'''
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

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
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
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
    res.send('Login Route')
})

module.exports = {
    registerUser,
    loginUser,
}
