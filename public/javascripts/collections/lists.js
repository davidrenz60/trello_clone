var Lists = Backbone.Collection.extend({
  url: '/lists',
  model: List,

  // returns card collection for list
  getCardsFor: function(id) {
    return this.get(id).view.cards;
  },

  // returns a card based on list id and poition
  getCard: function(id, position) {
    return this.getCardsFor(id).findWhere({ position: position });
  },

  // returns an array of current list ids on the board
  getIds: function() {
    return $('div.list').map(function(idx, el) {
      return +$(el).attr('list-id');
    });

  },

  // return an array of all card objects on the board
  getAllCards: function() {
    var result = [];

    App.lists.each(function(list) {
      var listId = list.get('id');
      var title = list.get('title');

      list.view.cards.each(function(card) {
        card = card.toJSON();
        card.listTitle = title;
        card.listId = listId;
        result.push(card);
      });
    });

    return result;
  }
});