var UserPasswordForm = require('../models/user_password_form');

var ChangePasswordController = Ember.ObjectController.extend({

  reset: function() {
    this.set('model', new UserPasswordForm);
  },

  submit: function() {
    var self = this;
    form = this.get('model');

    // form.validate().then(function() {
    //   valid = form.get('isValid');
    //   if (valid) {

        var data = form.getProperties('currentPassword', 'newPassword', 'newPasswordConfirmation');
        data.access_token = localStorage.token; // TODO: Refactor

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
    //   }
    // });
  }

});

module.exports = ChangePasswordController;

