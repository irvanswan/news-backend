const crypto = require('crypto')

const PasswordGenerator = (req, res, next)=>{
    req.body.password = crypto.randomBytes(20).toString('hex');
    next()
}
module.exports = PasswordGenerator
