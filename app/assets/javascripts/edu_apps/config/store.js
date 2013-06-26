DS.RESTAdapter.configure("plurals", { category: "categories" });

DS.RESTAdapter.reopen({
  namespace: 'api/v1'
});

module.exports = DS.Store.extend({
  revision: 11,
  adapter: DS.RESTAdapter.create()
});
