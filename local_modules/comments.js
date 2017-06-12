var path = require('path');
var fs = require('fs');
var _ = require('underscore');

var Comments = {
  file_path: path.resolve(path.dirname(__dirname), 'data/comments.json'),

  get: function() {
    return JSON.parse(fs.readFileSync(this.file_path, 'utf-8')).comments;
  },

  setComment: function(comments) {
    var lastId = this.getLastId() + 1;

    var data = {
      comments: comments,
      lastId: lastId,
    };

    fs.writeFileSync(this.file_path, JSON.stringify(data), 'utf8');
  },

  getLastId: function() {
    return JSON.parse(fs.readFileSync(this.file_path, 'utf-8')).lastId;
  },
};

module.exports = Comments;