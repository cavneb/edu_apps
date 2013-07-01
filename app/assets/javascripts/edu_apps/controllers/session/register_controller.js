var SessionRegisterController = Ember.ObjectController.extend({

  save: function() {
    var self = this;
    var user = this.get('model');

    user.on('didCreate', function() {
      debugger;
      self.get('target').send('loginUser', user);
      self.get('target').transitionTo('apps');
    });
    
    this.get('store').commit();
  }

});

module.exports = SessionRegisterController;

