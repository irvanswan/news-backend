const formResponse = require('../helpers/formResponse')
const newsModel = require('../models/newsModel')

const newsController = {
    addNews : (req, res) =>{
        newsModel.addNews(req).then((result)=>{
            formResponse(result, res)
        }).catch((err)=>{
            formResponse(err, res)
        })
    },
    getNews : async(req, res) =>{
       await newsModel.getNews(req).then((result)=>{
            formResponse(result, res)
        }).catch((err)=>{
            formResponse(err, res)
        })
    },
    updateNews : (req, res)=>{
        newsModel.updateNews(req).then((result)=>{
            formResponse(result, res)
        }).catch((err)=>{
            formResponse(err, res)
        })
    },
    deleteNews : (req, res)=>{
        newsModel.deleteNews(req).then((result)=>{
            formResponse(result, res)
        }).catch((err)=>{
            formResponse(err, res)
        })
    },
    searchNews : (req, res)=>{
        newsModel.searchNews(req).then((result)=>{
            formResponse(result, res)
        }).catch((err)=>{
            formResponse(err, res)
        })
    }
}

module.exports = newsController