var ListActionsView = Backbone.View.extend({
  template: App.templates.listActions,
  className: 'list-actions-menu',

  events: {
    'click i.fa-close': 'remove',
    'click div.click-layer': 'remove',
    'click li.archive': 'destroyList',
    'click li.copy': 'copyList',
    'click li.subscribe': 'toggleSubscribe',
    'click li.add-card': 'openTopAddCardView',
    'click li.move-all-cards': 'openMoveCardsView',
    'click li.archive-cards': 'deleteAllCards',
  },

  deleteAllCards: function() {
    this.cards.reset();
    this.cards.sync('create', this.cards);
  },

  openMoveCardsView: function() {
    new MoveAllCardsView({
      model: this.model,
      $container: this.$container
    });

    this.remove();
  },

  openTopAddCardView: function() {
    this.$el.parent().find('.top').show();
    this.remove();
  },

  toggleSubscribe: function() {
    App.trigger('list_update', this.model, { subscribed: !this.model.get('subscribed') });
    this.remove();
  },

  destroyList: function() {
    this.model.destroy();
    this.remove();
  },

  copyList: function() {
    var clone = this.model.clone();
    clone.unset("id");

    clone.save(null, {
      success: function(res) {
        var list = new List(res.attributes); // wait for id so card collection listId property can be set
        App.lists.add(list);
        new ListView({ model: list });
      }
    });

    this.remove();
  },

  render: function() {
    this.$el.html(this.template);
    this.$container.append(this.$el);
  },

  initialize: function(options) {
    this.cards = options.cards;
    this.$container = options.$container;
    this.render();
  },
});