var List = Backbone.Model.extend({
  urlRoot: '/lists',
  defaults: {
    subscribed: false,
  },
});