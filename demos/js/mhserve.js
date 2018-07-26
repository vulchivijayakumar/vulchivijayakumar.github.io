// @vulchi.vijay
const $ = jQuery;

$(document).ready(function () {
  // adding class to sticky header
  $(document).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('.sticky-header').addClass('sticky-header--active');
    } else {
      $('.sticky-header').removeClass('sticky-header--active');
    }
  });

  $('.mobile-burger').on('click', function () {
    $(this).toggleClass();
  });

  // navigation
  $('.primary-nav a').on('click', function () {
    $('.primary-nav a').removeClass('is--active');
    $(this).addClass('is--active');
  });
});
