var Organization = require('../../models/organization');

var SettingsOrganizationsController = Ember.ArrayController.extend({

  deleteMembership: function(membership) {
    var ok = confirm("Are you sure you want to leave " + membership.get('organization.name') + "?");
    if (ok == true) {
      var self = this;
      var request = $.ajax({
        type: 'DELETE',
        url: '/api/v1/memberships/' + membership.get('id'),
        data: { access_token: $.cookie("token") }
      });

      request.done(function( msg ) {
        self.send('showFlash', 'notice', 'You have been successfully removed from the organization.');
        self.send('reloadUser');
      });

      request.fail(function(jqXHR, textStatus) {
        self.send('showFlash', 'error', 'Unable to find membership record in organization');
      });
    }
  }

});

module.exports = SettingsOrganizationsController;

