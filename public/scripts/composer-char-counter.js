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
});