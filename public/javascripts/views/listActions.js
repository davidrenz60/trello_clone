var ListActionsView = Backbone.View.extend({
  template: App.templates.listActions,
  className: 'list-actions-menu',

  events: {
    'click i.fa-close': 'remove',
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
    this.model.set('subscribed', !this.model.get('subscribed'));
    this.model.save();
    this.remove();
  },

  destroyList: function() {
    this.model.view.remove();
    this.remove();
    this.model.destroy();
  },

  copyList: function() {
    var model;
    var modelCopy = this.model.toJSON();
    delete modelCopy.id;

    model = new List(modelCopy);

    model.save(null, {
      success: function() {
        App.lists.add(model);
        new ListView({ model: model });
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