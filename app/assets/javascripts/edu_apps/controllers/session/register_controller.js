var User = require('../../models/user');

var SessionRegisterController = Ember.ObjectController.extend({

  save: function() {

    var self = this;
    var user = this.get('model');
    user.set('name', this.get('name'));
    user.set('email', this.get('email'));
    user.set('password', this.get('password'));
    user.set('password_confirmation', this.get('password_confirmation'));

    user.save().then(
      function(data) {
        self.get('target').send('loginUser', user);
        self.get('target').transitionTo('apps'); 
      }, 
      function(jqXHR, textStatus, errorThrown) {
        errors = JSON.parse(jqXHR.responseText);
        user.set('errors', Ember.Object.create(errors.errors));
      }
    );
  }

});

module.exports = SessionRegisterController;

