$(document).ready(function() {

  $(window).scroll(function() {
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
      responsiveVoice.speak($(this).text());
      if($('#main_menu').hasClass('opened')) {
        $(this).removeClass('active');
        $('#main_menu').removeClass('opened');
      }
      else {
        $(this).addClass('active');
        $('#main_menu').addClass('opened');
      }
    });
    $('#main_menu a').on('click', function() {
      responsiveVoice.speak($(this).text());
      $('#menu_burger').removeClass('active');
      $('#main_menu').removeClass('opened');
    });

    //
    // $('#main_menu a').on('mouseenter', function() {
    //   responsiveVoice.speak($(this).text());
    // });

    

  }

  setTimeout(function() {
    if(responsiveVoice.voiceSupport()) {
      responsiveVoice.speak($('#home').text(), "US English Male");
    }
  },1500);


});