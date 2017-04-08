var Card = Backbone.Model.extend({
  defaults: {
    subscribed: false,
  },

  initialize: function(options) {
    this.set('comments', new Comments(options.comments));
    this.set('labels', new Labels(options.labels));
  },
});