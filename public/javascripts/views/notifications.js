var NotificationsView = Backbone.View.extend({
  template: App.templates.notifications,
  attributes: {
    id: 'notifications',
  },

  events: {
    'click .fa-close': 'close',
  },

  close: function() {
    App.$header.find('.fa-exclamation-circle').hide();
    this.remove();
  },

  render: function() {
    App.$el.find('#notifications').remove();
    this.$el.html(this.template({ notifications: this.collection.toJSON() }));
    this.$el.appendTo(App.$el);
  },

  initialize: function() {
    this.render();
  }
});