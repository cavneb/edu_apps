var MembershipOrganizationForm = require('../../models/membership_organization_form');

var SettingsOrganizationsNewRoute = Ember.Route.extend({
  model: function() {
    return new MembershipOrganizationForm;
  }
});

module.exports = SettingsOrganizationsNewRoute;
