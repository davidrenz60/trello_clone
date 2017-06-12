var path = require('path');
var Lists = require(path.resolve(path.dirname(__dirname), 'local_modules/lists.js'));
var Cards = require(path.resolve(path.dirname(__dirname), 'local_modules/cards.js'));
var _ = require('underscore');

module.exports = function(router) {
  // get all lists
  router.get('/lists', function(req, res) {
    res.json(Lists.get());
  });

  // add a list or reset all lists
  router.post('/lists', function(req, res) {
    var list = req.body;
    var lists = Lists.get();

    if(_.isArray(req.body)) {
      Lists.setListCollection(list);
      res.json(list);
    } else {
      list.id = Lists.getLastId();
      lists.push(list);
      Lists.setList(lists);
      res.json(list);
    }
  });

  // update a list
  router.put('/lists/:id', function(req, res) {
    var lists = Lists.get();
    var currentList = _(lists).findWhere({ id: +req.body.id });
    _.extend(currentList, req.body);

    Lists.setList(lists);
    res.json(currentList);
  });

  // destroy a list
  router.delete('/lists/:id', function(req, res) {
    var lists = _(Lists.get()).reject(function(list) {
      return list.id === +req.params.id;
    });

    Lists.setList(lists);
    res.status(200).end();
  });
};