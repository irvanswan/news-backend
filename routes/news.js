const route = require('express').Router()
const newsController = require('../controllers/newsController')
const verify = require('../helpers/verifyToken')
const formUpload = require('../helpers/formUpload')

route.post('/add-news/:id', verify, formUpload.uploadPoster, newsController.addNews)
route.get('/', newsController.getNews)
route.patch('/edit-news/:id', verify, formUpload.uploadPoster, newsController.updateNews)
route.delete('/delete-news/:id', verify, newsController.deleteNews)
route.get('/search', newsController.searchNews)

module.exports = route