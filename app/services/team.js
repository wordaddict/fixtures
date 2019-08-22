const teamsModel = require('../models/teams');

class TeamService {

    /**
       * gets all teams from the db
    */
      getAllTeams(){
        return teamsModel.find();
      }

    /**
       * Add new team
       *
       * @param param
    */
    addNewTeam(param){
        return teamsModel.create(param);
    }

    /**
       * update a team
       *
       * @param param
    */
   updateTeam(param){
        const { name, updated_name } = param;
        return teamsModel.findOneAndUpdate({name}, {$set:{name: updated_name }}, {new: true});
    }

    /**
       * remove a team
       *
       * @param param
    */
   removeTeam(param){
        return teamsModel.deleteOne(param);
    }

    /**
       * search a team
       *
       * @param param
    */
   searchForTeam(param){
        return teamsModel.findOne(param);
    }
  };
  
  module.exports = TeamService;