var SessionLoginController = Ember.Controller.extend({

  clearToken: function() {
    localStorage.removeItem('token');
    this.set('token', null);
  },

  reset: function() {
    this.setProperties({ email: '', password: '' });
  },

  token: localStorage.token,
  
  tokenChanged: function() {
    localStorage.token = this.get('token');
  }.observes('token'),

  login: function() {
    var self = this;
    var data = this.getProperties('email', 'password');
    $.post('/api/v1/sessions', data, function(resp) {
      if (resp.user) {
        self.set('token', resp.user.access_token);
        self.get('target').send('loginUser', resp.user);
        self.get('target').transitionTo('apps');
      }
      else {
        self.get('target').send('showFlash', 'error', 'Invalid username and/or password');
      }
    });
  }
});

module.exports = SessionLoginController;

