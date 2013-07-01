var AuthenticatedRoute = require('../authenticated_route');

var SettingsProfileRoute = AuthenticatedRoute.extend({
  model: function() {
    return this.controllerFor('application').get('model');
  }
});

module.exports = SettingsProfileRoute;

