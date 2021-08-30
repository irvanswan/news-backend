const db = require("../helpers/config");
const queryBuilder = require('../helpers/QueryBuilder');

const categoryModel = {
    getCategory : (req) =>{
        return new Promise((resolve, reject)=>{
            db.query(`SELECT * FROM categories`,(error, result)=>{
                if(!error){
                    resolve({
                        message : 'success get category',
                        status : 200,
                        data : result.rows
                    })
                }else{
                    reject({
                        message : 'failed get category',
                        status : 400,
                        data : []
                    })
                }
            })
        })
    },
    addCategory : (req)=>{
        let {nm_categories} = req.body
        return new Promise((resolve, reject)=>{
            if(nm_categories != null && req.file != null){
                db.query(`SELECT* FROM categories WHERE name_categories = `,(error, result)=>{
                    if(!error){
                        if(result.rows.length > 0){
                            reject({
                                message : 'Category Alredy Exists',
                                status : 400,
                                data : result.rows[0]
                            })
                        }
                        db.query(`INSERT INTO categories(name_categories, cover) VALUES('${nm_categories}','${req.file.filename}')`, (err, res)=>{
                            if(!error){
                                resolve({
                                    message : 'Category Success Added',
                                    status : 200,
                                    data : res.rows
                                })
                            }else{
                                reject({
                                    message : 'Failed Add Category',
                                    status : 400
                                })
                            }
                        })
                    }else{
                        reject({
                            message : 'Failed Fetching Data',
                            status : 400,
                        })
                    }
                })
            }else{
                reject({
                    message : 'Field Cannot Be Empty',
                    status : 400,
                    data : [...req.body]
                })
            }
        })
    },
    editCategory : (req)=>{
        return new Promise((resolve, reject)=>{
            
        })
    }
}

module.exports = categoryModel