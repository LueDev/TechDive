const jwt = require('jsonwebtoken')

exports.cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token

    try{
        const user = jwt.verify(token, process.env.MY_SECRET)
        r
    } catch {

    }
}