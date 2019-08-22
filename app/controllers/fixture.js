const uuid = require('uuid/v4');

// import fixture services
const fixtureServices = require('../services/fixture')
const Response = require('../lib/response_manager');
const HttpStatus = require('../constants/http_status');

class FixtureController {

    /**
         * View/Get all fixtures
         *
         * @param req
         * @param res
         * @methodVerb GET
    */
    getAllFixtures(req, res){
        return new fixtureServices().getAllFixtures()
            .then((data) => {
                return Response.success(res, {
                    message: 'Feature was gotten',
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
         * Add new fixture
         *
         * @param req
         * @param res
         * @methodVerb POST
    */
    addNewFixture(req, res){
        const { home_team, away_team , date } = req.body;
        // check if any of the required parameters were sent
        if (!away_team || !home_team || !date) {
            return Response.failure(res, { message: 'Kindly add all fields including , away_team, home_team, date ' }, HttpStatus.BAD_REQUEST);
        }

        const param = {
            home_team,
            away_team,
            fixture_id: uuid(),
            date
        }
        return new fixtureServices().addNewFixture(param)
            .then((data) => {
                return Response.success(res, {
                    message: 'Fixture was created successfully',
                    response: data
                  }, HttpStatus.CREATED);
            })
            .catch(() => {
                return Response.failure(res, {
                    message: 'name must be unique',
                    response: {},
                  }, HttpStatus.BAD_REQUEST)
            })
    }

    /**
         * update a fixture
         *
         * @param req
         * @param res
         * @methodVerb PUT
    */
    updateFixture(req, res){
        const { fixture_id, home_team, away_team, date } = req.body;
        // check if any of the required parameters were sent
        if (!fixture_id) {
            return Response.failure(res, { message: 'Kindly add all fields including , fixture_id ' }, HttpStatus.BAD_REQUEST);
        }

        const param = {
            home_team, away_team, date
        }
        return new fixtureServices().updateFixture(fixture_id, param)
            .then((data) => {
                return Response.success(res, {
                    message: 'Fixture was updated successfully',
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
         * delete a fixture
         *
         * @param req
         * @param res
         * @methodVerb DELETE
    */
   removeFixture(req, res){
    const { fixture_id } = req.body;
    // check if any of the required parameters were sent
    if (!fixture_id) {
        return Response.failure(res, { message: 'Kindly add all fields including , fixture_id ' }, HttpStatus.BAD_REQUEST);
    }

    const param = {
        fixture_id
    }

    return new fixtureServices().removeFixture(param)
        .then((data) => {
            if(data.n == 0){
                return Response.failure(res, {
                    message: 'Fixture not found',
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
         * search for fixture
         *
         * @param req
         * @param res
         * @methodVerb GET
    */
   searchForFixture(req, res){
    const { fixture_id } = req.query;
    // check if any of the required parameters were sent
    if (!fixture_id) {
        return Response.failure(res, { message: 'Kindly add all fields including , fixture_id ' }, HttpStatus.BAD_REQUEST);
    }

    const param = {
        fixture_id
    }

    return new fixtureServices().searchForFixture(param)
        .then((data) => {
            return Response.success(res, {
                message: 'Fixture found successfully',
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

    /**
         * generate unique link for fixture
         *
         * @param req
         * @param res
         * @methodVerb GET
    */
   generateUniqueLink(req, res){

    }


    /**
         * view fixture status
         *
         * @param req
         * @param res
         * @methodVerb GET
    */
    viewFixtureStatus(req, res){
        const { status } = req.query;
        // check if any of the required parameters were sent
        if (!status) {
            return Response.failure(res, { message: 'Kindly add all fields including , status ' }, HttpStatus.BAD_REQUEST);
        }
    
        const param = {
            status
        }
    
        return new fixtureServices().viewFixtureStatus(param)
            .then((data) => {
                return Response.success(res, {
                    message: 'status found successfully',
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

module.exports = FixtureController;