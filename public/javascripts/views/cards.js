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
    var moveActivity = {
          title: model.get('title'),
          cardMove: true,
          from: App.lists.get(removedId).get('title'),
          to: App.lists.get(targetId).get('title'),
          href: '/list/' + targetId + '/card/' + newIndex,
        };

    if (targetId === removedId) {
      App.trigger('cards_reordered', this.collection, model, newIndex);
    } else {
      App.trigger('add_card', model, targetId, newIndex);
      App.trigger('remove_card', model, removedId);
      model.get('activities').add(moveActivity);

      if (model.get('subscribed')) {
        App.notifications.add(moveActivity);
      }
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
    var context = JSON.parse(JSON.stringify(this.collection));

    this.collection.view = this;
    this.$list.parent().find('ul').remove();
    this.$el.attr('list-id', this.collection.listId);
    this.$el.html(this.template({ cards: context }));
    this.$el.insertAfter(this.$list);
    this.bindEvents();
  },

  initialize: function(options) {
    this.listId = options.listId;
    this.setList();
    this.render();
  },
});
