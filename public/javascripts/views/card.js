var CardView = Backbone.View.extend({
  template: App.templates.card,
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
    'click a.delete-comment': 'deleteComment',
  },

  deleteComment: function(e) {
    e.preventDefault();
    var index = $(e.target).closest('li').index();
    var activities = this.model.get('activities');
    var comment = activities.at(index);

    activities.remove(comment);
    this.model.set('commentCount', this.model.get('commentCount') - 1);
    this.syncCards();
  },

  addComment: function(e) {
    e.preventDefault();
    var text = $(e.target).find('textarea').val();
    var comment = new Activity({
      text: text,
      comment: true,
      title: this.model.get('title'),
      href: Backbone.history.fragment,
    });

    this.model.get('activities').add(comment);
    this.model.set('commentCount', (this.model.get('commentCount') + 1));

    App.trigger('activity', this.model, comment);
    this.syncCards();
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
    var dateActivity = {
      setDueDate: true,
      date: date,
      href: Backbone.history.fragment,
      title: this.model.get('title'),
    };

    this.model.set('dueDate', date);
    this.model.get('activities').add(dateActivity);

    App.trigger('activity', this.model, dateActivity);
    this.syncCards();
  },

  removeDueDate: function(e) {
    e.preventDefault();
    var removeDateActivity = {
      removeDueDate: true,
      href: Backbone.history.fragment,
      title: this.model.get('title'),
    };

    this.model.unset('dueDate');
    this.model.get('activities').add(removeDateActivity);

    App.trigger('activity', this.model, removeDateActivity);

    this.syncCards();
  },

  toggleSubscribe: function(e) {
    e.preventDefault();
    this.model.set('subscribed', !this.model.get('subscribed'));
    this.syncCards();
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
    this.listenTo(this.model, 'card_change', this.render);
    this.render();
  }
});