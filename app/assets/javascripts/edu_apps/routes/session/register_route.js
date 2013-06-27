var User = require('../../models/user');

var SessionRegisterRoute = Ember.Route.extend({
  model: function() {
    user = User.createRecord();
    // this.controllerFor('debug').set('model', user);
    return user;
  }
});

module.exports = SessionRegisterRoute;

