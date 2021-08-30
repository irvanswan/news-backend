
const formResponse = require('../helpers/formResponse')
const authModel = require('../models/authModel')
const { OAuth2Client } = require('google-auth-library')
const Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const authController = {
    userRegister : async(req, res)=>{
        await authModel.userRegister(req).then((result)=>{
            formResponse(result, res)
        }).catch((err)=>{
            formResponse(err, res)
        })
    },
    userLogin : async(req, res)=>{
        await authModel.userLogin(req).then((result)=>{
            formResponse(result, res)
        }).catch((err)=>{
            formResponse(err, res)
        })
    },
    userGoogle : async(req, res)=>{
      const { token } = req.query
      const { password } = req.body

      const ticket = await Client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID
      });
      const request = {...ticket.getPayload(), password:password}
      authModel.verifyUserGoogle(request).then((result)=>{
        formResponse(result, res)
      }).catch((err)=>{
        formResponse(err, res);
      })
    },
}

module.exports = authController