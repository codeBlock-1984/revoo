import Stars from './lib/ui/elements/Stars/Stars';
import Emojis from './lib/ui/elements/Emojis/Emojis';
import Comment from './lib/ui/elements/Comment/Comment';
import ReviewService from './lib/ui/services/Review.service';
import ReviewModal from './lib/ui/elements/ReviewModal/ReviewModal';
import UserReview from './lib/ui/elements/UserReview/UserReview';
import ReviewSummary from './lib/ui/elements/ReviewSummary/ReviewSummary';
import PaginationBar from './lib/ui/elements/PaginationBar/PaginationBar';
import Utils from './lib/ui/utils/Utils';
import './styles/style.scss'

class URJSPlugin {
  constructor() {
    this.type  = null;
    this.modalOpen = false;
    this.modalFeature = null;
    this.secret = null;
    this.rootWrapper = null;
    this.starBox = null;
    this.emojiBox = null;
    this.commentBox = null;
    this.starCommentGroup = null;
    this.emojiCommentGroup = null;
    this.userReviews = null;
    this.reviewStats = null;
    this.currentPage = null;
    this.firstRangeNum = 0;
    this.lastRangeNum = 0;
    this.paginationData = null;
  }

  init(credentials) {
    this.setData(credentials);
    this.rootWrapper = document.getElementById('ur-root');
    this.starBox = document.querySelectorAll('.ur-btn-star');
    this.emojiBox = document.querySelectorAll('.ur-btn-emoji');
    this.commentBox = document.querySelectorAll('.ur-btn-comment');
    this.starCommentGroup = document.querySelectorAll('.ur-btn-star-comment-group');
    this.emojiCommentGroup = document.querySelectorAll('.ur-btn-emoji-comment-group');
    this.userReviews = document.getElementById('ur-box-user-reviews');
    this.reviewStats = document.querySelectorAll('.ur-box-review-stats');
    const modalButtonColor = this.rootWrapper.dataset.modalButtonColor;
    let reviewModal = new ReviewModal(modalButtonColor);
    let modal = reviewModal.create();
    this.rootWrapper.appendChild(modal);
    this.rootWrapper.addEventListener('click', this.handleRootClick.bind(this));
    this.configureModal();

    if (this.starBox.length) {
      for (let item of this.starBox) {
        item.dataset.type = 'star';
        item.addEventListener('click', this.showReviewModal.bind(this));
      }
    }
    if (this.emojiBox.length) {
      for (let item of this.emojiBox) {
        item.dataset.type = 'emoji';
        item.addEventListener('click', this.showReviewModal.bind(this));
      }
    }
    if (this.commentBox.length) {
      for (let item of this.commentBox) {
        item.dataset.type = 'comment';
        item.addEventListener('click', this.showReviewModal.bind(this));
      }
    }
    if (this.starCommentGroup.length) {
      for (let item of this.starCommentGroup) {
        item.dataset.type = 'starComment';
        item.addEventListener('click', this.showReviewModal.bind(this));
      }
    }
    if (this.emojiCommentGroup.length) {
      for (let item of this.emojiCommentGroup) {
        item.dataset.type = 'emojiComment';
        item.addEventListener('click', this.showReviewModal.bind(this));
      }
    }
    if (this.userReviews) {
      this.restorePage();
      const page = Utils.getValue(this.currentPage, 1);
      this.loadReviews(page);
    }
    if (this.reviewStats.length) {
      for (let item of this.reviewStats) {
        item.innerText = 'loading review stats...';
        this.getSessionData();
        const feature = item.dataset.feature;
        const payload = { secret: this.secret, feature };
        ReviewService.getReviewStats(payload).then(response => {
          this.handleStatsResult(item, response);
        });
      }
    }
  }

  handleStatsResult(item, response) {
    if (response.data && response.data.Data) {
      let stats = response.data.Data;
      item.innerText = '';
      let reviewSummary = new ReviewSummary(stats);
      let reviewSummaryBox = reviewSummary.create();
      item.appendChild(reviewSummaryBox);
    } else {
      item.innerText = 'Could not load stats.';
    }
  }

