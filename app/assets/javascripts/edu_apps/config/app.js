require('../vendor/jquery');
require('../vendor/jquery.cookie');
require('../vendor/handlebars');
require('../vendor/ember');
require('../vendor/ember-data');
require('../vendor/ember-model');
require('../vendor/ember-validations');

Ember.TESTING_DEPRECATION = true;

var App = window.App = Ember.Application.create({ LOG_TRANSITIONS: true });
App.Store = require('./store');

module.exports = App;

