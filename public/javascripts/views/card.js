var CardView = Backbone.View.extend({
  template: App.templates.card,
  el: '#card-detail',
  $modal: $('#card-modal'),

  events: {
    'click .close-modal': 'close',
    'click div.click-layer': 'close',
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
    'click .move-list-action': 'openMoveCardView',
    'submit .add-comment': 'addComment',
    'click a.delete-comment': 'deleteComment',
  },

  deleteComment: function(e) {
    e.preventDefault();
    var id = $(e.target).data('id');
    var comment = App.comments.get(id);

    comment.destroy();
  },

  addComment: function(e) {
    e.preventDefault();
    var text = $(e.target).find('textarea').val();
    var comment = {
      text: text,
      cardId: this.model.get('id'),
      title: this.model.get('title'),
    };

    App.comments.create(comment);
    App.trigger('activity', this.model, comment);
  },

  openCopyCardView: function(e) {
    e.preventDefault();
    var collection = App.lists.get(this.model.get('listId'));

    new CopyCardView({
      collection: collection,
      model: this.model,
      parentView: this,
    });
  },

  openLabelsView: function(e) {
    e.preventDefault();
    new LabelsView({
      model: this.model,
      target: $(e.target),
    });
  },

  openMoveCardView: function(e) {
    e.preventDefault();
    var collection = App.lists.get(this.model.get('listId'));

    new MoveCardView({
      collection: collection,
      model: this.model,
      target: $(e.target),
      parentView: this,
    });
  },

  updateDescription: function(e) {
    e.preventDefault();
    var description = $(e.target).find('textarea').val();

    this.model.save('description', description);
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
    this.model.save('title', title);
  },

  deleteCard: function(e) {
    e.preventDefault();
    this.model.destroy();
    this.close();
  },

  close: function() {
    this.stopListening();
    this.$el.empty();
    this.$modal.hide();
    router.navigate('/', { trigger: true });
  },

  getDate: function(e) {
    if (!e) { return; }
    var date = new Date(e);
    var activity = {
      type: 'setDueDate',
      date: date,
      cardId: this.model.get('id'),
      title: this.model.get('title'),
    };

    App.activities.create(activity);
    this.model.save({ dueDate: date }, { wait: true });
    App.trigger('activity', this.model, activity);
  },

  removeDueDate: function(e) {
    e.preventDefault();
    var activity = {
      type: 'removeDueDate',
      cardId: this.model.get('id'),
      title: this.model.get('title'),
    };

    App.activities.create(activity);
    this.model.save({ dueDate: '' });
    App.trigger('activity', this.model, activity);
  },

  toggleSubscribe: function(e) {
    e.preventDefault();
    this.model.save('subscribed', !this.model.get('subscribed'));
  },

  render: function() {
    var labels = this.model.get('labels').map(function(id) {
      return App.labels.get(id).toJSON();
    });

    var comments = _(App.comments.toJSON()).where({ cardId: this.model.get('id') });
    var activities = _(App.activities.toJSON()).where({ cardId: this.model.get('id') });

    this.$el.html(this.template({
      card: this.model.toJSON(),
      listTitle: App.lists.get(this.model.get('listId')).get('title'),
      activities: _(comments.concat(activities)).sortBy('timestamp'),
      labels: labels,
    }));

    this.$modal.show();

    $('#datepicker').datepicker({
      showOn: 'button',
      buttonText: 'Due Date',
      onClose: this.getDate.bind(this),
    });
  },

  initialize: function() {
    this.listenTo(this.model, 'change label_update', this.render);
    this.listenTo(App.comments, 'add remove', this.render);
    this.render();
  }
});