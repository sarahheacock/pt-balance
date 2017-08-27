const express = require("express");
const messageRoutes = express.Router();
const mid = require('../middleware/middleware');

const messages = require('../../data/data').messages;
const configure = require('../configure/config');
const Slack = require('slack-node');
// const slack = new Slack('https://hooks.slack.com/services/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');
const slack = new Slack();
slack.setWebhook(configure.url);

//================MAIL==================================
messageRoutes.post("/", mid.checkMessageInput, (req, res) => {
  // console.log(configure.url);
  slack.webhook({
    text: req.body.message,
    channel: '#general',
    username: req.body.name,
    attachments: [
      {
        title: 'Phone Number',
        text: req.body.phone
      },
      {
        title: 'Email Address',
        text: req.body.email
      }
    ]
  }, (err, response) => {
    if(err) res.json({message: 'Message unable to send'});
    res.json({message: messages.messageSent});
  });
});


module.exports = messageRoutes;
