var Category = DS.Model.extend({
  name:       DS.attr('string'),
  short_name: DS.attr('string')
});

module.exports = Category;

