var ChangePasswordRoute = Ember.Route.extend({
  model: function() {
    return new App.UserPasswordForm;
  }
});

module.exports = ChangePasswordRoute;

