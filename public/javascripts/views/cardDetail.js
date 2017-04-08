var CardDetailView = Backbone.View.extend({
  template: App.templates.cardDetail,
  el: '#card-detail',
  $modalLayer: $('#modal-layer'),

  events: {
    'click .close-modal': 'close',
    'click a.archive': 'deleteCard',
    'blur .title-detail textarea': 'updateCardTitle',
    'submit .open-description': 'updateDescription',
    'click a.edit-description': 'openDescription',
    'click .description-close': 'closeDescription',
    'click a.labels': 'openLabelsView',
    'click div.card-label-box': 'openLabelsView',
    'click a.remove-date': 'removeDueDate',
    'click a.subscribe': 'toggleSubscribe',
    'click a.copy': 'openCopyCardView',
    'click .move-list-action': 'openMoveListView',
    'submit .add-comment': 'addComment',
  },

  addComment: function(e) {
    e.preventDefault();
    var text = $(e.target).find('textarea').val();
    var comment = new Activity({ text: text, comment: true });

    this.model.get('activities').add(comment);
    this.model.set('commentCount', (this.model.get('commentCount') + 1));
    this.syncCards();
    this.render();
  },

  openCopyCardView: function(e) {
    e.preventDefault();
    var list = App.lists.get(this.listId);
    new CopyCardView({
      originalList: list,
      list: list,
      model: this.model,
      parentView: this,
    });
  },

  openLabelsView: function(e) {
    e.preventDefault();
    new LabelsView({
      model: this.model,
      target: $(e.target),
      listId: this.listId,
    });
  },

  openMoveListView: function(e) {
    e.preventDefault();
    var list = App.lists.get(this.listId);
    new MoveCardView({
      originalList: list,
      list: list,
      target: $(e.target),
      model: this.model,
      parentView: this,
    });
  },

  updateDescription: function(e) {
    e.preventDefault();
    var description = $(e.target).find('textarea').val();

    this.model.set('description', description);
    this.syncCards();
    this.closeDescription();
    this.render();
  },

  openDescription: function(e) {
    e.preventDefault();
    this.$el.find('.open-description').show();
  },

  closeDescription: function() {
    this.$el.find('.open-description').hide();
  },

  updateCardTitle: function(e) {
    var title = $(e.target).val();

    this.model.set('title', title);
    this.syncCards();
  },

  deleteCard: function(e) {
    e.preventDefault();
    App.trigger('remove_card', this.model, this.listId);
    this.close();
  },

  close: function() {
    router.navigate('/', { trigger: true });
    this.$el.html();
    this.undelegateEvents();
    this.$modalLayer.hide();
  },

  getDate: function(e) {
    if (!e) { return; }
    var date = new Date(e);

    this.model.set('dueDate', date);
    this.model.get('activities').add({ setDueDate: true, date: date });
    this.syncCards();
    this.render();
  },

  removeDueDate: function(e) {
    e.preventDefault();
    this.model.unset('dueDate');
    this.model.get('activities').add({ removeDueDate: true });
    this.syncCards();
    this.render();
  },

  toggleSubscribe: function(e) {
    e.preventDefault();
    this.model.set('subscribed', !this.model.get('subscribed'));
    this.syncCards();
    this.render();
  },

  syncCards: function() {
    this.model.trigger('card_change');
    this.cards.sync('create', this.cards);
  },

  render: function() {
    var context = this.model.toJSON();
    context.activities = this.model.get('activities').toJSON();
    context.labels = this.model.get('labels').toJSON();
    context.list_title = App.lists.get(this.listId).get('title');

    this.$el.html(this.template(context));
    this.$modalLayer.show();
    $('#datepicker').datepicker({
      showOn: 'button',
      buttonText: 'Due Date',
      onClose: this.getDate.bind(this),
    });
  },

  initialize: function(options) {
    this.listId = options.listId;
    this.cards = App.lists.getCardsFor(this.listId);
    this.listenTo(this.cards, 'label_update', this.render);
    this.render();
  }
});