var path = require('path');
var fs = require('fs');
var _ = require('underscore');

var Board = {
  file_path: path.resolve(path.dirname(__dirname), 'data/board.json'),

  getLists: function() {
    return JSON.parse(fs.readFileSync(this.file_path, 'utf-8')).lists;
  },

  getLabels: function() {
    return JSON.parse(fs.readFileSync(this.file_path, 'utf-8')).labels;
  },

  setLabels: function(labels) {
    console.log(labels);
    var lastListId = this.getLastListId();
    var lists = this.getLists();

    var data = {
      labels: labels,
      lists: lists,
      lastListId: lastListId
    };

    fs.writeFileSync(this.file_path, JSON.stringify(data), 'utf8');
  },

  setList: function(lists) {
    var labels = this.getLabels();
    var lastListId = this.getLastListId() + 1;

    var data = {
      labels: labels,
      lastListId: lastListId,
      lists: lists,
    };

    fs.writeFileSync(this.file_path, JSON.stringify(data), 'utf8');
  },

  setListCollection: function(lists) {
    var labels = this.getLabels();
    var lastListId = this.getLastListId();

    var data = {
      labels: labels,
      lastListId: lastListId,
      lists: lists,
    };

    fs.writeFileSync(this.file_path, JSON.stringify(data), 'utf8');
  },

  getLastListId: function() {
    return JSON.parse(fs.readFileSync(this.file_path, 'utf-8')).lastListId;
  },

  addCardToList: function(currentCards, id) {
    var data;
    var lists = this.getLists();
    var labels = this.getLabels();

    _(lists).findWhere({ id: id }).cards = currentCards;

    data = {
      labels: labels,
      lastListId: this.getLastListId(),
      lists: lists,
    };

    fs.writeFileSync(this.file_path, JSON.stringify(data), 'utf8');
  },

  resetAllCardsForList: function(cards, id) {
    var data;
    var lists = this.getLists();
    var labels = this.getLabels();

    _(lists).findWhere({ id: id}).cards = cards;

    data = {
      labels: labels,
      lastListId: this.getLastListId(),
      lists: lists,
    };

    fs.writeFileSync(this.file_path, JSON.stringify(data), 'utf8');
  },
};

module.exports = Board;
