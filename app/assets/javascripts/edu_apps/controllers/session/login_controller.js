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
  }.observes('token')

});

module.exports = SessionLoginController;

