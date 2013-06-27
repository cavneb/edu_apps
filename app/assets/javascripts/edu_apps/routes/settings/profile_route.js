var AuthenticatedRoute = require('../authenticated_route');

var SettingsProfileRoute = AuthenticatedRoute.extend({
  model: function() {
    return this.modelFor('application');
  }
});

module.exports = SettingsProfileRoute;

