var LabelsView = Backbone.View.extend({
  template: App.templates.labels,
  attributes: {
    id: 'labels',
  },

  events: {
    'click i.fa-close': 'remove',
    'click a.create-label': 'openCreateLabelView',
    'click i.fa-arrow-left': 'closeCreateLabelView',
    'submit': 'newLabel',
    'click i.fa-trash': 'deleteLabel',
    'click .label-bar': 'toggleLabelStatus',
    'keyup #label-search': 'searchLabels',
  },

  searchLabels: function(e) {
    e.preventDefault();
    var queryText = $(e.target).val();
    this.render(queryText);
  },

  toggleLabelStatus: function(e) {
    var $el = $(e.currentTarget);
    var id = $el.data('id');
    var labelIds = this.model.get('labels');
    var added = labelIds.indexOf(id) === -1;

    if (added) {
      labelIds.push(id);
    } else {
      labelIds = _(labelIds).reject(function(labelId) {
        return labelId === id;
      });
    }

    this.model.save({ labels: labelIds });
    this.model.trigger('label_update');
  },

  deleteLabel: function(e) {
    var id = $(e.target).prev().data("id");
    var label = App.labels.get(id);
    this.removeLabelsFromCards(id);
    label.destroy();
  },

  removeLabelsFromCards: function(id) {
    App.cards.each(function(card) {
      var labelIds = card.get('labels');
      labelIds = _(labelIds).reject(function(labelId) {
        return labelId === id;
      });

      card.save({ labels: labelIds });
    });
  },


  openCreateLabelView: function(e) {
    e.preventDefault();
    this.$el.find('.new-label').show();
    this.$el.find('.pick-label').hide();
  },

  closeCreateLabelView: function() {
    this.$el.find('.new-label').hide();
    this.$el.find('.pick-label').show();
  },

  setPosition: function() {
    if (this.target.text() === "Labels") {
      this.$el.css({ top: 200, right: -147 });
    } else {
      this.$el.css({ top: 125, left: 50 });
    }
  },

  newLabel: function(e) {
    e.preventDefault();
    var $el = $(e.target);
    var title = $el.find("input[type='text']").val();
    var color = $el.find(':checked').val();
    var label = { title: title, color: color };

    App.labels.create(label, { wait: true });
  },

  render: function(queryText) {
    var regex;
    var ids = this.model.get('labels');
    var labels = App.labels.toJSON().map(function(label) {
      if (ids.indexOf(label.id) >= 0) {
        label.selected = true;
      }

      return label;
    });

    if (queryText) {
      regex = new RegExp(queryText, 'i');

      labels = _(labels).filter(function(label) {
        if (label.title.search(regex) >= 0) {
          return label;
        }
      });
    }

    $('#labels').remove();
    this.delegateEvents();
    this.$el.html(this.template({ labels: labels }));
    this.$el.prependTo('#card-detail');
    this.setPosition();

    $("#label-search").val(queryText).focus();

    $("input[type='radio']").checkboxradio({
      icon: false
    });
  },

  initialize: function(options) {
    this.target = options.target;
    this.render();
    this.listenTo(App.labels, 'add remove', this.render.bind(this, ''));
    this.listenTo(this.model, 'change label_update', this.render.bind(this, ''));
  }
});