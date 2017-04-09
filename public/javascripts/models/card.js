var Card = Backbone.Model.extend({
  defaults: {
    subscribed: false,
    commentCount: 0
  },

  setLabels: function(labels) {
    if (labels instanceof Labels) {
      this.set('labels', labels);
      return;
    }

    if (labels) {
      this.set('labels', new Labels(labels));
    } else {
      this.set('labels', new Labels([]));
    }
  },

  setActivities: function(activities) {
    if (activities instanceof Activities) {
      this.set('activities', activities);
      return;
    }

    if (activities) {
      this.set('activities', new Activities(activities));
    } else {
      this.set('labels', new Activities([]));
    }
  },

  initialize: function(options) {
    this.setLabels(options.labels);
    this.setActivities(options.activities);
  },
});