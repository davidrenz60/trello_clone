var SearchView = Backbone.View.extend({
  template: App.templates.search,
  attributes: {
    id: 'search',
  },

  render: function() {
    App.$header.find('#search').remove();
    this.$el.html(this.template({ cards: this.cards}));
    this.$el.appendTo(App.$header);
  },

  initialize: function(options) {
    this.cards = options.cards;
    this.render();
  }
});