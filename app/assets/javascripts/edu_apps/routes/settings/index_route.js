var SettingsIndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('settings.profile');
  }
});

module.exports = SettingsIndexRoute;

