var MembershipOrganizationForm = require('../../models/membership_organization_form');

var SettingsNewOrganizationRoute = Ember.Route.extend({
  model: function() {
    return new MembershipOrganizationForm;
  }
});

module.exports = SettingsNewOrganizationRoute;
