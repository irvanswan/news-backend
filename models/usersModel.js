const db = require("../helpers/config");
const fs = require("fs");
const responseMessage = require("../helpers/responseMessage");
const userQuery = require('../helpers/QueryBuilder/userQuery');
const { responseBadRequest } = require("../helpers/responseMessage");

const {getAllUser, getById, updateBackground, updateUser} = userQuery
const {responseEmpty, responseCreate, responseServerError} = responseMessage

const usersModels = {
  updateBackground:(req)=>{
    const id_user = req.params.id;
    return new Promise((resolve, reject)=>{
      if(id_user == null){
        console.log('null id usernya')
        reject(responseBadRequest('Field Cannot Be Empty'))
      }
      db.query(getById(id_user,'bg_profile'), (error, result) => {
        if(!error){
          if(result.rows.length > 0){
            if(req.file !== undefined || req.file !== null || !req.file){
              if(result.rows[0].bg_profile != null){
                fs.unlink(`public/${result.rows[0].bg_profile}`,(errUnlink)=>{
                  if(errUnlink){
                    reject(responseServerError(`Update Background Failed ${errUnlink}`));
                  }
                })
              }
            }
            const newBody = {
              id : req.params.id,
              bg_profile:
              !req.file || req.file === null || req.file === undefined
                ? result.rows[0].bg_profile
                : `uploads/bg_profile/${req.file.filename}`
            }
            db.query(updateBackground(newBody),(err, res)=>{
              if(!err){
                console.log('success', updateBackground(newBody));
                resolve(responseCreate('Success Update Background'))
              }else{
                console.log(updateBackground(newBody));
                reject(responseServerError('Error Updating Background'))
              }
            })
          }
        }else{
          reject(responseServerError(`Error get data`));
        }
      })
    })
  },
  updateUser: (req, res, next) => {
    const id_user = req.params.id;
    return new Promise((resolve, reject) => {
      if(id_user == null){
        reject(responseBadRequest('Field Cannot Be Empty'));
      }
      db.query(getById(id_user,'role, avatar, username, name, email, job, bio, password, phone, bg_profile'), (error, result) => {
        if (!error) {
          if (result.rows.length > 0) {
            if (req.file !== undefined) {
              if (
                result.rows[0].avatar != null
              ) {
                fs.unlink(`public/${result.rows[0].avatar}`, (errUnlink) => {
                  if (errUnlink) {
                    console.log('Eror hapus file')
                    reject(responseServerError(errUnlink));
                  }
                });
              }
            }
            const newBody = {
              id : id_user ?? result.rows[0].id_user,
              username: req.body.username ?? result.rows[0].username,
              name : req.body.name ?? result.rows[0].name,
              email : req.body.email ?? result.rows[0].email,
              job : req.body.job ?? result.rows[0].job,
              bio : req.body.bio ?? result.rows[0].bio,
              password: req.body.password ?? result.rows[0].password,
              phone: req.body.phone ?? result.rows[0].phone,
              role : req.body.role ?? result.rows[0].role,
              bg_profile: result.rows[0].bg_profile,
              avatar:
                !req.file || req.file === null || req.file === undefined
                  ? result.rows[0].avatar
                  : `uploads/avatar/${req.file.filename}`,
            };
            db.query(updateUser(newBody),
              (err) => {
                if (err) {
                  console.log(updateUser(newBody));
                  reject(responseServerError(err));
                } else {
                  resolve(responseCreate(`Update User Success`));
                }
              }
            );
          }
        }
      });
    });
  },
  getAllUser : (req)=>{
    return new Promise((resolve, reject)=>{
      db.query(getAllUser('email, username, phone, role, avatar, name, bio, job'),(error, result)=>{
        if(!error){
          resolve({
            message : 'Success Get All User',
            status : 200,
            data : result.rows
          })
        }else{
          reject(responseServerError(`Failed Get Users ${error}`));
        }
      })
    })
  },
  getUser : (req)=>{
    const id_user = req.query.id
    return new Promise((resolve, reject)=>{
      if(id_user == null){
        reject(responseBadRequest('Field Cannot Be Empty'));
      }
      db.query(getById(id_user, 'email, username, phone, role, avatar, name, bio, job, bg_profile'),(err, res)=>{
        if(!err){
          if(res.rows.length > 0){
            resolve({
              message : `Success get user`,
              status : 200,
              data : res.rows[0]
            })
          }else{
            reject(responseEmpty())
          }
        }else{
          reject(responseServerError(err))
        }
      })
    })
  }
};

module.exports = usersModels;
