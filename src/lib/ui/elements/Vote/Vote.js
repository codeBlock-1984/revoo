import ReviewService from '../../services/Review.service';
import './style.scss';

class Vote {
  constructor(reviewId, value, type) {
    this.reviewId = reviewId;
    this.value = value;
    this.type = type;
    this.active = false;
  }

  create() {
    let voteBox = document.createElement('div');
    voteBox.classList.add('ur-vote-box');
    let voteIcon = document.createElement('img');
    voteIcon.id = `${this.getAlias()}-${this.reviewId}`;
    // voteIcon.addEventListener('click', this.handleClick.bind(this));
    voteIcon.classList.add('ur-vote-icon');
    voteIcon.src = this.getIconUrl('inactive');
    let voteText = document.createElement('p');
    voteText.classList.add('ur-vote-text');
    voteText.innerText = `${this.value}`;
    voteBox.appendChild(voteIcon);
    voteBox.appendChild(voteText);
    return voteBox;
  }

  async handleClick(event) {
    let icon = event.target;
    let iconText = icon.nextElementSibling;
    if (!this.active) {
      const res = await this.registerVote();
      if (res) {
        this.updateActiveStatus();
        icon.src = this.getIconUrl('active');
        this.increaseValue(iconText);
      }
    } else {
      this.updateActiveStatus();
      icon.src = this.getIconUrl('inactive');
      this.decreaseValue(iconText);
    }
  }

  async registerVote() {
    const user = localStorage.getItem('user');
    const username = localStorage.getItem('username');
    const voteTypeId = this.getVoteTypeId();
    const data = {
      ReviewId: this.reviewId,
      UserId: user,
      Username: username,
      ReviewVoteTypeId: voteTypeId
    };
    const response = await ReviewService.createReviewVote(data);
    if (response.data.ResponseCode === '00') {
      return true;
    } else {
      return false;
    }
  }

  resetValue(vote) {
    vote.src = this.getIconUrl('inactive', this.type);
    let iconText = vote.nextElementSibling;
    if (this.active) {
      this.updateActiveStatus();
      this.decreaseValue(iconText);
    }
  }

  increaseValue(element) {
    this.value++;
    element.innerText = this.value;
  }

  decreaseValue(element) {
    this.value--;
    element.innerText = this.value;
  }
  
  updateActiveStatus() {
    this.active = !this.active;
  }

  getVoteTypeId() {
    const ids = {
      up: 1,
      down: 2
    };
    return ids[this.type];
  }

  getIconUrl(status) {
    const icons = {
      'inactive': {
        'up': 'https://res.cloudinary.com/free-spirit/image/upload/v1591707618/gray-thumbs-up.png',
        'down': 'https://res.cloudinary.com/free-spirit/image/upload/v1591707618/gray-thumbs-down.png'
      },
      'active': {
        'up': 'https://res.cloudinary.com/free-spirit/image/upload/v1591707618/active-thumbs-up.png',
        'down': 'https://res.cloudinary.com/free-spirit/image/upload/v1591707618/active-thumbs-down.png'
      },
    };

    return icons[status][this.type];
  }

  getAlias() {
    const aliases = {
      'up': 'u',
      'down': 'd'
    };
    return aliases[this.type];
  }
}

export default Vote;
