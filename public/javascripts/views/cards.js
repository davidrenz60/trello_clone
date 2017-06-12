var CardsView = Backbone.View.extend({
  template: App.templates.cards,
  tagName: 'ul',
  className: 'cards',

  setList: function() {
    this.$list = App.$el.find("[list-id='" + this.collection.listId + "']").find('.top');
  },

  cardMoved: function(e, ui) {
    var $el = $(e.target);
    var targetId = +$(e.toElement).closest('.list').attr('list-id');
    var model = this.collection.get(+ui.item.attr('data-id'));
    var fromId = model.get('listId');
    var activity;

    model.set('listId', targetId);
    App.updateCardPositions($el.find('a'));
    App.updateCardPositions(ui.item.parent().find('a'));
    App.cards.trigger('card_move');

    if (targetId !== fromId) {
      activity = {
        type: 'cardMove',
        to: App.lists.get(targetId).get('title'),
        from: App.lists.get(fromId).get('title'),
        cardId: model.get('id'),
        title: model.get('title'),
      };

      App.activities.create(activity);
      App.trigger('activity', model, activity);
    }
  },

  setCardsContext: function() {
    return this.collection.map(function(card) {
      card = card.toJSON();
      card.labels = card.labels.map(function(id) {
        return App.labels.get(id).toJSON();
      });

      card.commentCount = App.comments.where({ cardId: card.id }).length;
      return card;
    });
  },

  bindEvents: function() {
    this.$el.sortable({
      connectWith: '.cards',
      forcePlaceholderSize: true,
      placeholder: 'sortable-placeholder-card',
      stop: this.cardMoved.bind(this),
    });
  },

  render: function() {
    this.$list.parent().find('ul').remove();
    this.$el.attr('list-id', this.collection.listId);

    this.$el.html(this.template({
      cards: this.setCardsContext(),
      listId: this.collection.listId,
    }));

    this.$el.insertAfter(this.$list);
    this.bindEvents();
  },

  initialize: function() {
    this.setList();
    this.render();
  },
});
