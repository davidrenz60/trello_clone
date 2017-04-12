var List = Backbone.Model.extend({
  urlRoot: '/lists',
  defaults: {
    subscribed: false,
  },

  setCards: function(cards) {
    if (cards instanceof Cards) {
      this.set('cards', cards);
      return;
    }

    if (cards) {
      this.set('cards', new Cards(cards, {listId: this.get('id') }));
    } else {
      this.set('cards', new Cards([], { listId: this.get('id') }));
    }
  },

  initialize: function(options) {
    this.setCards(options.cards);
  }
});