  handleRootClick(event) {
    const name = event.target.dataset.name;
    const replyElements = ['ur-reply', 'ur-reply-wrapper', 'ur-reply-box', 'ur-reply-submit'];
    const activeReply = localStorage.getItem('activeReply');
    const isInActiveElement = event.target.closest(".ur-reply-wrapper");
    if (activeReply && !isInActiveElement && !replyElements.includes(name)) UserReview.closeActiveReply(activeReply);
  }

  configureModal() {
    let modalCloseIcon = document.getElementById('ur-modalCloseIcon');
    modalCloseIcon.removeEventListener('click', this.showReviewModal);
    modalCloseIcon.addEventListener('click', this.handleModalClose.bind(this));
  }

  getSessionData() {
    this.secret = Utils.getValue(localStorage.getItem('secret'), '');
  }

  loadReviews(pageToLoad) {
    this.userReviews.innerText = 'loading reviews...';
    this.getSessionData();
    const feature = this.userReviews.dataset.feature;
    const replyButtonColor = this.userReviews.dataset.replyButtonColor;
    localStorage.setItem('reviewsFeature', feature);
    const payload = { secret: this.secret, feature, page: pageToLoad };
    ReviewService.getReviews(payload).then(response => {
      if (response.data && response.data.Data && response.data.Data.records && response.data.Data.records.length) {
        this.userReviews.innerText = '';
        for (let item of response.data.Data.records) {
          if (item.Comment) {
            let userReview = new UserReview(item, replyButtonColor);
            let review = userReview.create();
            this.userReviews.appendChild(review);
          }
        }
        const { page: currentPage, pagesize: pageSize , pages: pageCount  } = response.data.Data;
        this.paginationData = { pageCount, pageSize, currentPage };
        let paginationBar = this.getPaginationBar(this.paginationData);
        paginationBar.addEventListener('click', this.handlePageClick.bind(this));
        this.userReviews.appendChild(paginationBar);
        this.currentPage = pageToLoad;
        this.saveCurrentPage();
      } else {
        this.userReviews.innerText = 'Could not load reviews.';
      }
    });
  }

  setData({ secret, user, username }) {
    localStorage.removeItem('rating');
    localStorage.removeItem('ratingType');
    localStorage.removeItem('comment');
    localStorage.removeItem('starValue');
    localStorage.setItem('secret', secret);
    localStorage.setItem('user', user);
    localStorage.setItem('username', username);
  }

  getStars(feature) {
    let stars = new Stars(feature);
    return stars.create();
  }

  getEmojis(feature) {
    let emojis = new Emojis(feature);
    return emojis.create();
  }

  getComment(feature) {
    let comment = new Comment(feature);
    return comment.create();
  }

  getPaginationBar(paginationData) {
    // const isTruncatedPagination = paginationData.pageCount > 5;
    const isTruncatedPagination = paginationData.pageCount > 10;
    if (isTruncatedPagination) {
      // this.lastRangeNum = this.lastRangeNum || 4;
      this.lastRangeNum = this.lastRangeNum || 9;
    }
    let paginationBar = new PaginationBar({ ...paginationData, firstInRange: this.firstRangeNum, lastInRange: this.lastRangeNum });
    return paginationBar.create();
  }

  handlePageClick(event) {
    let clickedPageElement = event.target;
    let clickedPageElementName;
    if (clickedPageElement.dataset && clickedPageElement.dataset.name) {
      clickedPageElementName = clickedPageElement.dataset.name;
    }
    if (clickedPageElementName === 'pageLink') {
      let page = Number(clickedPageElement.dataset.url);
      if (page !== this.currentPage) {
        this.loadReviews(page);
      }
    } else if (clickedPageElementName === 'navigationButton') {
      let active = clickedPageElement.dataset.active;
      let type = clickedPageElement.dataset.type;
      if (active === 'true') {
        let page;
        if (type === 'left') {
          page = (this.currentPage - 1);
        } else {
          page = (this.currentPage + 1);
        }
        this.loadReviews(page);
      }
    } else if (clickedPageElementName === 'ellipsis') {
      let type = clickedPageElement.dataset.type;
      this.handleNavigationButtonClick(type);
    }
  }

