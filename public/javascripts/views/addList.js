var AddListView = Backbone.View.extend({
  template: App.templates.addList,
  el: '#add-list',
  duration: 100,

  events: {
    'submit': 'newList',
    'click p.add-list': 'openAddListForm',
    'click a.cancel': 'hideAddListForm',
  },

   openAddListForm: function() {
    this.$('.add-list-form').slideDown(this.duration);
    this.$("input[type='text']").focus();
  },

   hideAddListForm: function() {
    this.$('.add-list-form').slideUp(this.duration);
  },

  newList: function(e) {
    e.preventDefault();
    var $form = $(e.target);
    var title = $form.find("input[type='text']").val();
    var model = new List({ title: title });

    if (!title) {
      this.hideAddListForm();
      return;
    }

    model.save(null, {
      success: function() {
        App.lists.add(model);
        new ListView({ model: model });
      }
    });

    $form.get(0).reset();
    this.$('.add-list-form').hide();
  },

  render: function() {
    this.$el.html(this.template);
  },

  initialize: function() {
    this.render();
  },
});