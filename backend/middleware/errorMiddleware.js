const errorHandler = (err, req, res, next) => {
    // set statusCode to res.statusCode value if res.statusCode exists,
    // if not set to 500
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message,
        // if we are not in production, show error stack trace
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // ***
    })
}

module.exports = { errorHandler }

// *** Stack trace:
// The stack trace information identifies where in the program the error occurs
