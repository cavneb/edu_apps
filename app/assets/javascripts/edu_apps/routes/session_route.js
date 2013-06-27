var User = require('../models/user');

var SessionRoute = Ember.Route.extend({

  events: {
    login: function() {
      var self = this;
      var loginController = this.controllerFor('session.login');
      var data = loginController.getProperties('email', 'password');
      $.post('/api/v1/sessions', data, function(resp) {
        if (resp.user) {
          loginController.set('token', resp.user.access_token);

          // It should work like this: (see http://stackoverflow.com/questions/15419381/bootstrapping-data-in-ember-js/15420204#15420204)
          // App.Store.load(App.User, resp.user);
          // user = App.Store.find(App.User, resp.user.id);

          // However, let's hack it for now
          user = User.find(resp.user.access_token).then(function(results) {
            self.send('loginUser', results);
          });

        } else {
          self.send('showFlash', 'error', 'Invalid username and/or password');
        }
      });
    }
  }

});

module.exports = SessionRoute;

