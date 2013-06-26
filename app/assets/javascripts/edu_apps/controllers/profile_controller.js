var ProfileController = Ember.ObjectController.extend({
  
  save: function() {
    var self = this;
    var user = this.get('model');
    
    user.on('didUpdate', function() {
      self.send('showFlash', 'notice', 'Saved');
    });

    // Validation will occur both on the initial validate() and the server-side
    self.get('store').commit();
  },

  isNotDirty: Ember.computed.not('content.isDirty')

});

module.exports = ProfileController;

