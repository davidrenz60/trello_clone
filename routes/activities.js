var path = require('path');
var Activities = require(path.resolve(path.dirname(__dirname), 'local_modules/activities.js'));
var _ = require('underscore');

module.exports = function(router) {
  // get all activities
  router.get('/activities', function(req, res) {
    res.json(Activities.get());
  });

  // add a activity
  router.post('/activities', function(req, res) {
    var activity = req.body;
    var activities = Activities.get();

    activity.id = Activities.getLastId();
    activities.push(activity);
    Activities.setActivity(activities);
    res.json(activity);
  });

  // update a activity
  router.put('/activities/:id', function(req, res) {
    var activities = Activities.get();
    var currrentActivity = _(activities).findWhere({ id: +req.body.id });
    _.extend(currrentActivity, req.body);

    Activities.setActivity(activities);
    res.json(currrentActivity);
  });

  // destroy a activity
  router.delete('/activities/:id', function(req, res) {
    var activities = _(Activities.get()).reject(function(activity) {
      return activity.id === +req.params.id;
    });

    Activities.setActivity(activities);
    res.status(200).end();
  });
};