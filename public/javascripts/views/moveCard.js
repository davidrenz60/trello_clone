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
    var $el = $(e.target);
    var listTitle = $el.find('#select-list :selected').val();
    var position = +$el.find('#select-position :selected').val();
    var removedId = this.originalList.get('id');
    var newId = this.list.get('id');

    this.model.get('activities').add({
      cardMove: true,
      from: this.originalList.get('title'),
      to: listTitle,
    });

    App.trigger('remove_card', this.model, removedId);
    App.trigger('add_card', this.model, newId, position);

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
    var newListTitle = $(e.target).val();
    var list = App.lists.findWhere({ title: newListTitle });

    new MoveCardView({
      list: list,
      originalList: this.originalList,
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
    context.max = this.list.get('cards').length;
    context.listTitle = this.list.get('title');
    context.lists = App.lists.pluck('title').map(function(title) {
     return { title: title };
    });

    $('#move-card').remove();
    this.$el.html(this.template(context));
    this.$el.prependTo('#card-detail');
    this.setPosition();
  },

  initialize: function(options) {
    this.target = options.target;
    this.list = options.list;
    this.originalList = options.originalList;
    this.parentView = options.parentView;
    this.render();
  }
});