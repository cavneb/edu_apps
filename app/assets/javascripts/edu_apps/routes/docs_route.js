var DocsRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('docs.basics')
  }
});

module.exports = DocsRoute;

