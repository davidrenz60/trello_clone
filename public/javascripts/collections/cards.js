var Cards = Backbone.Collection.extend({
  model: Card,

  url: function() {
    return this.url = '/lists/' + this.listId + '/cards';
  },

  initialize: function(models, options) {
    this.listId = options.listId;
  },
});