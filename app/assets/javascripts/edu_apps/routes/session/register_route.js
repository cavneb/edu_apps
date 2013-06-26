var SessionRegisterRoute = Ember.Route.extend({
  model: function() {
    return App.User.createRecord();
  }
});

module.exports = SessionRegisterRoute;

