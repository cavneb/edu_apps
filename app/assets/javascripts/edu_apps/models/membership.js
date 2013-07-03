var Membership = Ember.Model.extend({
  id:           Ember.attr(),
  is_admin:     Ember.attr(),
  organization: Ember.attr(),
  user:         Ember.attr()
});

Membership.adapter = Ember.RESTAdapter.create();
Membership.url = 'api/v1/memberships';
Membership.rootKey = 'membership';
Membership.collectionKey = 'memberships';

module.exports = Membership;

