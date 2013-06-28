var Organization = DS.Model.extend({
  name: DS.attr('string'),
  memberships: DS.hasMany('App.Membership'),

  users: function() {
    return this.get('memberships').getEach('user');
  }.property('memberships.@each.relationshipsLoaded')
  
});

module.exports = Organization;

