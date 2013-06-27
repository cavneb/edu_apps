var Membership = DS.Model.extend({
  is_admin:          DS.attr('boolean'),
  organization_id:   DS.attr('number'),
  organization_name: DS.attr('string')
});

module.exports = Membership;

