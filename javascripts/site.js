$(document).ready(function() {

  $(window).scroll(function () {
  	var scroll = $(window).scrollTop();
    if (scroll >= 50) {
      $("header").addClass("sticky");
    } else {
      $("header").removeClass("sticky");
    }
  });


  // voice code

  if(responsiveVoice.voiceSupport()) {
    // example
    // responsiveVoice.speak($('#menu_burger').text());
    // menu click function
    $('#menu_burger').on('click', function() {
      responsiveVoice.speak($(this).text(), "US English Male");
      if($('#main_menu').hasClass('opened')) {
        $(this).removeClass('active');
        $('#main_menu').removeClass('opened');
      } else {
        $(this).addClass('active');
        $('#main_menu').addClass('opened');
      }
    });
    $('#main_menu a').on('click', function() {
      $('#menu_burger').removeClass('active');
      $('#main_menu').removeClass('opened');
      if ($(this).attr('href') == '#about') {
        responsiveVoice.speak($('#about').text(), "US English Male");
      }
      else {
        responsiveVoice.speak($(this).text(), "US English Male");
      }
    });

    //
    // $('#main_menu a').on('mouseenter', function() {
    //   responsiveVoice.speak($(this).text());
    // });
  }

  setTimeout(function () {
    if(responsiveVoice.voiceSupport()) {
      // responsiveVoice.speak($('#home').text(), "US English Male");
    }
  }, 1500);
});
