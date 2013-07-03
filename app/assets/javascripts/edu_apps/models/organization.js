var Organization = Ember.Model.extend({
  
  id:   Ember.attr(),
  name: Ember.attr(),

  // memberships: DS.hasMany('App.Membership'),

  // userCount: function() {
  //   return this.get('memberships').get('length');
  // }.property('memberships.@each'),

  // users: function() {
  //   return this.get('memberships').getEach('user');
  // }.property('memberships.@each.relationshipsLoaded')
  
});

Organization.adapter = Ember.RESTAdapter.create();
Organization.url = 'api/v1/organizations';
Organization.rootKey = 'organization';
Organization.collectionKey = 'organizations';

module.exports = Organization;

