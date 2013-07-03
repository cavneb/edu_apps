var User = Ember.Model.extend(Ember.Validations.Mixin, {

  // attributes
  id:                    Ember.attr(),
  email:                 Ember.attr(),
  name:                  Ember.attr(),
  password:              Ember.attr(),
  password_confirmation: Ember.attr(),
  access_token:          Ember.attr(),
  memberships:           Ember.attr(),

  // organizations: function() {
  //   return this.get('memberships').getEach('organization');
  // }.property('memberships.@each.relationshipsLoaded'),
});

User.adapter = Ember.RESTAdapter.create();
User.url = 'api/v1/users';
User.rootKey = 'user';
User.collectionKey = 'users';

module.exports = User;

