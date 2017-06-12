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
    this.collection.pluck('id').forEach(function(id) {
      App.cards.get(id).destroy();
    });

    this.remove();
  },

  openMoveCardsView: function() {
    new MoveAllCardsView({
      model: this.model,
      collection: this.collection,
      $container: this.$container
    });

    this.remove();
  },

  openTopAddCardView: function() {
    this.$el.parent().find('.top').show();
    this.remove();
  },

  toggleSubscribe: function() {
    this.model.save({ subscribed: !this.model.get('subscribed') });
    this.remove();
  },

  destroyList: function() {
    this.model.destroy();
    this.remove();
  },

  copyList: function() {
    var listId = this.model.get('id');
    var newList = this.model.clone();
    newList.unset('id');

    App.lists.create(newList, {
      success: function(res) {
        $.ajax({
        url: '/cards/copy',
        method: 'post',
        data: { listId: listId, newId: res.id },
        success: function(cards) {
          App.cards.add(cards);
          new ListView({ model: App.lists.get(cards[0].listId) });
        }
       });
      }
    });

    this.remove();
  },

  render: function() {
    this.$el.html(this.template);
    this.$container.append(this.$el);
  },

  initialize: function(options) {
    this.$container = options.$container;
    this.render();
  },
});