const FixtureModel = require('../models/fixture');

class fixtureServices {

    /**
       * gets all fixtures from the db
    */
   getAllFixtures(){
        return FixtureModel.find();
    }

    /**
       * Add new fixture
       *
       * @param param
    */
   addNewFixture(param){
        return FixtureModel.create(param);
    }

    /**
       * update a fixture
       * @param fixture_id
       * @param param
    */
   updateFixture(fixture_id, param){
        return FixtureModel.findOneAndUpdate({fixture_id}, {$set:param}, {new: true});
    }

    /**
       * remove a fixture
       *
       * @param param
    */
   removeFixture(param){
    return FixtureModel.deleteOne(param);
    }

    /**
       * search a fixture
       *
       * @param param
    */
   searchForFixture(param){
        return FixtureModel.findOne(param);
    }

    /**
       * view fixture status
       *
       * @param param
    */
   viewFixtureStatus(param){
    return FixtureModel.findOne(param);
    }
  };
  
  module.exports = fixtureServices;