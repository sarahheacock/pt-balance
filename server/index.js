const express = require('express');
const path = require('path');

const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const testConfig = require('config'); //we load the db location from the JSON files
// const testConfig = require('./configure/config');
const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};


const refreshRoutes = express.Router();
const adminRoutes = require("./routes/adminRoutes");
const loginRoutes = require("./routes/loginRoutes");
const fileRoutes = require("./routes/fileRoutes");
const messageRoutes = require("./routes/messageRoutes");


//=====CONFIGURATION=============================
mongoose.connect(testConfig.DBHost, options); //connect to database
// app.set('superSecret', config.secret); //set secret variable


const db = mongoose.connection;
db.on("error", function(err){
  console.error("connection error:", err);
});
db.once("open", function(){
  console.log("db connection successful");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

refreshRoutes.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
//===============================================================
refreshRoutes.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

//=================ROUTES=======================================

// apply the routes to our application with the prefix /api
app.use('/sayHello', messageRoutes);
app.use('/login', loginRoutes);
app.use('/file', fileRoutes);
app.use('/admin', adminRoutes);
app.use(refreshRoutes);

//===========================================================
//==========================================================
//catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

//=======START SERVER========================================
const port = process.env.PORT || 5000;
// const port = 8080;

app.listen(port, function(){
  console.log("Express server is listening on port ", port);
});

module.exports = app;
