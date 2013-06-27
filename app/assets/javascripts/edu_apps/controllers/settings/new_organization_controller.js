var SettingsNewOrganizationController = Ember.ObjectController.extend({

  save: function() {
    var self = this;
    form = this.get('model');

    var data = form.getProperties('name');
    data.access_token = localStorage.token;

    var request = $.ajax({
      type: 'POST',
      url: '/api/v1/memberships/create_organization',
      data: data
    });

    request.done(function( msg ) {
      self.send('showFlash', 'notice', 'Organization has been created successfully!');
      self.get('target').transitionTo('settings.organizations');
    });

    request.fail(function(jqXHR, textStatus) {
      console.log(jqXHR.responseText);
      form.set('errors', Ember.Object.create(errors));
    });
  }

});

module.exports = SettingsNewOrganizationController;

