import Stars from '../Stars/Stars';
import CompositeVote from '../CompositeVote/CompositeVote';
import Utils from '../../utils/Utils';
import ReviewService from '../../services/Review.service';
import './style.scss';

class UserReview {
  constructor({ Id, UserId, Username, Comment, Rating, ReviewUpVotes, ReviewDownVotes, ReplyUpVotes, ReplyDownVotes, CreatedAt }, replyButtonColor) {
    this.id = Id;
    this.user = UserId;
    this.username = Username;
    this.comment = Comment;
    this.rating = Rating;
    this.upVotes = Utils.ternary(![null, undefined].includes(ReviewUpVotes), ReviewUpVotes, ReplyUpVotes);
    this.downVotes = Utils.ternary(![null, undefined].includes(ReviewDownVotes), ReviewDownVotes, ReplyDownVotes);
    this.time = CreatedAt;
    this.reply = null;
    this.replyButtonColor = replyButtonColor;
    this.type = Utils.ternary(![null, undefined].includes(ReviewUpVotes), 'review', 'reply');
  }

  create() {
    let reviewBox = document.createElement('div');
    reviewBox.classList.add('ur-review-box');
    let reviewHeader = document.createElement('div');
    reviewHeader.classList.add('ur-review-header');
    let reviewUserBox = document.createElement('div');
    reviewUserBox.classList.add('ur-review-user-box');
    let reviewUserName = document.createElement('p');
    reviewUserName.classList.add('ur-review-user-name');
    reviewUserName.innerText = Utils.getValue(this.username, 'Anonymous User');
    let userAvatar = document.createElement('img');
    userAvatar.classList.add('ur-user-avatar');
    userAvatar.src = 'https://res.cloudinary.com/free-spirit/image/upload/v1591707618/avatar-purple.png';
    reviewUserBox.appendChild(userAvatar);
    reviewUserBox.appendChild(reviewUserName);
    let reviewSubHeader = document.createElement('div');
    reviewSubHeader.classList.add('ur-review-sub-header');
    let reviewTime = document.createElement('p');
    reviewTime.classList.add('ur-review-time');
    let time = new Date(this.time);
    reviewTime.innerText = time.toLocaleString();
    reviewSubHeader.appendChild(reviewTime);
    if (this.type === 'review') {
      let stars = new Stars();
      let reviewRating = stars.createStatic(this.rating);
      let ratingBox = document.createElement('div');
      ratingBox.classList.add('ur-review-stars-box');
      ratingBox.appendChild(reviewRating);
      reviewSubHeader.appendChild(ratingBox);
    }
    reviewHeader.appendChild(reviewUserBox);
    reviewHeader.appendChild(reviewSubHeader);
    let reviewBody = document.createElement('div');
    reviewBody.classList.add('ur-review-body');
    let reviewText = document.createElement('p');
    reviewText.classList.add('ur-review-text');
    reviewText.innerText = this.comment;
    reviewBody.appendChild(reviewText);
    let reviewFooter = document.createElement('div');
    reviewFooter.classList.add('ur-review-footer');
    let reviewVotesBox = document.createElement('div');
    reviewVotesBox.classList.add('ur-review-votes-box');
    let replyIcon = document.createElement('img');
    replyIcon.src = 'https://res.cloudinary.com/free-spirit/image/upload/v1593539325/icons8-reply-arrow-100.png';
    replyIcon.addEventListener('click', this.handleReplyClick.bind(this));
    replyIcon.classList.add('ur-reply-icon');
    replyIcon.dataset.name = 'ur-reply';
    replyIcon.id = `ur-replyIcon-${this.id}`;
    replyIcon.dataset.reviewId = this.id;
    let compositeVote = new CompositeVote(this.id, this.upVotes, this.downVotes);
    let votes = compositeVote.create();
    reviewVotesBox.appendChild(votes);
    reviewFooter.appendChild(reviewVotesBox);
    if (this.type === 'review') reviewFooter.appendChild(replyIcon);
    reviewBox.appendChild(reviewHeader);
    reviewBox.appendChild(reviewBody);
    reviewBox.appendChild(reviewFooter);
    if (this.type === 'review') {
      const replyWrapper = this.getReplyWrapper();
      reviewBox.appendChild(replyWrapper);
    }
    return reviewBox;
  }

  async handleReplyClick(event) {
    const wrapper = document.getElementById(`ur-replyWrapper-${this.id}`);
    if (wrapper.style.display === 'none') {
      if (event.target.dataset.open === 'true') return undefined;
      event.target.dataset.open = 'true';
      const activeReply = localStorage.getItem('activeReply');
      this.resetReply();
      this.handleButtonState();
      if (activeReply) UserReview.closeActiveReply(activeReply);
      localStorage.setItem('activeReply', `ur-replyWrapper-${this.id}`);
      const replies = wrapper.children[2];
      replies.innerHTML = '';
      await this.loadReplies(replies, 1);
      wrapper.style.display = 'flex';
      event.target.dataset.open = 'false';
    } else {
      localStorage.removeItem('activeReply');
      wrapper.style.display = 'none';
      this.count = 0;
    }
  }

