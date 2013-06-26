var SessionRegisterController = Ember.ObjectController.extend({

  save: function() {
    var self = this;
    var user = this.get('model');


    user.on('didCreate', function() {
      self.get('target').send('loginUser', user);
      self.get('target').transitionTo('apps');
    });
    
    debugger;
    this.get('store').commit();

    // Validation will occur both on the initial validate() and the server-side
    // user.validate().then(function() {
    //   valid = user.get('isValid');
    //   if (valid) {
        // self.get('store').commit();
    //   }
    // });
  }

});

module.exports = SessionRegisterController;

