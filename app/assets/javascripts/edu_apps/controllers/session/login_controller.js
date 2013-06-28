var SessionLoginController = Ember.Controller.extend({

  clearToken: function() {
    $.removeCookie("token");
  },

  reset: function() {
    this.setProperties({ email: '', password: '' });
  },

  token: $.cookie("token"),
  
  tokenChanged: function() {
    $.cookie("token", this.get('token'), { expires: 1 })
  }.observes('token')

});

module.exports = SessionLoginController;
