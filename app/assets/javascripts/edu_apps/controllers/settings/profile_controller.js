var SettingsProfileController = Ember.ObjectController.extend({
  save: function() {
    var self = this;
    var user = this.get('model');
    
    user.on('didUpdate', function() {
      self.send('showFlash', 'notice', 'Saved');
    });

    self.get('store').commit();
  },

  isNotDirty: Ember.computed.not('content.isDirty')
});

module.exports = SettingsProfileController;

