var ListView = Backbone.View.extend({
  template: App.templates.list,
  className: 'list',
  duration: 100,

  events: {
    'click a.list-actions-button': 'showListActionsMenu',
    'click h3': 'openEditTitleView',
    'blur textarea.edit-title': 'closeEditTitleView',
    'keypress textarea.edit-title': 'closeEditTitleView',
    'click div.add-card': 'openAddCardView',
    'click a.cancel': 'closeAddCardView',
    'submit': 'newCard',
  },

  newCard: function(e) {
    e.preventDefault();
    var title = $(e.target).find('textarea').val();

    if (!title) {
      this.closeAddCardView();
      return;
    }

    var card = new Card({
      title: title,
      position: this.cards.length,
    });

    this.cards.add(card);
    this.cards.sync('create', this.cards);
    this.closeAddCardView();
  },

  openAddCardView: function() {
    this.$('.add-card-form.bottom').slideDown(this.duration);
  },

  closeAddCardView: function() {
    this.$('.add-card-form').slideUp(this.duration);
    return false;
  },

  showListActionsMenu: function(e) {
    e.preventDefault();
    new ListActionsView({
      model: this.model,
      cards: this.cards,
      $container: this.$el
    });
  },

   openEditTitleView: function(e) {
    $(e.target).next().show().focus();
  },

  closeEditTitleView: function(e) {
    if (e.which === 13 || e.type === 'focusout') {
      e.preventDefault();
      var $textarea = $(e.target);
      var text = $textarea.val();

      if (!text) {
        $textarea.hide();
        return;
      }

      var attr = { title: text};
      App.trigger('list_update', this.model, attr);
    }
  },

  createCards: function() {
    new CardsView({ collection: this.cards });
  },

  rerender: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.createCards();
  },

  render: function() {
    this.$el.attr('list-id', this.model.get('id'));
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo(App.$lists);
  },

  initialize: function() {
    this.cards = this.model.get('cards');
    this.render();
    this.createCards();
    this.listenTo(this.model, 'list_change', this.rerender);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.cards, 'reset add card_moved card_change label_update', this.rerender);
  },
});