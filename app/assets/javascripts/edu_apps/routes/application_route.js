var ApplicationRoute = Ember.Route.extend({
  model: function() {
    var token = this.controllerFor('session.login').get('token');
    if (token == undefined || token === 'null') {
      return null;
    } else {
      return App.User.find(token);
    }
  },

  setupController: function(controller, currentUser) {
    controller.set('model', currentUser);
  },

  events: {
    showFlash: function(type, message) {
      this.controllerFor('flash').set('model', { type: type, message: message });
    },

    loginUser: function(user) {
      console.log(user);
      this.controller.set('model', user);
      this.controllerFor('session_login').set('token', user.get('access_token'));
      this.controllerFor('flash').set('model', { type: 'notice', message: 'You are now logged in!' });
      this.transitionTo('apps');
    },

    logout: function() {
      var self = this;
      var token = this.controllerFor('session.login').get('token');
      $.ajax({
        type: 'DELETE',
        url: '/api/v1/sessions',
        data: { access_token: token }
      }).done(function( msg ) {
        console.log(msg);
      });
      self.controller.set('model', null);
      this.controllerFor('session.login').clearToken();
      this.controllerFor('flash').set('model', { type: 'notice', message: 'You have logged out successfully!' });
      this.transitionTo('session.login');
    }
  }
});

module.exports = ApplicationRoute;

