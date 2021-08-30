const db = require('../helpers/config')

const commentsModel = {
    getComment : (req)=>{
        const id_news = req.params.id
        return new Promise((resolve, reject)=>{
            if(id_news == null){
                reject({
                    message : 'Not found',
                    status : 404
                })
            }
            db.query(`SELECT * FROM news LEFT JOIN news_comments ON news.id = news_comments.id_news JOIN users ON news_comments.id_user = users.id WHERE news.id = ${id_news}`, (error, result)=>{
                if(!error){
                    resolve({
                        message : 'Success get all comments',
                        status : 200,
                        data : result.rows
                    })
                }else{
                    reject({
                        message : `Error get comment ${error}`,
                        status : 400
                    })
                }
            })
        })
    },
    sendComment : (req)=>{
        const id_user = req.params.id
        const id_news = req.query.id_news
        const {comment} = req.body
        return new Promise((resolve, reject)=>{
            if(id_news == null || comment == null || comment == ''){
                reject({
                    message : `Cannot empty`,
                    status : 400
                })
            }
            db.query(`INSERT INTO news_comments(id_news,id_user,created_at, comment) VALUES(${id_news},${id_user},'NOW()','${comment}')`,(error, result)=>{
                if(!error){
                    resolve({
                        message : 'Success Send comment',
                        status : 200
                    })
                }else{
                    reject({
                        message : `Failed send Comment ${error}`,
                        status : 400
                    })
                }
            })
        })
    },
    deleteComment : (req)=>{
        const id_user = req.params.id
        const {id_news, id_comment} = req.query
        return new Promise((resolve, reject)=>{
            if(id_news == null || id_comment == null){
                reject({
                    message : 'cannot be empty !',
                    status : 200
                })
            }
            db.query(`DELETE FROM news_comments WHERE id_user = ${id_user} AND id_news = ${id_news} AND id= ${id_comment}`,(error, result)=>{
                if(!error){
                    resolve({
                        message : 'Delete success',
                        status : 200
                    })
                }else{
                    reject({
                        message : 'Failed delete comment',
                        status : 400
                    })
                }
            })
        })
    }
}

module.exports = commentsModel