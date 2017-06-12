var path = require('path');
var fs = require('fs');
var _ = require('underscore');

var Lists = {
  file_path: path.resolve(path.dirname(__dirname), 'data/lists.json'),

  get: function() {
    return JSON.parse(fs.readFileSync(this.file_path, 'utf-8')).lists;
  },

  setList: function(lists) {
    var lastId = this.getLastId() + 1;

    var data = {
      lists: lists,
      lastId: lastId,
    };

    fs.writeFileSync(this.file_path, JSON.stringify(data), 'utf8');
  },

  setListCollection: function(lists) {
    var lastId = this.getLastId();

    var data = {
      lastId: lastId,
      lists: lists,
    };

    fs.writeFileSync(this.file_path, JSON.stringify(data), 'utf8');
  },

  getLastId: function() {
    return JSON.parse(fs.readFileSync(this.file_path, 'utf-8')).lastId;
  },
};

module.exports = Lists;
