$(document).ready(function() {

  $(window).scroll(function() {
  	var scroll = $(window).scrollTop();
    if (scroll >= 50) {
        $("header").addClass("sticky");
    } else {
        $("header").removeClass("sticky");
    }
  });

  // menu click function
  $('#menu_burger').on('click', function() {
    if($('#main_menu').hasClass('opened')) {
      $('#main_menu').removeClass('opened');
    }
    else {
      $('#main_menu').addClass('opened');
    }
  });

  setTimeout(function() {
    if(responsiveVoice.voiceSupport()) {
      // responsiveVoice.speak("Hello, Welcome to the Vijay's Profile...");
    }
  },1500);


});