require('../vendor/jquery');
require('../vendor/handlebars');
require('../vendor/ember');
require('../vendor/ember-data');
require('../vendor/ember-validations');

Ember.TESTING_DEPRECATION = true;

var App = Ember.Application.create({ LOG_TRANSITIONS: true });
App.Store = require('./store');

module.exports = App;

