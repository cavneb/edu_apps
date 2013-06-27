var AuthenticatedRoute = Ember.Route.extend({

  beforeModel: function(transition) {
    var token = this.controllerFor('session.login').get('token');
    if (!token || token === 'undefined' || token === undefined || token === 'null' || token === null) {
      this.redirectToLogin(transition);
    }
  },

  redirectToLogin: function(transition) {
    this.send('showFlash', 'notice', 'You must log in first');

    var loginController = this.controllerFor('session.login');
    loginController.set('attemptedTransition', transition);
    this.transitionTo('session.login');
  },

  events: {
    error: function(reason, transition) {
      if (reason.status === 401) {
        this.redirectToLogin(transition);
      } else {
        console.log(reason.status);
        alert('Something went wrong');
      }
    }
  }

});

module.exports = AuthenticatedRoute;

