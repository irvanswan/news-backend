const route = require('express').Router()
const authController = require('../controllers/authController')
const hashing = require('../helpers/hashing')
const PasswordGenerator = require('../helpers/passwordGenerator')

route.post('/login', authController.userLogin)
route.post('/register', hashing, authController.userRegister)
route.get('/google', PasswordGenerator, hashing, authController.userGoogle)

module.exports = route