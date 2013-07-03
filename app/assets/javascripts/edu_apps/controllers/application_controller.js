var User = require('../models/user');

var ApplicationController = Ember.ObjectController.extend({

  token: $.cookie("token") || false,

  tokenChanged: function() {
    if (this.get('token') && (this.get('token').length > 0)) {
      $.cookie("token", this.get('token'));
      this.loadCurrentUser();
      
    } else {
      $.removeCookie("token");
      this.set('model', null);
    }
  }.observes('token'),

  loadCurrentUser: function() {
    // Set all future ajax requests to pass the token in for authorization
    $.ajaxSetup({
      headers: { 'Authorization': 'Bearer ' + this.get('token') }
    });

    if (this.get('token') && (this.get('token').length > 0)) {
      this.set('model', User.find(this.get('token')));
    } else {
      this.set('model', null);
    }
  },

  userLoggedIn: function() {
    if (this.get('model.email') && this.get('model.email').length > 0) {
      return true;
    } else {
      return false;
    }
  }.property('model.email')

});

module.exports = ApplicationController;

