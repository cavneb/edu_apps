var Membership         = require('../../models/membership');
var AuthenticatedRoute = require('../authenticated_route');

var SettingsOrganizationsRoute = AuthenticatedRoute.extend({
  
  model: function() {
    user = this.modelFor('application');
    return user.get('memberships');
  }

});

module.exports = SettingsOrganizationsRoute;

