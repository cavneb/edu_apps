var App = require('./app');

App.Router.map(function() {
  this.resource('tutorials', function() {
    this.route('canvas');
    this.route('moodle');
    this.route('blackboard');
    this.route('desire2learn');
    this.route('sakai');
  });
  this.resource('session', function() {
    this.route('login');
    this.route('register');
  });
  this.resource('docs', function() {
    this.route('basics');
    this.route('extensions');
    this.route('xml');
    this.route('api');
  });
});
