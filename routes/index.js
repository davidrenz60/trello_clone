var path = require('path');
var Board = require(path.resolve(path.dirname(__dirname), 'local_modules/board.js'));

module.exports = function(router) {
  router.get('/', function(req, res) {
    res.render('index', {
      lists: Board.getLists(),
      labels: Board.getLabels(),
    });
  });
};
