$(document).ready(function() {

  $("textarea#tweet-text").on('input', function() {
    let remainingLength = 140 - this.textLength;
    let counterHtml = $(this).next().children('.counter')[0]; // link @ https://api.jquery.com/category/traversing/
    counterHtml.innerText = remainingLength;

    if (remainingLength < 0) {
      counterHtml.style.color = 'red';
    } else {
      counterHtml.style.color = '';
    }
  });

  // stretch;
  const scrollTopBtn = $('i.fa-solid.fa-circle-chevron-up');
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 1) {
      $('#write-new-tweet').hide();
      return scrollTopBtn.show();
    } else {
      $('#write-new-tweet').show();
      return scrollTopBtn.hide();
    }
  });

  scrollTopBtn.on('click', function() {
    if ($(window).scrollTop() > 1) {
      $(window).scrollTop(0);
      return $('.new-tweet-form').slideDown('slow');
    }
  });

});