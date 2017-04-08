var path = require('path');
var Board = require(path.resolve(path.dirname(__dirname), 'local_modules/board.js'));
var _ = require('underscore');

module.exports = function(router) {
  // get all lists
  router.get('/lists', function(req, res) {
    res.json(Board.getLists());
  });

  // add a list or reset all lists
  router.post('/lists', function(req, res) {
    var list = req.body;
    var lists = Board.getLists();

    if(_.isArray(req.body)) {
      Board.setListCollection(list);
      res.json(list);
    } else {
      list.id = Board.getLastListId();
      lists.push(list);
      Board.setList(lists);
      res.json(list);
    }
  });

  // update a list
  router.put('/lists/:id', function(req, res) {
    var lists = Board.getLists();
    var currentList = _(lists).findWhere({ id: +req.body.id });
    _.extend(currentList, req.body);

    Board.setList(lists);
    res.json(currentList);
  });

  // destroy a list
  router.delete('/lists/:id', function(req, res) {
    var lists = _(Board.getLists()).reject(function(list) {
      return list.id === +req.params.id;
    });

    Board.setList(lists);
    res.status(200).end();
  });

  // get all cards
  router.get('/lists/:id/cards', function(req, res) {
  });

  // add a card to a list or reset all cards for a list
  router.post('/lists/:id/cards', function(req, res) {
    console.log(req.body);
    console.log(req.params);
    var lists = Board.getLists();
    var listId = +req.params.id;
    var currentCards = _(lists).findWhere({ id: listId }).cards;
    var card = req.body;

    if (_.isArray(req.body)) {
      Board.resetAllCardsForList(card, listId);
    } else {
      card.id = Board.getLastCardId();
      currentCards.push(card);
      Board.addCardToList(currentCards, listId);
    }

    res.json(card);
  });
};