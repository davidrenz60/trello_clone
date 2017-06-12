var router = new (Backbone.Router.extend({

  routes: {
    'card/:id': 'cardView',
  },

  index: function() {
    if (App.cardView) {
      App.closeCardView();
      return;
    }
  },

  cardView: function(id) {
    App.openCardView(+id);
  },

  initialize: function() {
    this.route(/^\/?$/, 'index', this.index);
  }
}))();

Backbone.history.start({
  pushState: true,
});

$(document).on('click', "a[href^='/']", function(e) {
  e.preventDefault();
  router.navigate($(e.currentTarget).attr('href').replace(/\//, ''), {
    trigger: true,
  });
});
