var Membership         = require('../../models/membership');
var AuthenticatedRoute = require('../authenticated_route');

var SettingsOrganizationsRoute = AuthenticatedRoute.extend({
  model: function() {
    user = this.modelFor('application');
    return Membership.find({ access_token: user.get('access_token') });
  },

  events: {
    refresh: function() {
      this.get('controller').set('model', Membership.find({ access_token: user.get('access_token') }));
    }
  }
});

module.exports = SettingsOrganizationsRoute;

