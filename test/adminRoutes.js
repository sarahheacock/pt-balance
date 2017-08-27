//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const messages = require("../data/data").messages;
const Page = require('../server/models/page').Page;
const jwt = require('jsonwebtoken');
const configure = require('../server/configure/config');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/index');
const should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Pages', () => {

  beforeEach((done) => { //Before each test we empty the database
    Page.remove({}, (err) => { done(); });
  });

  // describe('/POST page', () => {
  //   const page = {
  //     username: "test",
  //     password: "password"
  //   };
  //
  //   it('it should create a new page rates', (done) => {
  //     chai.request(server)
  //     .post('/admin')
  //     .send(page)
  //     .end((err, res) => {
  //       res.should.have.status(201);
  //       res.body.should.be.a('object');
  //
  //       res.body.should.have.property('username').eql(page.username);
  //       res.body.should.have.property('password');
  //       res.body.should.have.property('home');
  //       done();
  //     });
  //   });
  // });

  describe('/GET/:id page', () => {
    it('it should return error if page not found', (done) => {
      chai.request(server)
      .get('/admin/594952df122ff83a0f190050/')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error').eql({message: "Page Not Found"});
        done();
      });
    });

    it('it should GET a page by the given id but only return needed info', (done) => {
      const page = new Page({username: "test", password: "password"});

      page.save((err, page) => {
        chai.request(server)
        .get('/admin/' + page.id)
        .send(page)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');

          res.body.data.should.have.property('home');
          res.body.data.should.have.property('authors');
          res.body.data.should.have.property('publications');
          res.body.data.should.have.property('news');
          done();
        });
      });
    });
  });

  describe('/POST publication to pageID', () => {
    let page;
    let token;
    beforeEach((done) => { //Before each test we empty the database
      page = new Page({
        "username": "test",
        "password": "password"
      });

      token = jwt.sign({userID: page.userID}, configure.secret, {
        expiresIn: '1d' //expires in one day
      });

      page.save((err, newPage) => { done(); });
    });


    it('prepend publication when all form items are filled in correct order', (done) => {

      const publication = {
        "description": "Good for...",
        "title": "Journal",
        "authors": ["Nancy"],
        "link": "#",
        "date": "September 2018",
        "token": token
      };

      chai.request(server)
      .post('/admin/' + page.id + "/publications")
      .send(publication)
      .end((err, res) => {
        console.log(res.body.data.publications);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('edit');
        res.body.should.have.property('data');
        res.body.should.have.property('message');

        res.body.data.publications[0].should.have.property('title').eql("Journal");
        done();
      });
    });

    it('append publication when all form items are filled', (done) => {

      const publication = {
        "description": "Good for...",
        "title": "Foo",
        "authors": ["Nancy"],
        "link": "#",
        "date": "June 2016",
        "token": token
      };

      chai.request(server)
      .post('/admin/' + page.id + "/publications")
      .send(publication)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('edit');
        res.body.should.have.property('data');
        res.body.should.have.property('message');

        res.body.data.publications[1].should.have.property('title').eql("Foo");
        done();
      });
    });

    it('should return an error if required not included', (done) => {

      const publication = {
        "description": "Good for...",
        "authors": ["Nancy"],
        "link": "#",
        "date": "May 2017",
        "token": token
      };

      chai.request(server)
      .post('/admin/' + page.id + "/publications")
      .send(publication)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql(messages.inputError);
        done();
      });
    });

    it('should return an expired session if token is wrong', (done) => {

      const publication = {
        "description": "Good for...",
        "title": "Journal",
        "authors": ["Nancy"],
        "link": "#",
        "date": "May 2017",
        "token": "token"
      };

      chai.request(server)
      .post('/admin/' + page.id + "/publications")
      .send(publication)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql(messages.expError);
        done();
      });
    });

    it('should return unauthorized if no token provided', (done) => {
      const publication = {
        "description": "Good for...",
        "title": "Journal",
        "authors": ["Nancy"],
        "link": "#",
        "date": "May 2017"
      };

      chai.request(server)
      .post('/admin/' + page.id + "/publications")
      .send(publication)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql({message: messages.tokenError});
        done();
      });
    });
  });

  describe('/PUT editing rate', () => {
    //AUTHENTICATION WAS NOT INCLUDED SINCE TESTED IN POST
    let page;
    let token;
    beforeEach((done) => { //Before each test we empty the database
      page = new Page({
        "username": "test",
        "password": "password"
      });

      token = jwt.sign({userID: page.userID}, configure.secret, {
        expiresIn: '1d' //expires in one day
      });

      page.save((err, newPage) => { done(); });
    });

    it('edit news when all form items are filled', (done) => {

      const news = {
        "title": "Hello",
        "description": "foo",
        "image": "ghj",
        "token": token
      };

      chai.request(server)
      .put('/admin/' + page.id + "/news/" + page.news[0].id)
      .send(news)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.should.have.property('edit');
        res.body.should.have.property('message');
        res.body.data.news[0].should.have.property('title').eql("Hello");
        done();
      });
    });

    it('should return an error if required not included', (done) => {

      const news = {
        "title": "Hello",
        "image": "ghj",
        "token": token
      };

      chai.request(server)
      .put('/admin/' + page.id + "/news/" + page.news[0].id)
      .send(news)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql(messages.inputError);
        done();
      });
    });
  });

  describe('/DELETE rate to rateID', () => {
    //AUTHENTICATION WAS NOT INCLUDED SINCE TESTED IN POST
    let page;
    let token;
    beforeEach((done) => { //Before each test we empty the database
      page = new Page({
        "username": "test",
        "password": "password"
      });

      token = jwt.sign({userID: page.userID}, configure.secret, {
        expiresIn: '1d' //expires in one day
      });
      page.save((err, newPage) => { done(); });
    });


    it('should delete publication', (done) => {

      chai.request(server)
      .delete('/admin/' + page.id + "/publications/" + page.publications[0].id + "?token=" + token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data')
        res.body.data.publications.should.be.a('array').length(0);
        done();
      });
    });
  });
});
