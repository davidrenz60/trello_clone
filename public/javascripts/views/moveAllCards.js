var MoveAllCardsView = Backbone.View.extend({
  template: App.templates.moveAllCards,
  className: 'list-actions-menu',

  events: {
    'click i.fa-close': 'remove',
    'click li': 'moveAllCards',
  },

  moveAllCards: function(e) {
    var $el = $(e.target);
    var title = $el.text();
    var targetId = $el.data('id');

    if (title === this.model.get('title')) {
      this.remove();
      return;
    }

    App.trigger('move_all_cards', this.model, targetId);
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