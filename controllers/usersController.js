const formResponse = require('../helpers/formResponse')
const usersModel = require('../models/usersModel')
const usersController = {
    updateUser : (req, res)=>{
        usersModel.updateUser(req).then((result)=>{
            formResponse(result, res)
        }).catch((err)=>{
            formResponse(err, res)
        })
    },
    updateBackground : (req, res)=>{
        usersModel.updateBackground(req).then((result)=>{
            formResponse(result, res)
        }).catch((err)=>{
            formResponse(err, res)
        })
    },
    getUser : (req, res)=>{
        if(req.query.id != null || req.query.id != undefined){
            usersModel.getUser(req).then((result)=>{
                formResponse(result, res)
            }).catch((err)=>{
                formResponse(err, res)
            })
        }else{
            usersModel.getAllUser(req).then((result)=>{
                formResponse(result, res)
            }).catch((err)=>{
                formResponse(err, res)
            })
        }
    }
}

module.exports = usersController