  async loadReplies(element, page) {
    const res = await ReviewService.getReviewReplies({ reviewId: this.id, page });
    if (res.data.Data && res.data.Data.records && res.data.Data.records.length) {
      const loadMore = document.getElementById(`ur-loadMore-${this.id}`);
      if (loadMore) element.removeChild(loadMore);
      for (let item of res.data.Data.records) {
        const userReview = new UserReview(item);
        const reply = userReview.create();
        element.appendChild(reply);
      }
      const { page, pages } = res.data.Data;
      if (page && page < pages) {
        const loadMore = this.getLoadMoreButton(page + 1);
        element.appendChild(loadMore);
      }
      return true;
    } else {
      return false;
    }
  }

  getLoadMoreButton(nextPage) {
    let loadMore = document.createElement('button');
    loadMore.addEventListener('click', this.loadMore.bind(this));
    loadMore.innerText = 'Load more';
    loadMore.classList.add('ur-load-more');
    loadMore.id = `ur-loadMore-${this.id}`;
    loadMore.dataset.reviewId = this.id;
    loadMore.dataset.page = nextPage;
    loadMore.dataset.name = 'ur-load-more';
    loadMore.type = 'button';
    return loadMore;
  }

  getReplyWrapper() {
    let replyWrapper = document.createElement('div');
    replyWrapper.style.display = 'none';
    replyWrapper.dataset.name = 'ur-reply-wrapper';
    replyWrapper.classList.add('ur-reply-wrapper');
    replyWrapper.id = `ur-replyWrapper-${this.id}`;
    replyWrapper.dataset.reviewId = this.id;
    let replies = document.createElement('div');
    replies.dataset.name = 'ur-replies';
    replies.classList.add('ur-replies');
    replies.id = `ur-replies-${this.id}`;
    replies.dataset.reviewId = this.id;
    let replyBox = document.createElement('div');
    replyBox.contentEditable = true;
    replyBox.id = `ur-replyBox-${this.id}`;
    replyBox.dataset.reviewId = this.id;
    replyBox.dataset.name = 'ur-reply-box';
    replyBox.classList.add('ur-reply-box');
    replyBox.addEventListener('input', this.handleReplyInput.bind(this));
    let replySubmit = document.createElement('button');
    replySubmit.addEventListener('click', this.handleReplySubmit.bind(this));
    replySubmit.style.backgroundColor = this.replyButtonColor;
    replySubmit.innerText = 'reply';
    replySubmit.classList.add('ur-reply-button');
    replySubmit.disabled = true;
    replySubmit.id = `ur-replyButton-${this.id}`;
    replySubmit.dataset.reviewId = this.id;
    replySubmit.dataset.name = 'ur-reply-submit';
    replySubmit.type = 'button';
    replyWrapper.appendChild(replyBox);
    replyWrapper.appendChild(replySubmit);
    replyWrapper.appendChild(replies);
    return replyWrapper;
  }

  async loadMore(event) {
    const button = event.target;
    button.innerText = 'loading...'
    button.disabled = true;
    const page = button.dataset.page;
    const replies = document.getElementById(`ur-replyWrapper-${this.id}`).children[2];
    const res = await this.loadReplies(replies, page);
    if (!res) {
      button.innerText = 'Load More';
      button.disabled = false;
    }
  }

  async handleReplySubmit(event) {
    const button = event.target;
    const reviewId = button.dataset.reviewId;
    const user = localStorage.getItem('user');
    const username = localStorage.getItem('username');
    const payload = {
      ReviewId: reviewId,
      Comment: this.reply,
      UserId: user,
      Username: username
    };
    const res = await ReviewService.createReviewReply(payload);
    if (res.data.ResponseCode === '00' && res.data.Data) {
      const wrapper = document.getElementById(`ur-replyWrapper-${this.id}`).children[2];
      wrapper.innerHTML = '';
      await this.loadReplies(wrapper, 1);
      this.resetReply();
    }
  }

  static closeActiveReply(id) {
    const reply = document.getElementById(id);
    localStorage.removeItem('activeReply');
    reply.style.display = 'none';
  }

  handleReplyInput(event) {
    this.reply = event.target.innerText;
    this.handleButtonState();
    localStorage.setItem('reply', this.reply);
  }

  resetReply() {
    this.reply = null;
    const box = document.getElementById(`ur-replyBox-${this.id}`);
    box.innerText = '';
  }

  handleButtonState() {
    const button = document.getElementById(`ur-replyButton-${this.id}`);
    if (this.reply) {
      if (button.disabled) {
        button.disabled = false;
      }
    } else {
      button.disabled = true;
    }
  }
}

export default UserReview;
