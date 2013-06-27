var UserPasswordForm = require('../models/user_password_form');

var ChangePasswordRoute = Ember.Route.extend({
  model: function() {
    return new UserPasswordForm;
  }
});

module.exports = ChangePasswordRoute;

