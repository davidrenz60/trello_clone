var Card = Backbone.Model.extend({
  defaults: {
    subscribed: false,
    labels: [],
    dueDate: '',
  },
});