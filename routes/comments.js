const route = require('express').Router()
const verify = require('../helpers/verifyToken')
const commentsController = require('../controllers/commentsController')

route.post('/:id', verify, commentsController.sendComment)
route.delete('/:id', verify, commentsController.deleteComment)
route.get('/:id', commentsController.getComment)

module.exports = route
