var App = {
  $el: $('main'),
  $lists: $('#lists'),
  $header: $('header'),
  $modalLayer: $('#modal-layer'),
  templates: JST,

  init: function() {
    this.createBoard();
    this.bindEvents();
  },

  createBoard: function() {
    this.lists.each(function(list) {
      new ListView({ model: list });
    });

    new AddListView({ collection: this.lists });
  },

  cardDetailView: function(listId, position) {
    var card = this.lists.getCard(listId, position);
    this.cardView = new CardDetailView({ model: card, listId: listId });
  },

  closeCardDetailView: function() {
    this.$modalLayer.hide();
    this.cardView.close();
  },

  updateListPositions: function(e, ui) {
    var id = +ui.item.attr('list-id');
    var index = ui.item.index();
    var model = this.lists.remove(id);
    this.lists.add(model, { at: index });
    this.lists.sync('create', this.lists);
  },

  moveAllCards: function(model, targetId) {
    var cards = model.view.cards;
    var target = this.lists.get(targetId).view.cards;

    cards.each(function(card) {
      target.add(card);
    });

    cards.reset();
    this.updateSortOrder(target);
    this.updateSortOrder(cards);
  },

  removeCard: function(model, removedId) {
    var cards = App.lists.get(removedId).view.cards;
    cards.remove(model);
    this.updateSortOrder(cards);
  },

  addCard: function(model, targetId, newIndex) {
    var cards = App.lists.get(targetId).view.cards;
    cards.add(model, { at: newIndex });
    this.updateSortOrder(cards);
  },

  reorderCards: function(cards, card, newIndex) {
    cards.remove(card);
    cards.add(card, {at: newIndex });
    this.updateSortOrder(cards);
  },

  updateSortOrder: function(cards) {
    cards.each(function(card, index) {
      card.set('position', index);
    });

    cards.sync('create', cards);
    cards.trigger('card_moved');
  },

  openSearchView: function(e) {
    e.preventDefault();
    this.search = new SearchView({
      cards: [{description: "this is a test card", listName: 'name', listId: 1, position: 0}, {description: 'another card', listName: 'next list name', listId: 1, position: 0}],
    });
    // iterate through all cards and make this
  },

  closeSearchView: function(e) {
    e.preventDefault();
    this.search.remove();
  },

  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.$lists.sortable({
      forcePlaceholderSize: true,
      placeholder: 'sortable-placeholder',
      stop: this.updateListPositions.bind(this),
    });

    this.on('move_all_cards', this.moveAllCards);
    this.on('remove_card', this.removeCard);
    this.on('add_card', this.addCard);
    this.on('cards_reordered', this.reorderCards);
    this.$header.find('#header-search input').on('focus', this.openSearchView);
    // this.$header.find('#header-search input').on('blur', this.closeSearchView);
  },
};

Handlebars.registerPartial('list', JST.list);

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

Handlebars.registerHelper('format_timestamp', function(time) {
  return moment(time).fromNow();
});

Handlebars.registerHelper('times', function(start, end, block) {
  var accum = '';
  for(var i = start; i <= end; i++)
      accum += block.fn(i);
  return accum;
});