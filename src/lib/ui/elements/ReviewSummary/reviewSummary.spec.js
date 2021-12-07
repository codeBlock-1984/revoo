import ReviewSummary from './ReviewSummary';
import Utils from '../../utils/Utils';
import Stars from '../Stars/Stars';
import ChartBar from '../ChartBar/ChartBar';

const getValueSpy = jest.spyOn(Utils, 'getValue');
const ternarySpy = jest.spyOn(Utils, 'ternary');
const starCreateSpy = jest.spyOn(Stars.prototype, 'createStatic');
const chartCreateSpy = jest.spyOn(ChartBar.prototype, 'create');
const getPercentageSpy = jest.spyOn(ReviewSummary.prototype, 'getPercentage');
const roundSpy = jest.spyOn(Math, 'round');

let reviewSummary = new ReviewSummary({ Rating1: 0, Rating2: 5, Rating3: 2, Rating4: 10, Rating5: 6, AverageRatings: 4, TotalUsers: 23 });
describe('ReviewSummary (class)', () => {
  it('produces instances', () => {
    expect(reviewSummary).toBeDefined();
    expect(reviewSummary).toEqual({ ratings: { 1: 0, 2: 5, 3: 2, 4: 10, 5: 6 }, averageRating: 4, reviewCount: 23 });
    expect(reviewSummary.create).toBeDefined();
    expect(reviewSummary.getPercentage).toBeDefined();
  });

  describe('create()', () => {
    it('creates a reviewSummary element', () => {
      const res = reviewSummary.create();
      const header = res.firstElementChild;
      const ratingBox = header.children[0];
      const revTitleWrapper = header.children[1];
      const revTitle = revTitleWrapper.firstElementChild;
      const ratingValue = revTitle.firstElementChild;
      const ratingTotal = revTitle.children[1];
      const body = res.children[1];
      const revUsers = body.firstElementChild;
      const footer = res.children[2];

      expect(res.tagName).toEqual('DIV');
      expect(res.classList).toHaveProperty([0], 'ur-review-summary-box');
      expect(res.childElementCount).toEqual(3);
      expect(header.tagName).toEqual('DIV');
      expect(header.classList).toHaveProperty([0], 'ur-review-summary-header');
      expect(header.childElementCount).toEqual(2);
      expect(ratingBox.tagName).toEqual('DIV');
      expect(ratingBox.classList).toHaveProperty([0], 'ur-stats-stars-box');
      expect(ratingBox.childElementCount).toEqual(1);
      expect(ratingBox.firstElementChild.tagName).toEqual('DIV');
      expect(ratingBox.firstElementChild.classList).toHaveProperty([0], 'ur-static-stars');
      expect(starCreateSpy).toHaveBeenCalledTimes(1);
      expect(starCreateSpy).toHaveBeenCalledWith(reviewSummary.averageRating);
      expect(revTitleWrapper.tagName).toEqual('DIV');
      expect(revTitleWrapper.classList).toHaveProperty([0], 'ur-review-summary-title-wrapper');
      expect(revTitleWrapper.childElementCount).toEqual(1);
      expect(revTitle.tagName).toEqual('DIV');
      expect(revTitle.classList).toHaveProperty([0], 'ur-review-summary-title');
      expect(revTitle.childElementCount).toEqual(2);
      expect(ratingValue.tagName).toEqual('SPAN');
      expect(ratingValue.classList).toHaveProperty([0], 'ur-average-rating-value');
      expect(ratingValue).toHaveProperty(['innerText'], reviewSummary.averageRating);
      expect(getValueSpy).toHaveBeenCalledTimes(2);
      expect(getValueSpy).toHaveBeenNthCalledWith(1, reviewSummary.averageRating, '__');
      expect(getValueSpy).toHaveBeenNthCalledWith(2, reviewSummary.reviewCount, 'No');
      expect(ratingTotal.tagName).toEqual('SPAN');
      expect(ratingTotal.classList).toHaveProperty([0], 'ur-average-rating-total');
      expect(ratingTotal).toHaveProperty('innerText', '/ 5');
      expect(body.tagName).toEqual('DIV');
      expect(body.childElementCount).toEqual(1);
      expect(body.classList).toHaveProperty([0], 'ur-review-users-wrapper');
      expect(revUsers.tagName).toEqual('H3');
      expect(revUsers.innerText).toEqual('23 user reviews');
      expect(ternarySpy).toHaveBeenCalledTimes(1);
      expect(ternarySpy).toHaveBeenCalledWith(true, 'user reviews', 'user review');
      expect(revUsers).toHaveProperty(['classList', 0], 'ur-review-users')
      expect(footer.tagName).toEqual('DIV');
      expect(footer.classList).toHaveProperty([0], 'ur-review-chart-box');
      expect(footer.childElementCount).toEqual(5);
      expect(getPercentageSpy).toHaveBeenCalledTimes(5);
      expect(chartCreateSpy).toHaveBeenCalledTimes(5);
      let count = 5;
      let index = 1;
      while (count > 0) {
        expect(getPercentageSpy).toHaveBeenNthCalledWith(index, reviewSummary.ratings[count], reviewSummary.reviewCount);
        expect(chartCreateSpy).toHaveBeenNthCalledWith(index);
        expect(footer.children[index - 1].tagName).toEqual('DIV');
        expect(footer.children[index - 1].classList).toHaveProperty([0], 'ur-chart-bar-box');
        count--;
        index++;
      }
    });

    it('creates a no data template for zero reviews', () => {
      const noReview = new ReviewSummary({});
      const res = noReview.create();
      const header = res.firstElementChild;
      const ratingBox = header.children[0];
      const revTitleWrapper = header.children[1];
      const revTitle = revTitleWrapper.firstElementChild;
      const ratingValue = revTitle.firstElementChild;
      const ratingTotal = revTitle.children[1];
      const body = res.children[1];
      const revUsers = body.firstElementChild;
      const footer = res.children[2];

      expect(res.tagName).toEqual('DIV');
      expect(res.classList).toHaveProperty([0], 'ur-review-summary-box');
      expect(res.childElementCount).toEqual(3);
      expect(header.tagName).toEqual('DIV');
      expect(header.classList).toHaveProperty([0], 'ur-review-summary-header');
      expect(header.childElementCount).toEqual(2);
      expect(ratingBox.tagName).toEqual('DIV');
      expect(ratingBox.classList).toHaveProperty([0], 'ur-stats-stars-box');
      expect(ratingBox.childElementCount).toEqual(1);
      expect(ratingBox.firstElementChild.tagName).toEqual('DIV');
      expect(ratingBox.firstElementChild.classList).toHaveProperty([0], 'ur-static-stars');
      expect(starCreateSpy).toHaveBeenCalledTimes(1);
      expect(starCreateSpy).toHaveBeenCalledWith(0);
      expect(revTitleWrapper.tagName).toEqual('DIV');
      expect(revTitleWrapper.classList).toHaveProperty([0], 'ur-review-summary-title-wrapper');
      expect(revTitleWrapper.childElementCount).toEqual(1);
      expect(revTitle.tagName).toEqual('DIV');
      expect(revTitle.classList).toHaveProperty([0], 'ur-review-summary-title');
      expect(revTitle.childElementCount).toEqual(2);
      expect(ratingValue.tagName).toEqual('SPAN');
      expect(ratingValue.classList).toHaveProperty([0], 'ur-average-rating-value');
      expect(ratingValue.classList).toHaveProperty([1], 'ur-no-value');
      expect(ratingValue).toHaveProperty(['innerText'], '__');
      expect(getValueSpy).toHaveBeenCalledTimes(2);
      expect(getValueSpy).toHaveBeenNthCalledWith(1, noReview.averageRating, '__');
      expect(getValueSpy).toHaveBeenNthCalledWith(2, noReview.reviewCount, 'No');
      expect(ratingTotal.tagName).toEqual('SPAN');
      expect(ratingTotal.classList).toHaveProperty([0], 'ur-average-rating-total');
      expect(ratingTotal).toHaveProperty('innerText', '/ 5');
      expect(body.tagName).toEqual('DIV');
      expect(body.childElementCount).toEqual(1);
      expect(body.classList).toHaveProperty([0], 'ur-review-users-wrapper');
      expect(revUsers.tagName).toEqual('H3');
      expect(revUsers.innerText).toEqual('No user reviews');
      expect(ternarySpy).toHaveBeenCalledTimes(1);
      expect(ternarySpy).toHaveBeenCalledWith(true, 'user reviews', 'user review');
      expect(revUsers).toHaveProperty(['classList', 0], 'ur-review-users')
      expect(footer.tagName).toEqual('DIV');
      expect(footer.classList).toHaveProperty([0], 'ur-review-chart-box');
      expect(footer.childNodes.length).toEqual(0);
      expect(footer.innerText).toEqual('');
    });
  });

  describe('getPercentage()', () => {
    it('returns the frequency of a rating', () => {
      expect(reviewSummary.getPercentage(1, 0)).toEqual(0);
      expect(reviewSummary.getPercentage(5, 10)).toEqual(50);
      expect(roundSpy).toHaveBeenCalledTimes(1);
      expect(roundSpy).toHaveBeenCalledWith(50);
    });
  });
});
