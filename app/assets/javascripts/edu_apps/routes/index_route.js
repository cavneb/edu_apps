var IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('apps');
  }
});

module.exports = IndexRoute;

