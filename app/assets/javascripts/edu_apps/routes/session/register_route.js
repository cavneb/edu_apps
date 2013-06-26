var SessionRegisterRoute = Ember.Route.extend({
  model: function() {
    user = App.User.createRecord();
    this.controllerFor('debug').set('model', user);
    return user;
  }
});

module.exports = SessionRegisterRoute;

