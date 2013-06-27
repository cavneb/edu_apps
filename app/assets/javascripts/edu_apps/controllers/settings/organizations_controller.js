var SettingsOrganizationsController = Ember.ArrayController.extend({
  
  save: function() {
    var self = this;
    form = this.get('model');

    var data = form.getProperties('name');
    data.access_token = localStorage.token; // TODO: Refactor

    var request = $.ajax({
      type: 'PUT',
      url: '/api/v1/memberships/create_organization',
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
  },

  delete_membership: function(membership) {
    var ok = confirm("Are you sure you want to leave " + membership.get('organization_name') + "?");
    if (ok == true) {
      var self = this;
      var request = $.ajax({
        type: 'DELETE',
        url: '/api/v1/memberships/' + membership.get('id'),
        data: { access_token: localStorage.token }
      });

      request.done(function( msg ) {
        self.send('showFlash', 'notice', 'You have been successfully removed from the organization.');
        self.send('refresh');
      });

      request.fail(function(jqXHR, textStatus) {
        self.send('showFlash', 'error', 'Unable to find membership record in organization');
      });
    }
  }

});

module.exports = SettingsOrganizationsController;

