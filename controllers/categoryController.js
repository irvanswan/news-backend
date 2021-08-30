const formResponse = require('../helpers/formResponse')
const categoryModel = require('../models/categoryModel')

const categoryController = {
    getCategory : (req, res) =>{
        categoryModel.getCategory(req).then((result)=>{
            formResponse(result, res)
        }).catch((error)=>{
            formResponse(error, res)
        })
    },
    addCategory : (req, res)=>{
        categoryModel.addCategory(req).then((result)=>{
            formResponse(result, res)
        }).catch((error)=>{
            formResponse(error, res)
        })
    }
}

module.exports = categoryController