  handleNavigationButtonClick(type) {
    if (type === 'left') {
      if (this.firstRangeNum > 1) {
        this.firstRangeNum--;
        this.lastRangeNum--;
      }
    } else {
      this.lastRangeNum++;
      if (this.firstRangeNum) {
        this.firstRangeNum++;
      } else {
        this.firstRangeNum = 3;
      }
    }
    const paginationBar = this.getPaginationBar(this.paginationData);
    const paginationWrapper = document.getElementById('ur-paginationWrapper');
    paginationWrapper.innerHTML = '';
    paginationWrapper.appendChild(paginationBar);
  }

  showReviewModal(event) {
    this.modalFeature = event.target.dataset.feature;
    localStorage.setItem('feature', this.modalFeature);
    let type = event.target.dataset.type;
    this.type = type;
    let modal = document.getElementById('ur-modalBox');
    let modalBody = document.getElementById('ur-modalBody');
    if (this.modalOpen) return undefined;
    modalBody.innerHTML = '';
    this.createReviewElement(type, modalBody);
    modal.classList.add('ur-show');
    let textBox = document.getElementById(`ur-textBox-${this.modalFeature}`);
    if (textBox) textBox.focus();
    this.modalOpen = true;
    event.stopPropagation();
  }

  handleModalClose(event) {
    this.resetElement(this.type);
    localStorage.removeItem('rating');
    localStorage.removeItem('comment');
    localStorage.removeItem('ratingType');
    localStorage.removeItem('starValue');
    let modal = document.getElementById('ur-modalBox');
    const resultText = document.getElementById('ur-resultText');
    resultText.classList.remove('ur-error');
    resultText.innerText = '';
    modal.classList.remove('ur-show');
    this.modalOpen = false;
    event.stopPropagation();
  }

  saveCurrentPage() {
    localStorage.setItem('currentPage', this.currentPage);
    localStorage.setItem('firstRangeNum', this.firstRangeNum);
    localStorage.setItem('lastRangeNum', this.lastRangeNum);
  }

  restorePage() {
    const feature = this.userReviews.dataset.feature;
    const reviewsFeature = localStorage.getItem('reviewsFeature');
    if (feature === reviewsFeature) {
      this.currentPage = Utils.getValue(Number(localStorage.getItem('currentPage')), null);
      this.firstRangeNum = Utils.getValue(Number(localStorage.getItem('firstRangeNum')), 0);
      this.lastRangeNum = Utils.getValue(Number(localStorage.getItem('lastRangeNum')), 0);
    } else {
      localStorage.removeItem('currentPage');
      localStorage.removeItem('firstRangeNum');
      localStorage.removeItem('lastRangeNum');
    }
  }

  createReviewElement(type, wrapper) {
    let stars, emojis, comment;
    switch (type) {
      case 'star':
        stars = this.getStars(this.modalFeature);
        wrapper.appendChild(stars);
        break;
    
    
      case 'emoji':  
        emojis = this.getEmojis(this.modalFeature);
        wrapper.appendChild(emojis);
        break;
      
      case 'comment':
        comment = this.getComment(this.modalFeature);
        wrapper.appendChild(comment);
        break;

      case 'starComment':
        stars = this.getStars(this.modalFeature);
        comment = this.getComment(this.modalFeature);
        wrapper.appendChild(stars);
        wrapper.appendChild(comment);
        break;

      case 'emojiComment':
        emojis = this.getEmojis(this.modalFeature);
        comment = this.getComment(this.modalFeature);
        wrapper.appendChild(emojis);
        wrapper.appendChild(comment);
        break;

      default:
        break;
    }
  }

  resetElement(type) {
    switch (type) {
      case 'star':
        Stars.resetStars(this.modalFeature);
        break;

      case 'emoji':
        Emojis.resetEmojis('colour', this.modalFeature);
        break;

      case 'comment':
        Comment.resetComment(this.modalFeature);
        break;
    
      case 'starComment':
        Stars.resetStars(this.modalFeature);
        Comment.resetComment(this.modalFeature);
        break;

      case 'emojiComment':
        Emojis.resetEmojis('colour', this.modalFeature);
        Comment.resetComment(this.modalFeature);
        break;

      default:
        break;
    }
  }
}

export default URJSPlugin;
