const formResponse = require('../helpers/formResponse')
const commentsModel = require('../models/commentsModel')

const commentsController = {
    sendComment : (req, res)=>{
        commentsModel.sendComment(req).then((result)=>{
            formResponse(result, res)
        }).catch((err)=>{
            formResponse(err, res)
        })
    },
    deleteComment : (req, res)=>{
        commentsModel.deleteComment(req).then((result)=>{
            formResponse(result, res)
        }).catch((err)=>{
            formResponse(err, res)
        })
    },
    getComment : (req, res) =>{
        commentsModel.getComment(req).then((result)=>{
            formResponse(result, res)
        }).catch((err)=>{
            formResponse(err, res)
        })
    }
}

module.exports = commentsController