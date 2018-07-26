// @vulchi.vijay
const $ = jQuery;

$(document).ready(function () {
  // setting height for home section
  $('#home').height($(window).innerHeight());
  // adding class to sticky header
  $(document).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('.sticky-header').addClass('sticky-header--active');
    } else {
      $('.sticky-header').removeClass('sticky-header--active');
    }
  });

  $('.mobile-burger').on('click', function () {
    $(this).toggleClass('is--active');
  });

  // navigation
  $('.primary-nav a').on('click', function () {
    $('.primary-nav a').removeClass('is--active');
    $(this).addClass('is--active');
    setTimeout(function () {
      $('.mobile-burger').removeClass('is--active');
    }, 100);
  });
});
