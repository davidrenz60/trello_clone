var Lists = Backbone.Collection.extend({
  url: '/lists',
  model: List,

  // returns card collection for list
  getCardsFor: function(id) {
    return this.get(id).get('cards');
  },

  // returns a card based on list id and poition
  getCard: function(id, position) {
    return this.getCardsFor(id).findWhere({ position: position });
  },

  // return an array of all card objects on the board
  getAllCards: function() {
    var result = [];

    this.forEach(function(list) {
      var listId = list.get('id');
      var title = list.get('title');

      list.get('cards').forEach(function(card) {
        card = card.toJSON();
        card.listTitle = title;
        card.listId = listId;
        result.push(card);
      });
    });

    return result;
  }
});