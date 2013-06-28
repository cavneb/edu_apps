var UserPasswordForm = require('../../models/user_password_form');

var SettingsAccountSettingsController = Ember.ObjectController.extend({
  
  reset: function() {
    this.set('model', new UserPasswordForm);
  },

  save: function() {
    var self = this;
    form = this.get('model');

    var data = form.getProperties('currentPassword', 'newPassword', 'newPasswordConfirmation');
    data.access_token = $.cookie("token");

    var request = $.ajax({
      type: 'PUT',
      url: '/api/v1/users/update_password',
      data: data
    });

    request.done(function( msg ) {
      self.send('showFlash', 'notice', 'Saved');
      self.reset();
    });

    request.fail(function(jqXHR, textStatus) {
      console.log(jqXHR.responseText);
      var msg = JSON.parse(jqXHR.responseText);
      var errors = msg.errors;
      errors.newPasswordConfirmation = errors.password_confirmation;
      errors.newPassword = errors.password;
      form.set('errors', Ember.Object.create(errors));
    });
  }

});

module.exports = SettingsAccountSettingsController;

