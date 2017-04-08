var path = require('path');
var Board = require(path.resolve(path.dirname(__dirname), 'local_modules/board.js'));
var _ = require('underscore');

module.exports = function(router) {
  // reset labels
  router.post('/labels', function(req, res) {
    var labels = req.body;
    Board.setLabels(labels);
    res.json(labels);
  });
};
