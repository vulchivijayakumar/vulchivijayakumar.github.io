$('document').ready(function () {
  let _more = $('.more');
  _more.on('click', function () {
    //
    $('.more').removeClass('active');
    $('.toggleDiv').slideUp();
    // 
    $(this).addClass('active');
    $(this).next('.toggleDiv').slideDown();
  });
});
