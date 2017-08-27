const express = require("express");

const adminRoutes = express.Router();
const Page = require("../models/page").Page;
const mid = require('../middleware/middleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../configure/config');
const formData = require('../../data/data').formData;
const initialEdit = require('../../data/data').initialEdit;
const initialMessage = require('../../data/data').initialMessage;
const keys = ["home", "authors", "publications", "news"];


adminRoutes.param("pageID", (req, res, next, id) => {
  Page.findById(id, (err, doc) => {
    if(err) return next(err);
    if(!doc){
      err = new Error("Page Not Found");
      err.status = 404;
      return next(err);
    }
    req.page = doc;
    return next();
  });
});

adminRoutes.param("section", (req,res,next,id) => {
  req.section = req.page[id];
  if(!req.section){
    let err = new Error("Not Found");
    err.status = 404;
    return next(err);
  }
  next();
});

adminRoutes.param("sectionID", (req, res, next, id) => {
  req.oneSection = req.section.id(id);
  if(!req.oneSection){
    let err = new Error("Not Found");
    err.status = 404;
    return next(err);
  }
  next();
});

const formatOutput = (obj) => {
  let newObj = {};
  keys.forEach((k) => { //only send back home, authors,
    newObj[k] = obj[k]
  });
  return {data: newObj, edit: initialEdit, message: initialMessage};
}

//======================EDIT SECTIONS==============================

adminRoutes.get("/:pageID/", (req, res, next) => {
  res.status(200);
  let newObj = {};
  keys.forEach((k) => {
    newObj[k] = req.page[k]
  });
  res.json({data: newObj});
});

//add section
adminRoutes.post("/:pageID/:section", mid.authorizeUser, mid.checkEditInput, (req, res, next) => {
  req.section.push(req.body);
  req.page.save((err, page) => {
    if(err) return next(err);
    res.status(201);
    res.json(formatOutput(page));
  });
});


//edit section
adminRoutes.put("/:pageID/:section/:sectionID", mid.authorizeUser, mid.checkEditInput, (req, res, next) => {
  Object.assign(req.oneSection, req.body);
  req.page.save((err, result) => {
    if(err) return next(err);
    res.json(formatOutput(result));
  });
});

//delete section
adminRoutes.delete("/:pageID/:section/:sectionID", mid.authorizeUser, (req, res) => {
  req.oneSection.remove((err) => {
    req.page.save(function(err, page){
      if(err) return next(err);
      res.json(formatOutput(page));
    })
  })
});


module.exports = adminRoutes;
