var path = require('path');
var Lists = require(path.resolve(path.dirname(__dirname), 'local_modules/lists.js'));
var Cards = require(path.resolve(path.dirname(__dirname), 'local_modules/cards.js'));
var Labels = require(path.resolve(path.dirname(__dirname), 'local_modules/labels.js'));
var Comments = require(path.resolve(path.dirname(__dirname), 'local_modules/comments.js'));
var Activities = require(path.resolve(path.dirname(__dirname), 'local_modules/activities.js'));

module.exports = function(router) {
  router.get('/', function(req, res) {
    res.render('index', {
      lists: Lists.get(),
      cards: Cards.get(),
      labels: Labels.get(),
      comments: Comments.get(),
      activities: Activities.get(),
    });
  });

  router.get('/card/:id', function(req, res) {
    res.render('index', {
      lists: Lists.get(),
      cards: Cards.get(),
      labels: Labels.get(),
      comments: Comments.get(),
      activities: Activities.get(),
    });
  });
};
