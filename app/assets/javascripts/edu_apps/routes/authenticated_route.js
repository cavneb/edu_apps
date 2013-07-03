var AuthenticatedRoute = Ember.Route.extend({

  beforeModel: function(transition) {
    var applicationController = this.controllerFor('application');
    var token = applicationController.get('token');
    if (!token || token === 'undefined' || token === undefined || token === 'null' || token === null) {
      this.redirectToLogin(transition);
    }
  },

  redirectToLogin: function(transition) {
    this.controllerFor('flash').set('model', { type: 'notice', message: 'You must log in first' });

    var loginController = this.controllerFor('session.login');
    loginController.set('attemptedTransition', transition);
    this.transitionTo('session.login');
  },

  events: {
    error: function(reason, transition) {
      if (reason.status === 401) {
        this.redirectToLogin(transition);
      } else {
        this.redirectToLogin(transition);
      }
    }
  }

});

module.exports = AuthenticatedRoute;

