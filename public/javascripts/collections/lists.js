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
  }
});