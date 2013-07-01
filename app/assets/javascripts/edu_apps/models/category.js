var Category = Ember.Model.extend({
  name:       Ember.attr(),
  short_name: Ember.attr()
});

Category.adapter = Ember.RESTAdapter.create();
Category.url = "api/v1/categories";
Category.rootKey = 'category';
Category.collectionKey = 'categories';

module.exports = Category;

