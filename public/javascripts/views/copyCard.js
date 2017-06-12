var CopyCardView = Backbone.View.extend({
  template: App.templates.copyCard,
  attributes: {
    id: 'copy-card',
  },

  events: {
    'click .fa-close': 'remove',
    'change #select-list': 'updateListOptions',
    'change #select-position': 'updatePositionOptions',
    'submit': 'copyCard',
  },

  copyCard: function(e) {
    e.preventDefault();
    var $el = $(e.target);
    var attrs = $el.serializeArray();
    var title = $el.find('textarea').val();
    this.listId = +attrs[0].value;
    var position = +attrs[1].value;
    var model = this.model.clone();

    model.unset('id').set({
      title: title,
      position: position
    });

    App.cards.create(model, {
      success: function(res) {
        var cardIds = App.cards.where({ listId: this.listId }).map(function(card){
          return card.id;
        });

        res.set('listId', this.listId);
        cardIds.splice(res.get('position'), 0, res.id);
        cardIds.forEach(function(cardId, idx) {
          App.cards.get(cardId).save('position', idx);
        });

        App.cards.trigger('card_move');
      },
        context: this,
    });

    this.remove();
    this.parentView.close();
  },

  updatePositionOptions: function(e) {
    e.preventDefault();
    var position = $(e.target).find(':selected').val();
    this.$el.find('.position-select span.value').text(position);
  },

  updateListOptions: function(e) {
    e.preventDefault();
    var id = +$(e.target).find(':selected').attr('value');
    var collection = App.lists.get(id);

    new CopyCardView({
      collection: collection,
      model: this.model,
      parentView: this.parentView,
    });
  },

  render: function() {
    var context = this.model.toJSON();
    context.positions = App.cards.where({ listId: this.collection.get('id') }).length;
    context.listTitle = this.collection.get('title');
    context.id = this.collection.get('id');
    context.lists = App.lists.toJSON();

    $('#copy-card').remove();
    this.$el.html(this.template(context));
    this.$el.appendTo('#card-detail');
  },

  initialize: function(options) {
    this.parentView = options.parentView;
    this.render();
  }
});