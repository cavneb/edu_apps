var FlashController = Ember.ObjectController.extend({
  content: null,

  hide: function() {
    console.log("hiding...");
    $('#flash-view').css({
      top: "85px"
    }).animate({
      opacity: "toggle",
      top: "-=135px"
    }, 500);
  },

  show: function(content, view) {
    if (this.get('content')) {
      $('#flash-view').css({
        top: "-50px"
      }).animate({
        opacity: "toggle",
        top: "+=135px"
      }, 500);
      setTimeout(this.hide, 4000);
    }
  }.observes('content')

});

module.exports = FlashController;

