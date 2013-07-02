var User           = require('../models/user');
var Category       = require('../models/category');
var EducationLevel = require('../models/education_level');
var LtiApp         = require('../models/lti_app');

var ApplicationRoute = Ember.Route.extend({
  model: function() {
    var token = this.controllerFor('session.login').get('token');
    if (token == undefined || token === 'null') {
      return null;
    } else {
      return User.find(token);
    }
  },

  setupController: function(controller, currentUser) {
    controller.set('model', currentUser);
    // this.controllerFor('categories').set('model', Category.find());
    // this.controllerFor('education_levels').set('model', EducationLevel.find());
    this.controllerFor('apps.index').set('model', LtiApp.find());
    window.APPS = this.controllerFor('apps.index').get('model');
  },

  events: {
    showFlash: function(type, message) {
      this.controllerFor('flash').set('model', { type: type, message: message });
    },

    reloadUser: function() {
      console.log("Reloading user");
      this.controller.get('model').reload();
    },

    loginUser: function(user) {
      this.controller.set('model', user);
      var loginController = this.controllerFor('session.login');
      loginController.set('token', user.get('access_token'));
      this.controllerFor('flash').set('model', { type: 'notice', message: 'You are now logged in!' });

      var attemptedTransition = loginController.get('attemptedTransition');

      if (attemptedTransition) {
        attemptedTransition.retry();
        loginController.set('attemptedTransition', null);
      } else {
        this.transitionTo('apps');
      }
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

