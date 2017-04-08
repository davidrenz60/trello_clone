var router = new (Backbone.Router.extend({

  routes: {
    'list/:listId/card/:position': 'cardDetail',
  },

  index: function() {
    if (App.cardView) {
      App.closeCardDetailView();
      return;
    }
  },

  cardDetail: function(listId, position) {
    App.cardDetailView(+listId, +position);
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
