const db = require("../helpers/config");
const fs = require('fs');
const { newsQuery } = require('../helpers/QueryBuilder')
const responseMessage = require("../helpers/responseMessage");
const Validation = require('../helpers/Validation');

const {responseEmpty, responseCreate, responseServerError, responseBadRequest} = responseMessage
const {getAllNews, getById, getByTitleAndId, insert, getTags} = newsQuery
const { isFilled } = Validation

const newsModel = {
  addNews: (req) => {
    const { title, text_news, category, tags } = req.body;
    const { id } = req.params;
    return new Promise((resolve, reject) => {
      if (
        title == null &&
        text_news == null &&
        category == null &&
        tags == null &&
        req.file == undefined
      ) {
        fs.unlink(`public/uploads/poster/${req.file.filename}`, (errUnlink) => {
          if (!errUnlink) {
            reject({
              message: `Field cannot empty`,
              status: 400,
            });
          }
          reject({
            message: `Field cannot empty`,
            status: 400,
          });
        });
      } else {
        let where = {title : title, id_user : id}
        db.query(getByTitleAndId(where, 'id'),
          (err, res) => {
            if (!err) {
              if (res.rows.length > 0) {
                reject({
                  message: "news already exist",
                  status: 400,
                });
              } else {
                let newBody = {
                  id_user : id,
                  title : title,
                  tags : tags,
                  created_at : 'NOW()',
                  text_news : text_news,
                  poster : `uploads/poster/${req.file.filename}`,
                  category : category
                }
                db.query(
                  insert(newBody),
                  (error, result) => {
                    if (!error) {
                      resolve({
                        message: `success add news`,
                        status: 201,
                      });
                    } else {
                      fs.unlink(`public/uploads/poster/${req.file.filename}`, (errUnlink) => {
                        if (errUnlink) {
                          reject({
                            message: `failed add news 1 ${errorUnlink}`,
                            status: 400,
                          });
                        }else{
                          resolve({
                            message : `Failed add news ${insert(newBody)}`,
                            status : 500
                          })
                        }
                      });
                    }
                  }
                );
              }
            } else {
              fs.unlink(`public/uploads/poster/${req.file.filename}`, (errUnlink) => {
                if (!errUnlink) {
                  reject({
                    message: `failed add news 2 ${err}`,
                    status: 400,
                  });
                }
              });
            }
          }
        );
      }
    });
  },
  getNews: (req) => {
    if(req.query.id_news == null || req.query.id_news == undefined){
      return new Promise((resolve, reject)=>{
        const newdata = {
          limit : req.query.limit ?? 5,
          offset : req.query.offset ?? 1
        }
        const {limit, offset} = newdata
        db.query(getAllNews(),(error, result)=>{
          if(!error){
            resolve({
              message : `Success get news`,
              status : 200,
              data : result.rows
            })
          }else{
            reject({
              message : `Failed get news ${error}`,
              status : 400,
              data : []
            })
          }
        })
    })
    }else{
      const id_news = req.query.id_news
      return new Promise((resolve, reject)=>{
        db.query(`SELECT news.id AS news_id, news.poster, news.created_at, news.title, news.id_user, users.name, users.username, users.role, news.text_news
        FROM news JOIN users ON news.id_user = users.id WHERE news.id = ${id_news}`, (err, res)=>{
          if(!err){
            if(res.rows.length < 1){
              resolve({
                message : 'Success Get News With Empty Result',
                status : 200,
                data : []
              })
            }else{
              resolve({
                message : 'Succes Get News',
                status : 200,
                data : res.rows
              })
            }
          }else{
            reject({
              message : 'Failed Get News',
              status : 500
            })
          }
        })
      })
    }
  },
  updateNews: (req) => {
    const id_user = req.params.id
    const id_news = req.query.id_news
    return new Promise((resolve, reject)=>{
      let where = {id_user : id_user, id : id_news};
      db.query(selectNewsAnd(where),(error, result)=>{
        if(!error){
          if(req.file != undefined || req.file != null){
            fs.unlink(`public/${result.rows[0].poster}`, (errUnlink)=>{
              if(errUnlink){
                reject({
                  message : 'Failed update news',
                  status : 200
                })
              }
            })
          }
          const newBody = {
            category : req.body.category ?? result.rows[0].category,
            title : req.body.title ?? result.rows[0].title,
            tags : req.body.tags ?? result.rows[0].tags,
            text_news : req.body.text_news ?? result.rows[0].text_news,
            poster : (!req.file || req.file === null || req.file === undefined) ? result.rows[0].poster : `uploads/poster/${req.file.filename}`
          }
          const {title, tags, text_news, poster, category} = newBody
          db.query(`UPDATE news SET title = '${title}', tags = '${tags}', text_news = '${text_news}', poster = '${poster}', category = ${category} WHERE id = ${id_news} AND id_user = ${id_user}`, (err, res)=>{
            if(!err){
              resolve({
                message : 'Success Update news',
                status : 201,
              })
            }else{
              reject({
                message : `Failed update news ${err}`,
                status : 400
              })
            }
          })
        }else{
          reject({
            message : `Failed Update News ${error}`,
            status : 400
          })
        }
      })
    })
  },
  deleteNews : (req)=>{
    const id = req.params.id
    const id_news = req.query.id_news
    return new Promise((resolve, reject)=>{
      if(id_news == null){
        reject({
          message : 'Delete failed',
          status : 500
        })
      }
      let where = {id_user : id, id : id_news}
      db.query(newsQuery.selectNewsAnd(where),(error, result)=>{
        if(!error){
          if(result.rows.length > 0){
            if(result.rows[0].poster != null){
              fs.unlink(`public/${result.rows[0].poster}`,(errUnlink)=>{
                if(errUnlink){
                  reject({
                    message : `Error Unlink`,
                    status : 200
                  })
                }
              })
            }
            let whereNews = {id_user : id, id : id_news};
            db.query(newsQuery.deleteNewsAnd(whereNews),(err, res)=>{
              if(!err){
                resolve({
                  message : `Success delete`,
                  status : 200
                })
              }else{
                reject({
                  message : `Error delete news ${err}`,
                  status : 500
                })
              }
            })
          }else{
            reject({
              message : `News is not Found`,
              status : 404
            })
          }
        }else{
          reject({
            message : `Error delete news ${error}`,
            status : 500
          })
        }
      })
    })
  },
  searchNews : (req)=>{
    const key = req.query.key
    
    return new Promise((resolve, reject)=>{
      if(key == null){
        reject({
          message : `Field Cannot Be Empty`,
          status  : 400
        })
      }else{
        let where = {title : key, text_news : key}
        db.query(newsQuery.likeNewsOr(where),(error, result)=>{
          if(!error){
            if(result.rows.length > 0){
              resolve({
                message : 'Success get data',
                status : 200,
                data : result.rows
              })
            }else{
              reject({
                message : 'Data Not Found',
                status : 404,
              })
            }
          }else{
            reject({
              message : 'Failed Get Data',
              status : 400,
            })
          }
        })
      }
    })
  },
  getTags : (req)=>{
    return new Promise((resolve, reject)=>{
      db.query()
    })
  }
};

module.exports = newsModel;
