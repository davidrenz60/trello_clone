var path = require('path');
var Cards = require(path.resolve(path.dirname(__dirname), 'local_modules/cards.js'));
var _ = require('underscore');

module.exports = function(router) {
  // get all cards
  router.get('/cards', function(req, res) {
    res.json(Cards.get());
  });

  // add a card or reset all cards
  router.post('/cards', function(req, res) {
    var card = req.body;
    var cards = Cards.get();

    card.id = Cards.getLastId();
    cards.push(card);
    Cards.setCard(cards);
    res.json(card);
  });

  // copy cards from a list
  router.post('/cards/copy', function(req, res) {
    var cards = Cards.get();
    var listId = +req.body.listId;
    var newId = +req.body.newId;
    var id = Cards.getLastId();

    _.where(cards, { listId: listId }).forEach(function(card) {
      var clone = _.clone(card);
      clone.id = id;
      clone.listId = newId;
      id++;
      cards.push(clone);
    });

    Cards.copyCards(id, cards);
    res.json(_.where(cards, { listId: newId }));
  });

  // update a card
  router.put('/cards/:id', function(req, res) {
    var cards = Cards.get();
    var currentCard = _(cards).findWhere({ id: +req.body.id });
    _.extend(currentCard, req.body);

    Cards.setCard(cards);
    res.json(currentCard);
  });

  // destroy a card
  router.delete('/cards/:id', function(req, res) {
    var cards = _(Cards.get()).reject(function(card) {
      return card.id === +req.params.id;
    });

    Cards.setCard(cards);
    res.status(200).end();
  });
};