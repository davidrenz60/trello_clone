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
    var title = $(e.target).find('textarea').val();
    if (!title) { return; }
    var position = +$el.find('#select-position :selected').val();
    var newId = this.list.get('id');
    var newModel = this.model.clone();

    newModel.set('title', title);
    App.trigger('add_card', newModel, newId, position);

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
    var newListTitle = $(e.target).val();
    var list = App.lists.findWhere({ title: newListTitle });

    new CopyCardView({
      list: list,
      originalList: this.originalList,
      model: this.model,
      parentView: this.parentView,
    });
  },

  render: function() {
    var context = this.model.toJSON();
    context.max = this.list.get('cards').length;
    context.listTitle = this.list.get('title');
    context.lists = App.lists.pluck('title').map(function(title) {
     return { title: title };
    });

    $('#copy-card').remove();
    this.$el.html(this.template(context));
    this.$el.appendTo('#card-detail');
  },

  initialize: function(options) {
    this.list = options.list;
    this.originalList = options.originalList;
    this.parentView = options.parentView;
    this.render();
  }
});