// import team services
const TeamService = require('../services/team')
const Response = require('../lib/response_manager');
const HttpStatus = require('../constants/http_status');

class TeamController {

    /**
         * View/Get all teams
         *
         * @param req
         * @param res
         * @methodVerb GET
    */
    getAllTeams(req, res){
        return new TeamService().getAllTeams()
            .then((data) => {
                return Response.success(res, {
                    message: 'Team was gotten',
                    response: data
                }, HttpStatus.CREATED);
            })
            .catch(() => {
                return Response.failure(res, {
                    message: 'Internal Server Error',
                    response: {},
                }, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }

    /**
         * Add new team
         *
         * @param req
         * @param res
         * @methodVerb POST
    */
    addNewTeam(req, res){
        const { name, color } = req.body;
        // check if any of the required parameters were sent
        if (!name) {
            return Response.failure(res, { message: 'Kindly add all fields including , name ' }, HttpStatus.BAD_REQUEST);
        }

        const param = {
            name,
            color
        }
        return new TeamService().addNewTeam(param)
            .then((data) => {
                return Response.success(res, {
                    message: 'Team was created successfully',
                    response: data
                  }, HttpStatus.CREATED);
            })
            .catch(() => {
                return Response.failure(res, {
                    message: 'team name must be unique',
                    response: {},
                  }, HttpStatus.BAD_REQUEST)
            })
    }

    /**
         * update a team
         *
         * @param req
         * @param res
         * @methodVerb PUT
    */
    updateTeam(req, res){
        const { name, updated_name } = req.body;
        // check if any of the required parameters were sent
        if (!name) {
            return Response.failure(res, { message: 'Kindly add all fields including , name ' }, HttpStatus.BAD_REQUEST);
        }

        const param = {
            name,
            updated_name
        }
        return new TeamService().updateTeam(param)
            .then((data) => {
                return Response.success(res, {
                    message: 'Team was updated successfully',
                    response: data
                  }, HttpStatus.CREATED);
            })
            .catch((err) => {
                return Response.failure(res, {
                    message: 'Internal server error',
                    response: {},
                  }, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }

    /**
         * delete a team
         *
         * @param req
         * @param res
         * @methodVerb DELETE
    */
   removeTeam(req, res){
        const { name } = req.body;
        // check if any of the required parameters were sent
        if (!name) {
            return Response.failure(res, { message: 'Kindly add all fields including , name ' }, HttpStatus.BAD_REQUEST);
        }

        const param = {
            name
        }

        return new TeamService().removeTeam(param)
            .then((data) => {
                if(data.n == 0){
                    return Response.failure(res, {
                        message: 'Team not found',
                    }, HttpStatus.BAD_REQUEST)
                }
                return Response.success(res, {
                    message: 'Deleted successfully',
                }, HttpStatus.OK);
            })
            .catch(() => {
                return Response.failure(res, {
                    message: 'Internal server error',
                    response: {},
                }, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    
    }
    
    /**
         * search for team
         *
         * @param req
         * @param res
         * @methodVerb GET
    */
   searchForTeam(req, res){
    const { name } = req.query;
    // check if any of the required parameters were sent
    if (!name) {
        return Response.failure(res, { message: 'Kindly add all fields including , name ' }, HttpStatus.BAD_REQUEST);
    }

    const param = {
        name
    }

    return new TeamService().searchForTeam(param)
        .then((data) => {
            return Response.success(res, {
                message: 'Team found successfully',
                response: data
            }, HttpStatus.OK);
        })
        .catch((err) => {
            return Response.failure(res, {
                message: 'Internal server error',
                response: {},
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        })
    }   

};

module.exports = TeamController;