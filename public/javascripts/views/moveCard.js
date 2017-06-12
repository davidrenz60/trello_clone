var MoveCardView = Backbone.View.extend({
  template: App.templates.moveCard,
  attributes: {
    id: 'move-card',
  },

  events: {
    'click .fa-close': 'remove',
    'change #select-list': 'updateList',
    'change #select-position': 'updatePosition',
    'submit': 'moveCard',
  },

  moveCard: function(e) {
    e.preventDefault();
    var attrs = $(e.target).serializeArray();
    var listId = +attrs[0].value;
    var originalListId = this.model.get('listId');
    var position = +attrs[1].value;
    var cardIds = App.cards.where({ listId: listId }).map(function(card){
      return card.id;
    });
    var activity;

    this.model.set('listId', listId);

    cardIds.splice(position, 0, this.model.get('id'));
    cardIds.forEach(function(cardId, idx) {
      App.cards.get(cardId).save('position', idx);
    });

    App.cards.trigger('card_move');

    activity = {
      title: this.model.get('title'),
      type: 'cardMove',
      from: App.lists.get(originalListId).get('title'),
      to: App.lists.get(listId).get('title'),
      cardId: this.model.get('id'),
    };

    App.activities.create(activity);
    App.trigger('activity', this.model, activity);
    this.remove();
    this.parentView.close();
  },

  updatePosition: function(e) {
    e.preventDefault();
    var position = $(e.target).find(':selected').val();
    this.$el.find('.position-select span.value').text(position);
  },

  updateList: function(e) {
    e.preventDefault();
    var id = +$(e.target).find(':selected').attr('value');
    var collection = App.lists.get(id);

    new MoveCardView({
      collection: collection,
      target: this.target,
      model: this.model,
      parentView: this.parentView,
    });
  },

  setPosition: function() {
    if (this.target.text() === "Move") {
      this.$el.css({ top: 275, right: -157 });
    } else {
      this.$el.css({ top: 80, left: 50 });
    }
  },

  render: function() {
    var context = this.model.toJSON();
    context.positions = App.cards.where({ listId: this.collection.get('id') }).length;
    context.listTitle = this.collection.get('title');
    context.id = this.collection.get('id');
    context.lists = App.lists.toJSON();

    $('#move-card').remove();
    this.$el.html(this.template(context));
    this.$el.prependTo('#card-detail');
    this.setPosition();
  },

  initialize: function(options) {
    this.target = options.target;
    this.parentView = options.parentView;
    this.render();
  }
});