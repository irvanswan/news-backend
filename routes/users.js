const route = require('express').Router()
const verifyToken = require('../helpers/verifyToken')
const usersController = require('../controllers/usersController')
const formUpload = require('../helpers/formUpload')
const compression = require('compression')

route.patch('/update-user/:id',verifyToken, formUpload.uploadAvatar, usersController.updateUser)
route.patch('/:id', verifyToken, formUpload.uploadBackground, usersController.updateBackground)
route.get('/' ,usersController.getUser)
route.use(compression());
module.exports = route