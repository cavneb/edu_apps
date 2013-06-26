var LtiApp = DS.Model.extend({

  // attributes
  name:                 DS.attr('string'),
  short_name:           DS.attr('string'),
  description:          DS.attr('string'),
  testing_instructions: DS.attr('string'),
  author_name:          DS.attr('string'),
  app_type:             DS.attr('string'),
  ims_cert_url:         DS.attr('string'),
  created_at:           DS.attr('date'),
  updated_at:           DS.attr('date')

});

module.exports = LtiApp;

