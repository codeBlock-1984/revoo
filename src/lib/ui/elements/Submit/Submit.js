import ReviewService from '../../services/Review.service';
import Comment from '../Comment/Comment';
import Stars from '../Stars/Stars';
import Emojis from '../Emojis/Emojis';
import Utils from '../../utils/Utils';
import './style.scss';

class Submit {
  constructor (color) {
    this.color = color;
    this.rating = '';
    this.comment = '';
    this.secret = null;
    this.user = null;
    this.username = null;
    this.feature = null;
  }

  create() {
    let submit = document.createElement('button');
    submit.classList.add('ur-submit');
    submit.dataset.name = 'submit';
    submit.id = 'ur-submitButton';
    submit.style.backgroundColor = this.color;
    submit.addEventListener('click', this.handleSubmit.bind(this));
    submit.innerText = 'submit';
    return submit;
  }

  async handleSubmit(event) {
    this.setSessionData();
    const flag = this.validate();
    if (!flag) {
      return this.handleError();
    }
    this.initiateLoader();
    const reviewType = this.getReviewType(this.ratingType, this.rating, this.comment);
    const payload = {
      secret: this.secret,
      data: {
        Comment: this.comment,
        Rating: this.rating,
        AppFeature: this.feature,
        UserId: this.user,
        Username: this.username,
        ReviewTypeId: reviewType,
        ParentId: 0
      }
    };
    const response = await ReviewService.create(payload);
    this.handleResult(response);
    localStorage.removeItem('rating');
    localStorage.removeItem('ratingType');
    localStorage.removeItem('comment');
    localStorage.removeItem('starValue');
    Comment.resetComment();
    Stars.resetStars();
    Emojis.resetEmojis('colour');
    event.stopPropagation();
  }

  getReviewType(ratingType, rating, comment) {
    if (ratingType && rating) {
      if (ratingType === 'emoji') {
        return 4;
      } else {
        if (comment) {
          return 1;
        } else {
          return 3;
        }
      }
    } else if (comment) {
      return 2;
    } else {
      return null;
    }
  }

  validate() {
    if (!this.rating && !this.comment) {
      return false;
    } else {
      return true;
    }
  }

  initiateLoader() {
    const resultText = document.getElementById('ur-resultText');
    resultText.classList.remove('ur-error');
    resultText.classList.add('ur-normal');
    resultText.innerText = 'sending...';
  }

  setSessionData() {
    this.rating = Utils.getValue(Number(localStorage.getItem('rating')), 0);
    this.ratingType = localStorage.getItem('ratingType');
    this.comment = Utils.getValue(localStorage.getItem('comment'), '');
    this.secret = localStorage.getItem('secret');
    this.user = localStorage.getItem('user');
    this.username = localStorage.getItem('username');
    this.feature = localStorage.getItem('feature');
  }

  handleResult({ data, error }) {
    let customClass;
    const resultText = document.getElementById('ur-resultText');
    if (error) {
      customClass = 'ur-error';
      resultText.classList.add('ur-error');
      resultText.innerText = 'Oops! Your review could not be sent at this time. Try again later.';
    } else {
      customClass = 'ur-success';
      resultText.classList.add('ur-success');
      resultText.innerText = 'Review sent successfully!';
    }
    this.fadeResult(resultText, customClass);
  }

  handleError() {
    const resultText = document.getElementById('ur-resultText');
    resultText.classList.add('ur-error');
    resultText.innerText = 'You cannot submit nothing';
    setTimeout(() => { this.resetResult(resultText, 'ur-error') }, 3000);
    return undefined;
  }

  resetResult(resultText, customClass, cb=null) {
    resultText.classList.remove(customClass);
    resultText.innerText = '';
    if (cb) cb();
  }

  fadeResult(element, customClass) {
    setTimeout(() => { this.resetResult(element, customClass, location.reload()) }, 4000);
  }
}

export default Submit;
