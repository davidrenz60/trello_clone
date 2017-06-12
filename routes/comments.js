var path = require('path');
var Comments = require(path.resolve(path.dirname(__dirname), 'local_modules/comments.js'));
var _ = require('underscore');

module.exports = function(router) {
  // get all comments
  router.get('/comments', function(req, res) {
    res.json(Comments.get());
  });

  // add a comment
  router.post('/comments', function(req, res) {
    var comment = req.body;
    var comments = Comments.get();

    comment.id = Comments.getLastId();
    comments.push(comment);
    Comments.setComment(comments);
    res.json(comment);
  });

  // update a comment
  router.put('/comments/:id', function(req, res) {
    var comments = Comments.get();
    var currentComment = _(comments).findWhere({ id: +req.body.id });
    _.extend(currentComment, req.body);

    Comments.setComment(comments);
    res.json(currentComment);
  });

  // destroy a comment
  router.delete('/comments/:id', function(req, res) {
    var comments = _(Comments.get()).reject(function(comment) {
      return comment.id === +req.params.id;
    });

    Comments.setComment(comments);
    res.status(200).end();
  });
};