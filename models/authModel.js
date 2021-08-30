const db = require("../helpers/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userQuery } = require('../helpers/QueryBuilder')
const responseMessage = require("../helpers/responseMessage");
const Validation = require('../helpers/Validation');
const { getByPhoneOrEmail } = require("../helpers/QueryBuilder/userQuery");

const {responseEmpty, responseCreate, responseServerError, responseBadRequest} = responseMessage
const {getByEmail, insert} = userQuery
const { isFilled } = Validation

const authModel = {
  verifyUserGoogle : (req)=>{
    const {email_verified, email, given_name, password} = req
    return new Promise((resolve, reject)=>{
      if(!email_verified){
        reject(responseServerError('Not Verified Account Gmail'));
      }
      db.query(getByEmail(email,'id, email, role'), (error, result)=>{
        if(!error){
          if(isFilled(result)){
            const { id, email, role } = result?.rows[0];
            const processToken = {id: id, email: email, role: role};
            jwt.sign(
              processToken,
              process.env.SECRET_KEY,
              function (errToken, token) {
                if (!errToken) {
                  resolve({
                    message: `login successfully`,
                    status: 200,
                    data: {
                      token: token,
                      id_user: result.rows[0].id,
                      is_login: true,
                    },
                  });
                } else {
                  reject(responseServerError(errToken));
                }
              }
            );
          }else{
            const data = {
              email : email,
              password : password,
              name : given_name,
              role : 'basic'
            }
            /* reject(responseEmpty()); */
            db.query(insert(data), (errorInsert, responseInsert)=>{
              if(!errorInsert){
                console.log(`${insert(data)}`)
                return this.verifyUserGoogle(data);
              }else{
                console.log(`${errorInsert} ${insert(data)}`)
                reject(responseServerError(errorInsert))
              }
            })
          }
        }else{
          reject(responseServerError(error))
        }
      })
    })
  },
  userLogin: (req) => {
    const { email, password } = req.body;
    return new Promise((resolve, reject) => {
      if (email == null || password == null) {
        reject(responseBadRequest(`Email / Password is Empty`));
      }
      if(typeof(email) === 'string' && typeof(password) === 'string'){
        db.query(getByEmail(email,'password, id, email, role'),
          (error, result) => {
          if (!error) {
            if (!isFilled(result)) {
              reject(responseEmpty())
            } else {
              bcrypt.compare(
                password,
                result.rows[0].password,
                function (err, res) {
                  if (!err) {
                    if (!res) {
                      reject(responseBadRequest('wrong Email / Password'));
                    } else {
                      const { id, email, role } = result?.rows[0];
                      const processToken = {
                        id: id,
                        email: email,
                        role: role,
                      };
                      jwt.sign(
                        processToken,
                        process.env.SECRET_KEY,
                        function (errToken, token) {
                          if (!errToken) {
                            resolve({
                              message: `login successfully`,
                              status: 200,
                              data: {
                                token: token,
                                id_user: id,
                                is_login: true,
                              },
                            });
                          } else {
                            reject(responseServerError('generate token', errToken));
                          }
                        }
                      );
                    }
                  } else {
                    reject(responseServerError('password trouble', err));
                  }
                }
              );
            }
          } else {
            reject(responseServerError('search user',error));
          }
        }
      );
    }else{
      reject(responseBadRequest('Input Failed'))
    }
    });
  },
  userRegister: (req) => {
    return new Promise((resolve, reject) => {
      const { email, password, phone } = req.body;
      if (email == null || password == null || phone == null) {
        reject(responseBadRequest('Field Cannot Be Empty'));
      } else {
        db.query(getByPhoneOrEmail({email : email, phone: phone},'id'),
          (err, res) => {
            if (!err) {
              if (res.rows.length > 0) {
                reject(responseBadRequest('Email or phone has been registered'));
              } else {
                const data = {
                  emal : email,
                  password : password,
                  phone : phone,
                  role : 'basic'
                }
                db.query(
                  insert(data),
                  (error) => {
                    if (!error) {
                      resolve(responseCreate(`Register Success`));
                    } else {
                      reject(responseServerError(error));
                    }
                  }
                );
              }
            } else {
              reject(responseServerError(err));
            }
          }
        );
      }
    });
  },
};

module.exports = authModel;
