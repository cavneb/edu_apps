var User = require('../models/user');

var ProfileRoute = Ember.Route.extend({
  model: function() {
    var token = this.controllerFor('session.login').get('token');
    if (token == undefined || token === 'null') {
      return null;
    } else {
      return User.find(token);
    }
  }
});

module.exports = ProfileRoute;

