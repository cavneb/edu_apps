var User           = require('../models/user');
var LtiApp         = require('../models/lti_app');

var ApplicationRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.loadCurrentUser();
  },

  events: {
    showFlash: function(type, message) {
      this.controllerFor('flash').set('model', { type: type, message: message });
    },

    reloadUser: function() {
      this.controller.loadCurrentUser();
    },

    loginWithToken: function(token) {
      this.controller.set('token', token);
      this.controllerFor('flash').set('model', { type: 'notice', message: 'You are now logged in!' });
   
      var loginController = this.controllerFor('session.login');
      var attemptedTransition = loginController.get('attemptedTransition');

      if (attemptedTransition) {
        attemptedTransition.retry();
        this.set('attemptedTransition', null);
      } else {
        this.transitionTo('apps');
      }
    },

    logout: function() {
      var self = this;
      this.controller.set('token', null);
      this.controllerFor('flash').set('model', { type: 'notice', message: 'You have logged out successfully!' });
      this.transitionTo('session.login');
    }
  }
});

module.exports = ApplicationRoute;

