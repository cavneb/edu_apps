var ProfileRoute = Ember.Route.extend({
  model: function() {
    var token = this.controllerFor('session.login').get('token');
    if (token == undefined || token === 'null') {
      return null;
    } else {
      return App.User.find(token);
    }
  }
});

module.exports = ProfileRoute;

