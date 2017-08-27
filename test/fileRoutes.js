//During the test the env variable is set to test
// process.env.NODE_ENV = 'test';
//
// const mongoose = require("mongoose");
// const messages = require("../data/data").messages;
//
// //Require the dev-dependencies
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const server = require('../server/index');
// const should = chai.should();
//
// chai.use(chaiHttp);
// //Our parent block
// describe('File Upload', () => {
//
//   describe('/POST image', () => {
//
//
//     it('it should send a success message', (done) => {
//       chai.request(server)
//       .post('/file')
//       .send(newMessage)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         res.body.should.have.property('message').eql(messages.messageSent);
//         done();
//       });
//     });
//
//
//   });
// });
