var EducationLevel = Ember.Model.extend({
  name:       Ember.attr(),
  short_name: Ember.attr()
});

EducationLevel.adapter = Ember.RESTAdapter.create();
EducationLevel.url = "api/v1/education_levels";
EducationLevel.rootKey = 'education_level';
EducationLevel.collectionKey = 'education_levels';

module.exports = EducationLevel;

