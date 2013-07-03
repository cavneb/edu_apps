var SettingsProfileController = Ember.ObjectController.extend({
  save: function() {
    var self = this;
    var user = this.get('model');

    user.set('name', this.get('name'));
    user.set('email', this.get('email'));

    user.save().then(
      function(data) {
        self.send('showFlash', 'notice', 'Saved');
      }, 
      function(jqXHR, textStatus, errorThrown) {
        errors = JSON.parse(jqXHR.responseText);
        user.set('errors', Ember.Object.create(errors.errors));
      }
    );
  }
});

module.exports = SettingsProfileController;

