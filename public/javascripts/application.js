var App = {
  $el: $('main'),
  $lists: $('#lists'),
  $header: $('header'),
  $search: $('#header-search input'),
  templates: JST,

  init: function() {
    this.createBoard();
    this.bindEvents();
  },

  createBoard: function() {
    this.lists.each(function(list) {
      new ListView({ model: list });
    });

    new AddListView();
  },

  openCardView: function(id) {
    this.cardView = new CardView({ model: App.cards.get(id) });
  },

  closeCardView: function() {
    this.cardView.close();
  },

  updateListPositions: function(e, ui) {
    var id = +ui.item.attr('list-id');
    var index = ui.item.index();
    var model = this.lists.remove(id);

    this.lists.add(model, { at: index });
    this.lists.sync('create', this.lists);
  },

  updateCardPositions: function(elements) {
    elements.each(function(idx, el) {
      var id = $(el).data('id');
      App.cards.get(id).save('position', idx);
    });
  },

  openSearchView: function(e) {
    e.preventDefault();
    new SearchView({ cards: [] } );
  },

  closeSearchView: function(e) {
    var $el = $(e.target);
    $el.val('');

    setTimeout(function() {
      App.$header.find("#search").remove();
    }, 100);
  },

  searchAllCards: function(e) {
    var text = $(e.target).val();
    var regex = new RegExp(text, 'i');
    var results = _(App.cards.toJSON()).filter(function(card) {
      if (card.title.search(regex) >= 0) {
        card.listTitle = App.lists.get(card.id).get('title');
        return card;
      }
    });

    new SearchView({ cards: results });
  },

  openNotifications: function(e) {
    e.preventDefault();
    new NotificationsView({ collection: App.notifications });
  },

  alertNotification: function() {
    this.$header.find('.fa-exclamation-circle').show();
  },

  addNotification: function(model, activity) {
    if (model.get('subscribed')) {
      activity.type = activity.type || 'comment';
      this.notifications.add(activity);
    }
  },

  bindEvents: function() {
    _.extend(this, Backbone.Events);

    this.$lists.sortable({
      forcePlaceholderSize: true,
      placeholder: 'sortable-placeholder',
      stop: this.updateListPositions.bind(this),
    });

    this.on('activity', this.addNotification);
    this.listenTo(this.notifications, 'add', this.alertNotification);
    this.$search.on('focus', this.openSearchView);
    this.$search.on('blur', this.closeSearchView);
    this.$search.on('keyup', this.searchAllCards);
    this.$header.find('a.header-button-alerts').on('click', this.openNotifications);
  },
};

Handlebars.registerHelper('if_equal', function(a, b, opts) {
  if (a === b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

Handlebars.registerHelper('if_not_equal', function(a, b, opts) {
  if (a === b) {
    return opts.inverse(this);
  } else {
    return opts.fn(this);
  }
});

Handlebars.registerHelper('format_date', function(date) {
  return moment(date).format('MMM DD YYYY');
});

Handlebars.registerHelper('format_short_date', function(date) {
  return moment(date).format('MMM DD');
});

Handlebars.registerHelper('format_timestamp', function(time) {
  return moment(time).fromNow();
});

Handlebars.registerHelper('times', function(start, end, block) {
  var accum = '';
  for(var i = start; i <= end; i++)
      accum += block.fn(i);
  return accum;
});