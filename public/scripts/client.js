/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  let tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  const createTweetElement = function(obj) {

    const markup = `
      <section class="tweet-container">
        <article class="tweet">
          <header>
            <div class="photo-name">
              <img src="${obj.user.avatars}">
              <a class="user-name">&#160&#160${obj.user.name}</a>
            </div>
            <a class="user-id">${obj.user.handle}</a>
          </header>
          <div>
            <a class="tweet-content">${obj.content.text}</a>
          </div>
          <footer>
            <a>${obj.created_at}</a>
            <a><i class="fa-solid fa-flag"></i>&#160&#160<i class="fa-solid fa-retweet"></i>&#160&#160<i class="fa-solid fa-heart"></i></a>
          </footer>
        </article>
      </section>
      `;

    return markup;
  };

  // document.body.innerHTML = markup;

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});
