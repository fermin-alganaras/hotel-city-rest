'use strict';

const router = require('express').Router();
const nodemailer = require('nodemailer');
const smtpTransportConfig = require('./smtpTransport');
const CONSTANTS = require('../../constants');

// Include config
var config = require('./config')

// Setup email config
const smtpTransport = nodemailer.createTransport(smtpTransportConfig);

/**
* API endpoint for sending emails.
*
* @param {string} receipt The email address of the recepient
* @param {string} subject The subject title of the email to send
* @param {string} message The email message
*/
router.post('/mail', async function(req, res, next){
  let message = req.body.message.concat("<p>&copy; Nuevo Hotel City, Mendoza, Argentina</p>")
  smtpTransport.sendMail({
      from: config.sendAddr,
      to: req.body.receipt,
      subject: req.body.subject,
      html: message
  }, function(error, response){
      if (error) {
          error.status = CONSTANTS.RESPONSE_CODES.STATE_ERROR;
          res.send(error);
      } else {
          response.status = CONSTANTS.RESPONSE_CODES.STATE_OK;
          res.send(response);
      }
  });
})

module.exports = router;
