var Comment = Backbone.Model.extend({
  defaults: {
    timestamp: new Date().getTime(),
  }
});