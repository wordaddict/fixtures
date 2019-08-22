 // imported modules
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

const config = require('../config/settings');

const Response = require('../lib/response_manager');
const HttpStatus = require('../constants/http_status');

// import user services
const UserService = require('../services/user');

class UserController {

  /**
     * logs users in
     *
     * @param req
     * @param res
     * @methodVerb POST
     */
    logUserIn(req, res){
        const { username, password } = req.body;

        // check if any of the required parameters were sent
        if (!username || !password) {
            return Response.failure(res, { message: 'Kindly add all fields including , username, password ' }, HttpStatus.BAD_REQUEST);
        }

        return new UserService().getUserByUserName(username)
            .then((data) => {
                if(bcrypt.compareSync(password, data.password)) {
                // Passwords match
                    let token = jwt.sign({username},
                        config.secret,
                        { expiresIn: '24h' // expires in 24 hours
                        }
                      );

                      return Response.success(res, {
                        message: 'Login was successful',
                        response: {
                            token
                        }
                      }, HttpStatus.OK);
                } else {
                    return Response.failure(res, {
                        message: 'password does not match',
                        response: {},
                      }, HttpStatus.BAD_REQUEST)
                // Passwords don't match
                }
            })
            .catch((err) => {
                console.log('Unable to find user', err);
                return Response.failure(res, {
                    message: 'username does not exist',
                    response: {},
                  }, HttpStatus.BAD_REQUEST)
            })
    };

    /**
     * sign users up
     *
     * @param req
     * @param res
     * @methodVerb POST
     */
    signUpUser(req, res){
        const { username, password, phone_no } = req.body;
        let adminCheck;
        if (req.body.check){
            adminCheck = req.body.check
        }
         // check if any of the required parameters were sent
        if (!username || !password) {
            return Response.failure(res, { message: 'Kindly add all fields including , username, password ' }, HttpStatus.BAD_REQUEST);
        }
        let hash = bcrypt.hashSync(password, 10);

        let param = {
            username,
            password: hash,
            phone_no
        };

        if (adminCheck === config.admin_check){
            param.privilegde = 'admin'
        }
        
        return new UserService().signUserUp(param)
            .then((data) => {
                return Response.success(res, {
                    message: 'signup was successfully done',
                    response: data
                  }, HttpStatus.CREATED);

            })
            .catch(() => {
                return Response.failure(res, {
                    message: 'username must be unique',
                    response: {},
                  }, HttpStatus.BAD_REQUEST)
            })
    }
};

module.exports = UserController;