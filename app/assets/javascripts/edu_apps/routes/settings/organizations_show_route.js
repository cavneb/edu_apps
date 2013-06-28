var Membership = require('../../models/membership');

var SettingsOrganizationsShowRoute = Ember.Route.extend({
  model: function(params) {
    return Membership.find(params.membership_id)
  },

  events: {
    error: function(reason, transition) {
      console.log("Error: " + reason);
      this.transitionTo('settings.organizations');
    },

    refresh: function() {
      this.controllerFor('application').get('model').reload();
      this.get('controller.model').reload();
    }
  }

});

module.exports = SettingsOrganizationsShowRoute;

