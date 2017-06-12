var MoveAllCardsView = Backbone.View.extend({
  template: App.templates.moveAllCards,
  className: 'list-actions-menu',

  events: {
    'click i.fa-close': 'remove',
    'click li': 'moveAllCards',
  },

  moveAllCards: function(e) {
    var $el = $(e.target);
    var targetId = $el.data('id');
    var id = this.model.get('id');
    var title = $el.text();
    var position = App.cards.where({ listId: targetId }).length;

    if (title === this.model.get('title')) {
      this.remove();
      return;
    }

    App.cards.where({ listId: id }).forEach(function(card) {
      card.save({
        listId: targetId,
        position: position,
       });

      position++;
    });

    App.cards.trigger('card_move');
    this.remove();
  },

  render: function() {
    this.$el.html(this.template({
      lists: App.lists.toJSON(),
    }));

    this.$container.append(this.$el);
  },

  initialize: function(options) {
    this.$container = options.$container;
    this.render();
  },
});