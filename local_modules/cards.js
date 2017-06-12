var path = require('path');
var fs = require('fs');
var _ = require('underscore');

var Cards = {
  file_path: path.resolve(path.dirname(__dirname), 'data/cards.json'),

  get: function() {
    return JSON.parse(fs.readFileSync(this.file_path, 'utf-8')).cards;
  },

  setCard: function(cards) {
    var lastId = this.getLastId() + 1;

    var data = {
      cards: cards,
      lastId: lastId,
    };

    fs.writeFileSync(this.file_path, JSON.stringify(data), 'utf8');
  },

  getLastId: function() {
    return JSON.parse(fs.readFileSync(this.file_path, 'utf-8')).lastId;
  },

  copyCards: function(lastId, cards) {
    var data = {
      cards: cards,
      lastId: lastId
    };

    fs.writeFileSync(this.file_path, JSON.stringify(data), 'utf8');
  }
};

module.exports = Cards;