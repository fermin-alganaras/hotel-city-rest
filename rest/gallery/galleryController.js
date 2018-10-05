'use strict';

const router = require('express').Router();
const CONSTANTS = require('../../constants');
const fs = require('fs');
const sizeOf = require('image-size');
const path = require('path');

router.get('/images', function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  // Directory to public assets
  var directory = CONSTANTS.DIR + req.query.path;
  var results = {landscape: [], portrait:[]};

  fs.readdir(directory, (err, files) => {
    if (err) {
      res.send(err);
    } else {
      files.forEach(file => {
        var result = {};
        var dimensions = sizeOf(path.join(directory ,file));
        var orientation = dimensions.height > dimensions.width ? "landscape" : "portrait";
        result = file;
        results[orientation].push(result);
      })
      res.send(JSON.stringify(results));
    }
  });
})

module.exports = router;
