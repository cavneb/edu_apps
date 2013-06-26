var AppsShowRoute = Ember.Route.extend({
  model: function(params) {
    return App.LtiApp.find(params.app_id);
  },

  serialize: function(model, params) {
    return { app_id: model.get('short_name') };
  }
});

module.exports = AppsShowRoute;

