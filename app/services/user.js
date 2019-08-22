const UsersModel = require('../models/users');

class UserService {

    /**
       * gets user from the db
       *
       * @param username
       */
      getUserByUserName(username){
        return UsersModel.findOne({username});
      }

    /**
       * sign users up
       *
       * @param param
       */
      signUserUp(params){
        return UsersModel.create(params);
      }
  };
  
  module.exports = UserService;