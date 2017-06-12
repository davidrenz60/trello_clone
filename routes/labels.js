var path = require('path');
var Labels = require(path.resolve(path.dirname(__dirname), 'local_modules/labels.js'));
var _ = require('underscore');

module.exports = function(router) {
  // get all labels
  router.get('/labels', function(req, res) {
    res.json(Labels.get());
  });

  // add a label
  router.post('/labels', function(req, res) {
    var label = req.body;
    var labels = Labels.get();

    label.id = Labels.getLastId();
    labels.push(label);
    Labels.setLabel(labels);
    res.json(label);
  });

  // update a label
  router.put('/labels/:id', function(req, res) {
    var labels = Labels.get();
    var currentLabel = _(labels).findWhere({ id: +req.body.id });
    _.extend(currentLabel, req.body);

    Labels.setLabel(labels);
    res.json(currentLabel);
  });

  // destroy a label
  router.delete('/labels/:id', function(req, res) {
    var labels = _(Labels.get()).reject(function(label) {
      return label.id === +req.params.id;
    });

    Labels.setLabel(labels);
    res.status(200).end();
  });
};