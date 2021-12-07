import ChartBar from '../ChartBar/ChartBar';
import Stars from '../Stars/Stars';
import Utils from '../../utils/Utils';
import './style.scss';

class ReviewSummary {
  constructor({ Rating1=0, Rating2=0, Rating3=0, Rating4=0, Rating5=0, AverageRatings=0, TotalUsers=0 }) {
    this.ratings = {
      1: Rating1,
      2: Rating2,
      3: Rating3,
      4: Rating4,
      5: Rating5
    };
    this.averageRating = AverageRatings;
    this.reviewCount = TotalUsers;
  }

  create() {
    let reviewSummaryBox = document.createElement('div');
    reviewSummaryBox.classList.add('ur-review-summary-box');
    let reviewSummaryHeader = document.createElement('div');
    reviewSummaryHeader.classList.add('ur-review-summary-header');
    let reviewSummaryTitleWrapper = document.createElement('div');
    reviewSummaryTitleWrapper.classList.add('ur-review-summary-title-wrapper');
    let reviewSummaryTitle = document.createElement('div');
    reviewSummaryTitle.classList.add('ur-review-summary-title');
    let ratingValue = document.createElement('span');
    ratingValue.classList.add('ur-average-rating-value');
    ratingValue.innerText = Utils.getValue(this.averageRating, '__');
    let ratingTotal = document.createElement('span');
    ratingTotal.classList.add('ur-average-rating-total');
    ratingTotal.innerText = '/ 5';
    reviewSummaryTitle.appendChild(ratingValue);
    reviewSummaryTitle.appendChild(ratingTotal);
    reviewSummaryTitleWrapper.appendChild(reviewSummaryTitle);
    let reviewUsersWrapper = document.createElement('div');
    reviewUsersWrapper.classList.add('ur-review-users-wrapper');
    let reviewUsers = document.createElement('h3');
    reviewUsers.innerText = `${Utils.getValue(this.reviewCount, 'No')} ${Utils.ternary(this.reviewCount !== 1, 'user reviews', 'user review')}`;
    reviewUsers.classList.add('ur-review-users');
    reviewUsersWrapper.appendChild(reviewUsers);
    let reviewChartBox = document.createElement('div');
    reviewChartBox.classList.add('ur-review-chart-box');
    let stars = new Stars();
    let reviewRating = stars.createStatic(this.averageRating);
    let ratingBox = document.createElement('div');
    ratingBox.classList.add('ur-stats-stars-box');
    ratingBox.appendChild(reviewRating);
    if (this.reviewCount) {
      let count = 5;
      while (count > 0) {
        let label = `${count} star`;
        let percentage = this.getPercentage(this.ratings[count], this.reviewCount);
        let chartBar = new ChartBar(this.ratings[count], percentage, label);
        let reviewBar = chartBar.create();
        reviewChartBox.appendChild(reviewBar);
        count--;
      }
    } else {
      reviewChartBox.innerText = '';
      ratingValue.classList.add('ur-no-value');
    }
    reviewSummaryHeader.appendChild(ratingBox);
    reviewSummaryHeader.appendChild(reviewSummaryTitleWrapper);
    reviewSummaryBox.appendChild(reviewSummaryHeader);
    reviewSummaryBox.appendChild(reviewUsersWrapper);
    reviewSummaryBox.appendChild(reviewChartBox);
    return reviewSummaryBox;
  }

  getPercentage(value, max) {
    if (max === 0) return 0;
    const result = Math.round((value/max) * 100);
    return result;
  }
}

export default ReviewSummary;
