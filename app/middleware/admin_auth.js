const jwt = require('jsonwebtoken');
const config = require('../config/settings');

const Response = require('../lib/response_manager');
const HttpStatus = require('../constants/http_status');

const UsersModel = require('../models/users')
const admin_auth = async(req,res,next) => {
    // check for token
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token){
        return Response.failure(res, {
            message: 'Kindly add token',
          }, HttpStatus.BAD_REQUEST);
    }
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    };

    if (token) {
        jwt.verify(token, config.secret, async (err, decoded) => {
          if (err) {
            return res.json({
              success: false,
              message: 'Token is not valid'
            });
          } 

          try {
            const username = req.body.username;
            const user = await UsersModel.findOne({
                username
            })
            
            if (user.privilegde != 'admin') {
                return Response.failure(res, {
                    message: 'Not an Admin',
                  }, HttpStatus.BAD_REQUEST);
            }
            req.user = user
            return next()
            
        } catch (error) {
            return Response.failure(res, {
                message: 'Add username',
              }, HttpStatus.BAD_REQUEST);
        }
        });
      } else {
        return res.send({
          success: false,
          message: 'Auth token is not supplied'
        });
      }
    
}
module.exports = admin_auth;
