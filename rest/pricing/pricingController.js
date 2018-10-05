'use strict';

const router = require('express').Router();
const CONSTANTS = require('../../constants');
var prices = require('./prices');

router.get('/prices', async function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.send(JSON.stringify(prices));
})

module.exports = router;
