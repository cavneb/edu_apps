var SessionLoginController = Ember.Controller.extend({
  needs: ['application'],

  reset: function() {
    this.setProperties({ email: 'cavneb@gmail.com', password: 'tanner' });
  },

  login: function() {
    var self = this;
    var data = this.getProperties('email', 'password');
    var applicationController = this.get('controllers.application');

    $.post('/api/v1/users/authenticate', data, function(resp) {
      if (resp.token) {
        self.send('loginWithToken', resp.token);
      } else {
        self.send('showFlash', 'error', 'Invalid username and/or password');
      }
    });

  }

});

module.exports = SessionLoginController;
