var SettingsOrganizationsShowController = Ember.ObjectController.extend({

  addMember: function(organization) {
    var data = {
      email: this.get('newMemberEmail'),
      is_admin: this.get('newMemberIsAdmin') === true
    }

    if (data.email.length > 0) {
      var self = this;

      var request = $.ajax({
        type: 'POST',
        url: '/api/v1/organizations/' + organization.get('id') + '/add_member',
        data: data
      });

      request.done(function( msg ) {
        self.send('showFlash', 'notice', 'Added ' + data.get('email') + ' successfully');
        self.send('refresh');
      });

      request.fail(function(jqXHR, textStatus) {
        debugger;
        self.send('showFlash', 'error', 'Unable to find membership record in organization');
      });

    }
  },
  
  removeMembership: function(membership) {
    var name = membership.get('user.name');
    var ok = confirm("Are you sure you want to remove " + name + "?");
    if (ok == true) {
      var self = this;

      var request = $.ajax({
        type: 'DELETE',
        url: '/api/v1/memberships/' + membership.get('id'),
        data: { access_token: $.cookie("token") }
      });

      request.done(function( msg ) {
        self.send('showFlash', 'notice', 'You have successfully removed from the organization.');
        self.send('refresh');
      });

      request.fail(function(jqXHR, textStatus) {
        self.send('showFlash', 'error', 'Unable to find membership record in organization');
      });
    }
  }
});

module.exports = SettingsOrganizationsShowController;

