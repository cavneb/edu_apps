var Membership = DS.Model.extend({
  is_admin:     DS.attr('boolean'),
  organization: DS.belongsTo('App.Organization'),
  user:         DS.belongsTo('App.User')
});

module.exports = Membership;

