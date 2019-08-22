const config = require('../app/config/settings');

// Require dependencies
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app/index');
const should  = chai.should();

chai.use(chaiHttp);

// user
describe('/should log and sign user up', () => {
  it('should log users in', (done) => {
    chai.request(app)
        .post('/login')
        .send({
            "username": "Mike",
            "password": "Sam",
        })
      .end((err, res) => {
      
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('code');
        res.body.should.have.property('message').eql("Login was successful");
        res.body.should.have.property('code').eql(200);
        res.body.should.have.property('error').eql(false);
        done();
      });
  });

  it('should sign users in', (done) => {
    chai.request(app)
        .post('/signup')
        .send({
            "username": "Mikeli",
            "password": "Sam",
            "phone_no": "07032748645"
        })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.have.property('message');
        res.body.should.have.property('code');
        res.body.should.have.property('message').eql("signup was successfully done");
        res.body.should.have.property('code').eql(201);
        res.body.should.have.property('error').eql(false);
        done();
      });
  });
});

