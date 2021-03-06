var UserPasswordForm = Ember.Object.extend(Ember.Validations.Mixin, {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirmation: '',

  validations: {
    currentPassword: {
      presence: true,
    },
    newPassword: {
      length: { minimum: 6 },
      confirmation: { message: 'must match the password confirmation field' }
    }
  },

  // callbacks

  // becameError: function() {
  //   // handle error case here
  //   console.log('there was an error!');
  // },

  // becameInvalid: function(model) {
  //   // This is needed in order for the validations mixin to work with the rails controller response.
  //   model.set('errors', Ember.Object.create(model.errors));
  //   console.log("Record was invalid because: " + model.get('errors'));
  // }
});

module.exports = UserPasswordForm;
