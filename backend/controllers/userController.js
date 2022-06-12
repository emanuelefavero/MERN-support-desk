const registerUser = (req, res) => {
    res.send('Register Route')
}

const loginUser = (req, res) => {
    res.send('Login User')
}

module.exports = {
    registerUser,
    loginUser,
}
