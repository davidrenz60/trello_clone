var path = require('path');
var fs = require('fs');
var _ = require('underscore');

var Labels = {
  file_path: path.resolve(path.dirname(__dirname), 'data/labels.json'),

  get: function() {
    return JSON.parse(fs.readFileSync(this.file_path, 'utf-8')).labels;
  },

  setLabel: function(labels) {
    var lastId = this.getLastId() + 1;

    var data = {
      labels: labels,
      lastId: lastId,
    };

    fs.writeFileSync(this.file_path, JSON.stringify(data), 'utf8');
  },

  getLastId: function() {
    return JSON.parse(fs.readFileSync(this.file_path, 'utf-8')).lastId;
  },
};

module.exports = Labels;