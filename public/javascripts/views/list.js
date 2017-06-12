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
    var listId = +this.$el.attr('list-id');
    var card;

    if (!title) {
      this.closeAddCardView();
      return;
    }

    card = App.cards.create({
      title: title,
      listId: listId,
      position: this.cards.length,
    }, {
      context: this,
      success: function(card) {
        this.cards.add(card);
      }
    });

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
      collection: this.cards,
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

      this.model.save({ title: text });
    }
  },

  createCards: function() {
    this.cards = new Cards(App.cards.where({ listId: this.model.get('id') }));
    this.cards.listId = this.model.get('id');
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
    this.createCards();
  },

  initialize: function() {
    this.render();
    this.listenTo(this.model, 'change', this.rerender);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.cards, 'change:dueDate change:subscribed label_update', this.rerender);
    this.listenTo(App.cards, 'card_move', this.rerender);
    this.listenTo(App.comments, 'add remove', this.rerender);
    this.listenTo(App.activites, 'add', this.rerender);
    this.listenTo(App.labels, 'add remove', this.rerender);
  },
});