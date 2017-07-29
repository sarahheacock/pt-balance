const express = require("express");

const fileRoutes = express.Router();
const cloudinary = require('cloudinary');
const config = require('../configure/config');


cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret
});

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

// var multerCloudinary = require('multer-cloudinary');
// var cloudinaryStorage = multerCloudinary({cloudinary: Cloudinary});

//======================EDIT SECTIONS==============================

fileRoutes.post("/", upload.single('file'), (req, res) => {
 console.log("file", req.file)
 cloudinary.uploader.upload(req.file.path, (error, result) => {
   console.log(result);
   if(error) res.json(error);
   res.json(result);
 });

});



module.exports = fileRoutes;
