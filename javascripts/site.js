$(document).ready(function() {

  $(window).scroll(function() {
  	var scroll = $(window).scrollTop();
    if (scroll >= 50) {
        $("header").addClass("sticky");
    } else {
        $("header").removeClass("sticky");
    }
  });

  setTimeout(function() {
  	responsiveVoice.speak($('.logo').text(), "US English Male");
  },1500);

});