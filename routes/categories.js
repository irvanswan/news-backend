const route = require('express').Router()
const categoryController= require('../controllers/categoryController')
const formUpload = require('../helpers/formUpload')
const verify = require('../helpers/verifyToken')

route.get('/', categoryController.getCategory)
route.post('/add-news/:id', verify, formUpload.uploadCategoryPoster, categoryController.addCategory)
module.exports = route
