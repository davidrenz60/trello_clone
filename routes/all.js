var express = require('express');
var router = express.Router();
var path = require('path');
var route_files = ['index', 'lists', 'cards', 'labels', 'comments', 'activities'];

for (var i = 0; i < route_files.length; i++) {
  require(path.resolve(path.dirname(__dirname), "routes/" + route_files[i]))(router);
}

module.exports = router;