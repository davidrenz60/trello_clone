var CardsView = Backbone.View.extend({
  template: App.templates.cards,
  tagName: 'ul',
  className: 'cards',

  events: {
    'click li': 'openCardDetailView',
  },

  setList: function() {
    this.$list = App.$el.find("[list-id='" + this.listId + "']").find('.top');
  },

  cardMoved: function(e, ui) {
    var removedId = +$(e.target).attr('list-id');
    var targetId = +$(e.toElement).closest('.list').attr('list-id');
    var model = this.collection.findWhere({ position: +ui.item.attr('position-id') });
    var newIndex = ui.item.index();

    if (targetId === removedId) {
      App.trigger('cards_reordered', this.collection, model, newIndex);
    } else {
      App.trigger('add_card', model, targetId, newIndex);
      App.trigger('remove_card', model, removedId);
    }
  },

  openCardDetailView: function(e) {
    e.preventDefault();
    var $el = $(e.currentTarget);
    var listId = +$el.closest('ul').attr('list-id');
    var position = +$el.attr('position-id');
    router.navigate('/list/' + listId + '/card/' + position, { trigger: true });
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
    this.collection.view = this;
    this.$list.parent().find('ul').remove();
    this.$el.attr('list-id', this.collection.listId);
    this.$el.html(this.template({ cards: this.collection.toJSON() }));
    this.$el.insertAfter(this.$list);
    this.bindEvents();
  },

  initialize: function(options) {
    this.listId = options.listId;
    this.setList();
    this.render();
  },
});
