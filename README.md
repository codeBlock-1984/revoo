# User Review JS Plugin
User Review plugin for JavaScript.

### Dependencies

This plugin has zero dependencies :grinning:. So you're good to go!

### Features

1. Rating/Review

Logged-in users will be able to submit reviews on a page that has the plugin embedded via the use of rating/review UI elements. The UI elements are described below:

* Star rating: Consists of five stars with a rating value of 1 to 5.
  
  ![star rating](/src/Plugin_JS/docs/assets/stars.png)

* Emoji rating: Consists of 5 emojis with rating values of 1 to 5.

  ![emoji rating](/src/Plugin_JS/docs/assets/emojis.png)

* Comment review: Consists of a textbox where users can type-in review text.
  
  ![comment review](/src/Plugin_JS/docs/assets/comment.png)

* Star-Comment review: A combination of star rating and comment textbox for a composite review.
  
  ![star-comment review](/src/Plugin_JS/docs/assets/star-comment-group.png)


2. Review Stats

The review stats is a graphical display of the review summary for a specific feature. It shows the average **stars** rating, the number of reviews, and a horizontal bar chart with details about the individual frequency of each star rating.

  ![review stats](/src/Plugin_JS/docs/assets/review-stats.png)

3. User Reviews List

This displays a list of all reviews for a specific feature. The list is paginated of course, and a pagination menu can be seen at the bottom of the list to enable navigation between pages.

  ![user reviews list](/src/Plugin_JS/docs/assets/user-reviews.png)

4. User Review Upvoting/Downvoting

Logged-in users can upvote reviews they find helpful, or downvote the ones they don't find helpful by clicking on the upvote (thumbs up) icon or the downvote (thumbs down) icon respectively. The icons are highlighted by a red circle in the image shown below.

  ![voting](/src/Plugin_JS/docs/assets/voting.png)

5. User Review Replies

Logged-in users can comment on reviews by clicking the reply arrow icon which is highlighted by a red circle in the image shown below. A panel opens below the specific review that displays existing comments on the review and a form for adding a new comment.

  ![review comments](/src/Plugin_JS/docs/assets/review-comment.png)


### Setup

1. Register your application with UMS and save your **client secret**, (subsequently referred to as <CLIENT_SECRET> in this section).
2. Next, include the distribution code on your HTML page via a script tag with the `src` attribute set to the plugin's url. For development purposes this will be:
```
http://localhost:3200/index.js
```
3. Create an instance of the plugin in your own JS and initialize it with the appropriate parameters. Ensure that you do this when the DOM is loaded.
Here are at least two ways you can achieve this:
  * Using plain JavaScript:
  ```
  document.addEventListener('DOMContentLoaded', function () {
    let plugin = new UserReviewJSPlugin();
    plugin.init({ secret: <CLIENT_SECRET>, user: <USER_ID>, username: <USERNAME> });
  });
  ```
  * Using jQuery:
  ```
  $(document).ready(function () {
    let plugin = new UserReviewJSPlugin();
    plugin.init({ secret: <CLIENT_SECRET>, user: <USER_ID>, username: <USERNAME> });
  });
  ```
  Note: <CLIENT_SECRET> is the client secret you procurred in step 1. <USER_ID> on the other hand is the currently logged-in user's **UMS** GUID. <USERNAME> is the user's display name which will be displayed on comments and reviews by the user. <USERNAME> will be public, therefore, sensitive user information should not be used.

At this point (if you followed the previous steps correctly), the plugin is ready for consumption.


### Usage

Embedding any of the UI elements of the plugin in a page is very simple. All you have to do is add the relevant classes or id to target elements on your page and the plugin takes it from there.

It is important to note that most plugin elements will require a feature to be specified. This feature is the feature being reviewed (in the case of rating/review elements) or the feature whose stats/reviews is being displayed (for review stats/user review list elements), and it will be referred to as <REVIEW_FEATURE> throughout the rest of this document. Specifying <REVIEW_FEATURE> is done by setting the `data-feature` attibute on the element to <REVIEW_FEATURE>.

1. Adding a **star** rating: add the class `ur-btn-star` to the target element (can be a `button` or `div` for instance). Also set the `data-feature` attribute to <REVIEW_FEATURE>.

2. Adding an **emoji** rating: add the class `ur-btn-emoji` to the target element, and set the `data-feature` attribute to <REVIEW_FEATURE>.

3.  Adding a **comment** review: add the class `ur-btn-comment` to the target element, and set the `data-feature` attribute to <REVIEW_FEATURE>.

4. Adding a **star-comment** review composite: add the class `ur-btn-star-comment` to the target element, and set the `data-feature` attribute to <REVIEW_FEATURE>.

6. Adding a **review stats**: add the class `ur-box-review-stats` to the target element, and set the `data-feature` attribute to <REVIEW_FEATURE>. The target element will serve as a wrapper for the review stats, so a `div`, `section` or similar container element could be used.

7. Adding a **user reviews list**: set the id attribute to `ur-box-user-reviews` on the target element, and set the `data-feature` attribute to <REVIEW_FEATURE>. The target element will serve as a wrapper for the review stats, so a `div`, `section` or similar element could be used. To set the colour of the reply submit button, set the `data-reply-button-color` attribute to your preferred colour. It might be important to note that the button text colour will be white (#ffffff).

NOTE: The rating/review elements open in a modal, therefore, ensure to set the id on a high-level parent container (preferably the `body` element) to `ur-root` in order to avoid display errors. To customize the background colour of the modal submit button, set the `data-modal-button-color` attribute to your preferred colour. The text colour will be white (#ffffff).

### Styling

All the plugin elements are designed to take up 100% width and height of their containers, so you can easily control their dimensions using the wrapper target elements. In the case of the rating/review modal, the dimensions inherit from the viewport.

### Future of the plugin

This is the first release of this plugin, and as such it debuts the main features of the plugin. Future releases would incorporate features that enables clients to have more control over the plugin elements' styling.

See you in the future :rocket: !!!
