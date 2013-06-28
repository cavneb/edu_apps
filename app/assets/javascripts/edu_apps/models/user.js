var User = DS.Model.extend(Ember.Validations.Mixin, {

  // attributes
  email:                DS.attr('string'),
  access_token:         DS.attr('string'),
  name:                 DS.attr('string'),
  password:             DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  memberships:          DS.hasMany('App.Membership'),

  organizations: function() {
    return this.get('memberships').getEach('organization');
  }.property('memberships.@each.relationshipsLoaded'),

  // validations
  validations: {
    email: { format: /.+@.+\..{2,4}/ },
    password: {
      length: { minimum: 6 },
      confirmation: { message: 'must match the password confirmation field' }
    },
    name: {
      presence: true
    }
  },
  
  // callbacks

  becameError: function() {
    // handle error case here
    console.log('there was an error!');
  },

  becameInvalid: function(model) {
    // This is needed in order for the validations mixin to work with the rails controller response.
    model.set('errors', Ember.Object.create(model.errors));
    console.log("Record was invalid because: " + model.get('errors'));
  }

});

module.exports = User;

