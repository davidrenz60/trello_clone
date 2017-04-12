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
    var text = $(e.target).val();
    var regex = new RegExp(text, 'i');
    var context = _(App.labels.toJSON()).filter(function(label) {
      if (label.title.search(regex) >= 0) {
        return label;
      }
    });

    this.render(context, text);
  },

  toggleLabelStatus: function(e) {
    var $el = $(e.currentTarget);
    var color = $el.attr('data-color');
    var title = $el.find('p').text();
    var attrs = { color: color, title: title };
    var labels = this.model.get('labels');
    var label = labels.findWhere(attrs);
    var cards = App.lists.getCardsFor(this.listId);

    label ? labels.remove(label) : labels.add(attrs);

    cards.trigger('label_update');
    cards.sync('create', cards);
  },

  deleteLabel: function(e) {
    var $el = $(e.target);
    var color = $el.prev().attr('data-color');
    var title = $(e.target).prev().find('p').text();
    var attrs = { color: color, title: title };
    var model = App.labels.findWhere(attrs);

    App.labels.remove(model);
    App.labels.sync('create', App.labels);

    this.removeLabelsFromLists(attrs);
    this.render();
  },

  removeLabelsFromLists: function(attrs) {
    App.lists.forEach(function(list) {
      var cards = list.get('cards');

      cards.forEach(function(card) {
        var labels = card.get('labels');
        card.set('labels', new Labels(labels.reject(attrs)));
      });

      cards.sync('create', cards);
      cards.trigger('label_update');
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

    App.labels.add({
      title: title,
      color: color
    });

    App.labels.sync('create', App.labels);
    this.render();
  },

  render: function(context, queryText) {
    if (!context) {
      context = App.labels.toJSON();
    }

    this.model.get('labels').forEach(function(label) {
      var existingLabel = _.findWhere(context, label.toJSON());
      if (existingLabel) {
        existingLabel.selected = true;
      }

    });

    $('#labels').remove();
    this.delegateEvents();
    this.$el.html(this.template({ AllLabels: context }));
    this.$el.prependTo('#card-detail');
    this.setPosition();

    $("input[type='radio']").checkboxradio({
      icon: false
    });

    if (queryText) {
      $("#label-search").val(queryText).focus();
    }
  },

  initialize: function(options) {
    this.listId = options.listId;
    this.target = options.target;
    this.$container = options.$container;
    this.render();
  }
});