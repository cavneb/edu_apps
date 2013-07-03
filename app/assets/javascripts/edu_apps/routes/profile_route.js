var User = require('../models/user');

var ProfileRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.set('model', this.controllerFor('application').get('model'));
  }
});

module.exports = ProfileRoute;

