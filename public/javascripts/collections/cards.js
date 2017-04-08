var Cards = Backbone.Collection.extend({
  model: Card,

  setUrl: function() {
    this.url = '/lists/' + this.listId + '/cards';
  },

  initialize: function(models, options) {
    this.listId = options.listId;
    this.setUrl();
  },
});