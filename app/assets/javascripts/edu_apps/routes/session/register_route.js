var User = require('../../models/user');

var SessionRegisterRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('model', User.create());
  }
});

module.exports = SessionRegisterRoute;

