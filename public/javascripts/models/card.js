var Card = Backbone.Model.extend({
  defaults: {
    subscribed: false,
    commentCount: 0
  },

  initialize: function(options) {
    this.set('labels', new Labels(options.labels));
    this.set('activities', new Activities(options.activities));
  },
});