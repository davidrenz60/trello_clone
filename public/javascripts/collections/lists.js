var Lists = Backbone.Collection.extend({
  url: '/lists',
  model: List,

  getCardsFor: function(id) {
    return this.get(id).view.cards;
  },

  getCard: function(id, position) {
    return this.getCardsFor(id).findWhere({ position: position });
  },

  getIds: function() {
    return $('div.list').map(function(idx, el) {
      return +$(el).attr('list-id');
    });

  },

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