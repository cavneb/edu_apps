var ApplicationController = Ember.ObjectController.extend({

  userLoggedIn: function() {
    if (this.get('model.email') && this.get('model.email').length > 0) {
      return true;
    } else {
      return false;
    }
  }.property('model.email')

});

module.exports = ApplicationController;

