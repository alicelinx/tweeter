/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {  // more modern than $(document).ready(function() {
  const createTweetElement = function(tweet) {

    // prevent cross-site scripting
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    let $tweet = `
      <article class="tweet">
        <header>
          <div class="photo-name">
            <img src="${tweet.user.avatars}">
            <a class="user-name">&#160&#160${tweet.user.name}</a>
          </div>
          <a class="user-id">${tweet.user.handle}</a>
        </header>
          <div>
            <a class="tweet-content">${escape(tweet.content.text)}</a>
          </div>
        <footer>
          <a>${timeago.format(tweet.created_at)}</a>
          <a><i class="fa-solid fa-flag"></i>&#160&#160<i class="fa-solid fa-retweet"></i>&#160&#160<i class="fa-solid fa-heart"></i></a>
        </footer>
      </article>
    `;

    // takes return value and appends it to the tweets container
    $('.tweet-container').prepend($tweet);
  };

  const renderTweets = function(tweets) {

    // empty the container
    $('.tweet-container').empty();

    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      createTweetElement(tweet);
    }
  };

  // fetch tweets
  const loadTweets = function() {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: "GET",
      success: (tweetItems) => {
        $('textarea').val('');
        $('.counter').val('140');
        renderTweets(tweetItems);
      }
    });
  };

  loadTweets();

  // grab the form from DOM
  const $newTweetForm = $('.new-tweet-form');

  // add an event listener that listens for the submit event
  $newTweetForm.on('submit', function(event) {

    // prevent the default behaviour of the submit event (data submission and page refresh)
    event.preventDefault();

    let tweetLength = $('#tweet-text').val().length;
    if (tweetLength > 140) {
      if ($('.exceeds-limit').first().is(':hidden')) {
        $('.no-content').slideUp();
        return $('.exceeds-limit').slideDown('slow');
      }
      return;
    }

    if (!tweetLength) {
      if ($('.no-content').first().is(':hidden')) {
        $('.exceeds-limit').slideUp();
        return $('.no-content').slideDown('slow');
      }
      return;
    }
    // serialize the form data and send it to the server as a query string
    const data = $newTweetForm.serialize();

    // create an AJAX POST request that sends the form data to the server
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'POST',
      data: data,
      success: () => {
        loadTweets();
        $('.exceeds-limit').hide();
        $('.no-content').hide();
      }
    });
  });

  // stretch
  $('.write-new-tweet').on('click', function() {
    if (!$('.new-tweet-form').first().is(':hidden')) {
      return $('.new-tweet-form').slideUp('slow');
    }
    return $('.new-tweet-form').slideDown('slow');
  });
});
