var User = DS.Model.extend({
  email: DS.attr('string'),
  access_token: DS.attr('string')
});

module.exports = User;

