import Plugin from '../index';
import ReviewModal from '../lib/ui/elements/ReviewModal/ReviewModal';
import ReviewService from '../lib/ui/services/Review.service';
import ReviewSummary from '../lib/ui/elements/ReviewSummary/ReviewSummary';
import UserReview from '../lib/ui/elements/UserReview/UserReview';
import Stars from '../lib/ui/elements/Stars/Stars';
import Emojis from '../lib/ui/elements/Emojis/Emojis';
import Comment from '../lib/ui/elements/Comment/Comment';
import PaginationBar from '../lib/ui/elements/PaginationBar/PaginationBar';
import Utils from '../lib/ui/utils/Utils';

const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
const setDataSpy = jest.spyOn(Plugin.prototype, 'setData');
const reviewModalCreateSpy = jest.spyOn(ReviewModal.prototype, 'create');
const configureModalSpy = jest.spyOn(Plugin.prototype, 'configureModal');
const restorePageSpy = jest.spyOn(Plugin.prototype, 'restorePage');
const getValueSpy = jest.spyOn(Utils, 'getValue');
const loadReviewsSpy = jest.spyOn(Plugin.prototype, 'loadReviews');
const getSessionDataSpy = jest.spyOn(Plugin.prototype, 'getSessionData');
const getReviewStatsSpy = jest.spyOn(ReviewService, 'getReviewStats');
const handleStatsResultSpy = jest.spyOn(Plugin.prototype, 'handleStatsResult');
const reviewSummaryCreateSpy = jest.spyOn(ReviewSummary.prototype, 'create');
const closeActiveReplySpy = jest.spyOn(UserReview, 'closeActiveReply');
const getReviewsSpy = jest.spyOn(ReviewService, 'getReviews');
const userReviewCreateSpy = jest.spyOn(UserReview.prototype, 'create');
const getPaginationBarSpy = jest.spyOn(Plugin.prototype, 'getPaginationBar');
const saveCurrentPageSpy = jest.spyOn(Plugin.prototype, 'saveCurrentPage');
const starsCreateSpy = jest.spyOn(Stars.prototype, 'create');
const emojisCreateSpy = jest.spyOn(Emojis.prototype, 'create');
const commentCreateSpy = jest.spyOn(Comment.prototype, 'create');
const paginationBarCreateSpy = jest.spyOn(PaginationBar.prototype, 'create');
const handleNavigationButtonClickSpy = jest.spyOn(Plugin.prototype, 'handleNavigationButtonClick');
const createReviewElementSpy = jest.spyOn(Plugin.prototype, 'createReviewElement');
const resetElementSpy = jest.spyOn(Plugin.prototype, 'resetElement');
const getStarsSpy = jest.spyOn(Plugin.prototype, 'getStars');
const getEmojisSpy = jest.spyOn(Plugin.prototype, 'getEmojis');
const getCommentSpy = jest.spyOn(Plugin.prototype, 'getComment');
const resetStarsSpy = jest.spyOn(Stars, 'resetStars');
const resetEmojisSpy = jest.spyOn(Emojis, 'resetEmojis');
const resetCommentSpy = jest.spyOn(Comment, 'resetComment');

const getElementByIdSpy = jest.spyOn(document, 'getElementById');
const appendChildSpy = jest.spyOn(Node.prototype, 'appendChild');
const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');

const mockAppendChild = jest.fn(() => {});
const wrapper = { appendChild: mockAppendChild };

const classes = [
  { isClass: false, value: 'ur-root' },
  { isClass: true, value: 'ur-btn-star' },
  { isClass: true, value: 'ur-btn-emoji' },
  { isClass: true, value: 'ur-btn-comment' },
  { isClass: true, value: 'ur-btn-star-comment-group' },
  { isClass: true, value: 'ur-btn-emoji-comment-group' },
  { isClass: false, value: 'ur-box-user-reviews' },
  { isClass: true, value: 'ur-box-review-stats' },
];

document.body.innerHTML = '';
for (let item of classes) {
  const element = document.createElement('div'); 
  element.dataset.feature = 'feature';
  if (item.isClass) {
    element.classList.add(item.value);
  } else {
    if (item.value === 'ur-root') element.dataset.modalButtonColor = 'blue';
    element.id = item.value;
  }
  document.body.appendChild(element);
}

const rootWrapper = document.getElementById('ur-root');
const starBox = document.querySelectorAll('.ur-btn-star')[0];
const emojiBox = document.querySelectorAll('.ur-btn-emoji')[0];
const commentBox = document.querySelectorAll('.ur-btn-comment')[0];
const starCommentGroup = document.querySelectorAll('.ur-btn-star-comment-group')[0];
const emojiCommentGroup = document.querySelectorAll('.ur-btn-emoji-comment-group')[0];
const userReviews = document.getElementById('ur-box-user-reviews');
const reviewStats = document.querySelectorAll('.ur-box-review-stats')[0];
    
const response = { data: { Data: 'data' } };

const plugin = new Plugin();
describe('Plugin (class)', () => {
  it('produces instances', () => {
    expect(plugin).toBeDefined();
    expect(plugin).toEqual({ type: null, modalOpen: false, modalFeature: null, secret: null, rootWrapper: null, starBox: null, emojiBox: null, commentBox: null, starCommentGroup: null, emojiCommentGroup: null, userReviews: null, reviewStats: null, currentPage: null, firstRangeNum: 0, lastRangeNum: 0, paginationData: null });
    expect(plugin.init).toBeDefined();
    expect(plugin.handleRootClick).toBeDefined();
    expect(plugin.configureModal).toBeDefined();
    expect(plugin.getSessionData).toBeDefined();
    expect(plugin.loadReviews).toBeDefined();
    expect(plugin.setData).toBeDefined();
    expect(plugin.getStars).toBeDefined();
    expect(plugin.getEmojis).toBeDefined();
    expect(plugin.getComment).toBeDefined();
    expect(plugin.getPaginationBar).toBeDefined();
    expect(plugin.handlePageClick).toBeDefined();
    expect(plugin.handleNavigationButtonClick).toBeDefined();
    expect(plugin.showReviewModal).toBeDefined();
    expect(plugin.handleModalClose).toBeDefined();
    expect(plugin.saveCurrentPage).toBeDefined();
    expect(plugin.restorePage).toBeDefined();
    expect(plugin.createReviewElement).toBeDefined();
    expect(plugin.resetElement).toBeDefined();
    expect(plugin.handleStatsResult).toBeDefined();
  });

  describe('init()', () => {
    it('initializes plugin', async () => {
      const response = { data: { Data: 'data' } };
      const p = Promise.resolve(response);
      getReviewStatsSpy.mockImplementationOnce(() => p.then(response));
      handleStatsResultSpy.mockImplementationOnce(() => {});
      loadReviewsSpy.mockImplementationOnce(() => {});
      const cred = { secret: 'secret', user: 'user-123', username: 'Jane Doe' };
      plugin.init(cred);
      await p;
      expect(setDataSpy).toHaveBeenCalledTimes(1);
      expect(setDataSpy).toHaveBeenCalledWith(cred);
      expect(reviewModalCreateSpy).toHaveBeenCalledTimes(1);
      expect(reviewModalCreateSpy).toHaveBeenCalledWith();
      expect(rootWrapper.childElementCount).toBe(1);
      expect(rootWrapper.children[0].tagName).toBe('DIV');
      expect(configureModalSpy).toHaveBeenCalledTimes(1);
      expect(configureModalSpy).toHaveBeenCalledWith();
      expect(starBox.dataset.type).toBe('star');
      expect(emojiBox).toHaveProperty(['dataset', 'type'], 'emoji');
      expect(commentBox).toHaveProperty(['dataset', 'type'], 'comment');
      expect(starCommentGroup).toHaveProperty(['dataset', 'type'], 'starComment');
      expect(emojiCommentGroup).toHaveProperty(['dataset', 'type'], 'emojiComment');
      expect(restorePageSpy).toHaveBeenCalledTimes(1);
      expect(restorePageSpy).toHaveBeenCalledWith();
      expect(getValueSpy).toHaveBeenCalledTimes(2);
      expect(getValueSpy).toHaveBeenNthCalledWith(1, null, 1);
      expect(loadReviewsSpy).toHaveBeenCalledTimes(1);
      expect(loadReviewsSpy).toHaveBeenCalledWith(1);
      expect(getSessionDataSpy).toHaveBeenCalledTimes(1);
      expect(getSessionDataSpy).toHaveBeenCalledWith();
      expect(getReviewStatsSpy).toHaveBeenCalledTimes(1);
      expect(getReviewStatsSpy).toHaveBeenCalledWith({ feature: 'feature', secret: 'secret' });
      expect(reviewStats.innerText).toBe('loading review stats...');
      expect(handleStatsResultSpy).toHaveBeenCalledTimes(1);
      expect(handleStatsResultSpy).toHaveBeenCalledWith(reviewStats, response);
    });
  });
  
  describe('handleStatsResult()', () => {
    it('sets item inner text', () => {
      const mockAppendChild = jest.fn(() => {});
      const item = { innerText: 'foo', appendChild: mockAppendChild };
      plugin.handleStatsResult(item, response);
      expect(reviewSummaryCreateSpy).toHaveBeenCalledTimes(1);
      expect(reviewSummaryCreateSpy).toHaveBeenCalledWith();
      expect(item.innerText).toBe('');
      expect(mockAppendChild).toHaveBeenCalledTimes(1);
      expect(mockAppendChild).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it('sets item inner text to error message', () => {
      plugin.handleStatsResult(reviewStats, {});
      expect(reviewStats.innerText).toBe('Could not load stats.');
      expect();
    });
  });

  describe('handleRootClick()', () => {
    it('handles click events on root wrapper', () => {
      const mockClosest = jest.fn(() => {});
      closeActiveReplySpy.mockImplementationOnce(() => {});
      localStorage.setItem('activeReply', 'active');
      plugin.handleRootClick({ target: { dataset: { name: 'name' }, closest: mockClosest } });
      expect(getItemSpy).toHaveBeenCalledTimes(1);
      expect(getItemSpy).toHaveBeenCalledWith('activeReply');
      expect(mockClosest).toHaveBeenCalledTimes(1);
      expect(mockClosest).toHaveBeenCalledWith('.ur-reply-wrapper');
    });
  });

  describe('configureModal()', () => {
    it('configures review modal', () => {
      plugin.configureModal();
      expect(getElementByIdSpy).toHaveBeenCalledTimes(1);
      expect(getElementByIdSpy).toHaveBeenCalledWith('ur-modalCloseIcon');
    });
  });

  describe('getSessionData', () => {
    it('sets secret on the plugin instance', () => {
      localStorage.setItem('secret', 'secret');
      plugin.getSessionData();
      expect(plugin.secret).toEqual('secret');
      expect(getValueSpy).toHaveBeenCalledTimes(1);
      expect(getValueSpy).toHaveBeenCalledWith('secret', '');
    });
  });

  describe('loadReviews', () => {
    it('loads reviews', async () => {
      userReviews.dataset.feature = 'baz';
      const paginationData = {  page: 2, pagesize: 5 , pages: 6 };
      const response = { data: { Data: { ...paginationData, records: [{ Comment: 'foo' }] } } };
      const promiseResolve = Promise.resolve(response);
      getReviewsSpy.mockImplementationOnce(() => promiseResolve.then(response) );
      const payload = { secret: 'secret', feature: 'baz', page: 2 };
      plugin.loadReviews(2);
      await promiseResolve;
      expect(getSessionDataSpy).toHaveBeenCalledTimes(1);
      expect(getSessionDataSpy).toHaveBeenCalledWith();
      expect(localStorage.getItem('reviewsFeature')).toBe('baz');
      expect(setItemSpy).toHaveBeenCalledTimes(4);
      expect(setItemSpy).toHaveBeenCalledWith('reviewsFeature', 'baz');
      expect(getReviewsSpy).toHaveBeenCalledTimes(1);
      expect(getReviewsSpy).toHaveBeenCalledWith(payload);
      expect(userReviewCreateSpy).toHaveBeenCalledTimes(1);
      expect(userReviewCreateSpy).toHaveBeenCalledWith();
      expect(getPaginationBarSpy).toHaveBeenCalledTimes(1);
      expect(getPaginationBarSpy).toHaveBeenCalledWith({ currentPage: 2, pageCount: 6, pageSize: 5 });
      expect(saveCurrentPageSpy).toHaveBeenCalledTimes(1);
      expect(saveCurrentPageSpy).toHaveBeenCalledWith();
    });

    it('sets review error message on request fail', async () => {
      userReviews.dataset.feature = 'baz';
      const response = { };
      const promiseResolve = Promise.resolve(response);
      getReviewsSpy.mockImplementationOnce(() => promiseResolve.then(response) );
      const payload = { secret: 'secret', feature: 'baz', page: 2 };
      plugin.loadReviews(2);
      await promiseResolve;
      expect(userReviews).toHaveProperty('innerText', 'Could not load reviews.');
    });
  });

  describe('setData()', () => {
    it('sets localStorage data', () => {
      plugin.setData({ secret: 'mis-7', user: 'agent-dimitri-4074', username: 'Ethan Hunt' });
      expect(removeItemSpy).toHaveBeenCalledTimes(4);
      expect(removeItemSpy).toHaveBeenNthCalledWith(1, 'rating');
      expect(removeItemSpy).toHaveBeenNthCalledWith(2, 'ratingType');
      expect(removeItemSpy).toHaveBeenNthCalledWith(3, 'comment');
      expect(removeItemSpy).toHaveBeenNthCalledWith(4, 'starValue');
      expect(setItemSpy).toHaveBeenCalledTimes(3);
      expect(setItemSpy).toHaveBeenNthCalledWith(1, 'secret', 'mis-7');
      expect(setItemSpy).toHaveBeenNthCalledWith(2, 'user', 'agent-dimitri-4074');
      expect(setItemSpy).toHaveBeenNthCalledWith(3, 'username', 'Ethan Hunt');
    });
  });

  describe('getStars()', () => {
    it('returns a stars element', () => {
      expect(plugin.getStars()).toEqual(expect.any(HTMLDivElement));
      expect(starsCreateSpy).toHaveBeenCalledTimes(1);
      expect(starsCreateSpy).toHaveBeenCalledWith();
    });
  });

  describe('getEmojis()', () => {
    it('returns a emojis element', () => {
      expect(plugin.getEmojis()).toEqual(expect.any(HTMLDivElement));
      expect(emojisCreateSpy).toHaveBeenCalledTimes(1);
      expect(emojisCreateSpy).toHaveBeenCalledWith();
    });
  });

  describe('getComment()', () => {
    it('returns a comment element', () => {
      expect(plugin.getComment()).toEqual(expect.any(HTMLFormElement));
      expect(commentCreateSpy).toHaveBeenCalledTimes(1);
      expect(commentCreateSpy).toHaveBeenCalledWith();
    });
  });

  describe('getPaginationBar()', () => {
    it('returns pagination bar', () => {
      const res = plugin.getPaginationBar({ pageCount: 12 });
      expect(res).toEqual(expect.any(HTMLDivElement));
      expect(paginationBarCreateSpy).toHaveBeenCalledTimes(1);
      expect(paginationBarCreateSpy).toHaveBeenCalledWith();
    });
  });
  
  describe('handlePageClick()', () => {
    it('handles click events on a page link', () => {
      loadReviewsSpy.mockImplementationOnce(() => {});
      plugin.handlePageClick({ target: { dataset: { url: '12', name: 'pageLink' } } });
      expect(loadReviewsSpy).toHaveBeenCalledTimes(1);
      expect(loadReviewsSpy).toHaveBeenLastCalledWith(12);
    });

    it('handles click events on a right navigation button', () => {
      loadReviewsSpy.mockImplementationOnce(() => {});
      plugin.handlePageClick({ target: { dataset: { active: 'true', name: 'navigationButton', type: 'right' } } });
      expect(loadReviewsSpy).toHaveBeenCalledTimes(1);
      expect(loadReviewsSpy).toHaveBeenLastCalledWith(3);
    });

    it('handles click events on a left navigation button', () => {
      loadReviewsSpy.mockImplementationOnce(() => {});
      plugin.handlePageClick({ target: { dataset: { active: 'true', name: 'navigationButton', type: 'left' } } });
      expect(loadReviewsSpy).toHaveBeenCalledTimes(1);
      expect(loadReviewsSpy).toHaveBeenLastCalledWith(1);
    });

    it('handles click events on an ellipsis button', () => {
      handleNavigationButtonClickSpy.mockImplementationOnce(() => {});
      plugin.handlePageClick({ target: { dataset: { type: 'right', name: 'ellipsis' } } });
      expect(handleNavigationButtonClickSpy).toHaveBeenCalledTimes(1);
      expect(handleNavigationButtonClickSpy).toHaveBeenLastCalledWith('right');
    });
  });

  describe('handleNavigationButtonClick()', () => {
    it('handles right navigation for falsy first range', () => {
      appendChildSpy.mockImplementationOnce(() => {});
      plugin.handleNavigationButtonClick('right');
      expect(plugin.firstRangeNum).toBe(3);
      expect(plugin.lastRangeNum).toBe(10);
    });

    it('handles right navigation button action', () => {
      appendChildSpy.mockImplementationOnce(() => {});
      plugin.handleNavigationButtonClick('right');
      expect(plugin.firstRangeNum).toBe(4);
      expect(plugin.lastRangeNum).toBe(11);
    });

    it('handles left navigation button action', () => {
      getPaginationBarSpy.mockImplementationOnce(() => document.createElement('div'));
      appendChildSpy.mockImplementationOnce(() => {});
      plugin.handleNavigationButtonClick('left');
      expect(plugin.firstRangeNum).toBe(3);
      expect(plugin.lastRangeNum).toBe(10);
      expect(getPaginationBarSpy).toHaveBeenCalledTimes(1);
      expect(getPaginationBarSpy).toHaveBeenLastCalledWith(plugin.paginationData);
      expect(getElementByIdSpy).toHaveBeenCalledTimes(1);
      expect(getElementByIdSpy).toHaveBeenLastCalledWith('ur-paginationWrapper');
      expect(appendChildSpy).toHaveBeenCalledTimes(1);
      expect(appendChildSpy).toHaveBeenLastCalledWith(expect.any(HTMLDivElement));
    });
  });

  describe('showReviewModal()', () => {
    it('displays modal', () => {
      const textBox = document.createElement('textarea');
      textBox.id = 'ur-textBox-test-feature';
      document.body.appendChild(textBox);
      const stopPropagationMock = jest.fn(() => {});
      createReviewElementSpy.mockImplementationOnce(() => {});
      const event = { target: { dataset: { feature: 'test-feature', type: 'star' } }, stopPropagation: stopPropagationMock };
      plugin.showReviewModal(event);
      let modalBody = document.getElementById('ur-modalBody');
      let modal = document.getElementById('ur-modalBox');
      expect(setItemSpy).toHaveBeenCalledTimes(1);
      expect(setItemSpy).toHaveBeenCalledWith('feature', 'test-feature');
      expect(getElementByIdSpy).toHaveBeenCalledTimes(5);
      expect(getElementByIdSpy).toHaveBeenNthCalledWith(1, 'ur-modalBox');
      expect(getElementByIdSpy).toHaveBeenNthCalledWith(2, 'ur-modalBody');
      expect(getElementByIdSpy).toHaveBeenNthCalledWith(3, 'ur-textBox-test-feature');
      expect(modalBody).toHaveProperty('innerHTML', '');
      expect(createReviewElementSpy).toHaveBeenCalledTimes(1);
      expect(createReviewElementSpy).toHaveBeenCalledWith('star', modalBody)
      expect(modal.classList).toContain('ur-show');
      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(focusSpy).toHaveBeenCalledWith();
      expect(plugin.modalOpen).toBe(true);
      expect(stopPropagationMock).toHaveBeenCalledTimes(1);
      expect(stopPropagationMock).toHaveBeenCalledWith();
    });

    it('returns undefined', () => {
      const event = { target: { dataset: { feature: 'test-feature', type: 'star' } } };
      const res = plugin.showReviewModal(event);
      expect(res).toBe(undefined);
    });
  });

  describe('handleModalClose()', () => {
    it('carries out modal close action', () => {
      resetElementSpy.mockImplementationOnce(() => {});
      const stopPropagationMock = jest.fn(() => {});
      const event = { target: { dataset: { feature: 'test-feature', type: 'star' } }, stopPropagation: stopPropagationMock };
      let modal = document.getElementById('ur-modalBox');
      const resultText = document.getElementById('ur-resultText');
      modal.classList.add('ur-show');
      resultText.classList.add('ur-error');
      plugin.handleModalClose(event);
      expect(resetElementSpy).toHaveBeenCalledTimes(1);
      expect(resetElementSpy).toHaveBeenCalledWith(plugin.type);
      expect(removeItemSpy).toHaveBeenCalledTimes(4);
      expect(removeItemSpy).toHaveBeenNthCalledWith(1, 'rating');
      expect(removeItemSpy).toHaveBeenNthCalledWith(2, 'comment');
      expect(removeItemSpy).toHaveBeenNthCalledWith(3, 'ratingType');
      expect(removeItemSpy).toHaveBeenNthCalledWith(4, 'starValue');
      expect(getElementByIdSpy).toHaveBeenCalledTimes(4);
      expect(getElementByIdSpy).toHaveBeenNthCalledWith(3, 'ur-modalBox');
      expect(getElementByIdSpy).toHaveBeenNthCalledWith(4, 'ur-resultText');
      expect(resultText).toHaveProperty('innerText', '');
      expect(resultText.classList).not.toContain('ur-error');
      expect(modal.classList).not.toContain('ur-show');
      expect(plugin.modalOpen).toBe(false);
      expect(stopPropagationMock).toHaveBeenCalledTimes(1);
      expect(stopPropagationMock).toHaveBeenCalledWith();
    });
  });

  describe('saveCurrentPage()', () => {
    it('saves the current page data to local storage', () => {
      plugin.saveCurrentPage();
      expect(setItemSpy).toHaveBeenCalledTimes(3);
      expect(setItemSpy).toHaveBeenNthCalledWith(1, 'currentPage', plugin.currentPage);
      expect(setItemSpy).toHaveBeenNthCalledWith(2, 'firstRangeNum', plugin.firstRangeNum);
      expect(setItemSpy).toHaveBeenNthCalledWith(3, 'lastRangeNum', plugin.lastRangeNum);
    });
  });

  describe('restorePage()', () => {
    it('restores page if reviews feature is same', () => {
      localStorage.setItem('reviewsFeature', 'baz');
      localStorage.setItem('currentPage', 3);
      localStorage.setItem('firstRangeNum', 3);
      localStorage.setItem('lastRangeNum', 6);
      plugin.restorePage();
      expect(getItemSpy).toHaveBeenCalledTimes(4);
      expect(getItemSpy).toHaveBeenNthCalledWith(1, 'reviewsFeature');
      expect(getItemSpy).toHaveBeenNthCalledWith(2, 'currentPage');
      expect(getItemSpy).toHaveBeenNthCalledWith(3, 'firstRangeNum');
      expect(getItemSpy).toHaveBeenNthCalledWith(4, 'lastRangeNum');
      expect(getValueSpy).toHaveBeenCalledTimes(3);
      expect(getValueSpy).toHaveBeenNthCalledWith(1, 3, null);
      expect(getValueSpy).toHaveBeenNthCalledWith(2, 3, 0);
      expect(getValueSpy).toHaveBeenNthCalledWith(3, 6, 0);
    });

    it('removes page data if reviews feature is not same', () => {
      localStorage.setItem('reviewsFeature', 'bar');
      plugin.restorePage();
      expect(removeItemSpy).toHaveBeenCalledTimes(3);
      expect(removeItemSpy).toHaveBeenNthCalledWith(1, 'currentPage');
      expect(removeItemSpy).toHaveBeenNthCalledWith(2, 'firstRangeNum');
      expect(removeItemSpy).toHaveBeenNthCalledWith(3, 'lastRangeNum');
    });
  });

  describe('createReviewElement()', () => {
    beforeAll(() => {
      getStarsSpy.mockImplementationOnce(() => document.createElement('div'));
      getEmojisSpy.mockImplementationOnce(() => document.createElement('div'));
      getCommentSpy.mockImplementationOnce(() => document.createElement('form'));
    });

    it('creates a stars review element', () => {
      plugin.createReviewElement('star', wrapper);
      expect(getStarsSpy).toHaveBeenCalledTimes(1);
      expect(getStarsSpy).toHaveBeenCalledWith(plugin.modalFeature);
      expect(mockAppendChild).toHaveBeenCalledTimes(1);
      expect(mockAppendChild).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it('creates a emojis review element', () => {
      plugin.createReviewElement('emoji', wrapper);
      expect(getEmojisSpy).toHaveBeenCalledTimes(1);
      expect(getEmojisSpy).toHaveBeenCalledWith(plugin.modalFeature);
      expect(mockAppendChild).toHaveBeenCalledTimes(1);
      expect(mockAppendChild).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it('creates a comment review element', () => {
      plugin.createReviewElement('comment', wrapper);
      expect(getCommentSpy).toHaveBeenCalledTimes(1);
      expect(getCommentSpy).toHaveBeenCalledWith(plugin.modalFeature);
      expect(mockAppendChild).toHaveBeenCalledTimes(1);
      expect(mockAppendChild).toHaveBeenCalledWith(expect.any(HTMLFormElement));
    });

    it('creates a star-comment review element', () => {
      plugin.createReviewElement('starComment', wrapper);
      expect(getStarsSpy).toHaveBeenCalledTimes(1);
      expect(getStarsSpy).toHaveBeenCalledWith(plugin.modalFeature);
      expect(getCommentSpy).toHaveBeenCalledTimes(1);
      expect(getCommentSpy).toHaveBeenCalledWith(plugin.modalFeature);
      expect(mockAppendChild).toHaveBeenCalledTimes(2);
      expect(mockAppendChild).toHaveBeenNthCalledWith(1, expect.any(HTMLDivElement));
      expect(mockAppendChild).toHaveBeenNthCalledWith(2, expect.any(HTMLFormElement));
    });

    it('creates a emoji-comment review element', () => {
      plugin.createReviewElement('emojiComment', wrapper);
      expect(getEmojisSpy).toHaveBeenCalledTimes(1);
      expect(getEmojisSpy).toHaveBeenCalledWith(plugin.modalFeature);
      expect(getCommentSpy).toHaveBeenCalledTimes(1);
      expect(getCommentSpy).toHaveBeenCalledWith(plugin.modalFeature);
      expect(mockAppendChild).toHaveBeenCalledTimes(2);
      expect(mockAppendChild).toHaveBeenNthCalledWith(1, expect.any(HTMLDivElement));
      expect(mockAppendChild).toHaveBeenNthCalledWith(2, expect.any(HTMLFormElement));
    });

    it('does nothing if no case is matched', () => {
      expect(plugin.createReviewElement('foo', wrapper)).not.toBeDefined();
    });
  });

  describe('resetElement()', () => {
    it('resets a star element', () => {
      plugin.resetElement('star');
      expect(resetStarsSpy).toHaveBeenCalledTimes(1);
      expect(resetStarsSpy).toHaveBeenCalledWith(plugin.modalFeature);
    });

    it('resets an emoji element', () => {
      plugin.resetElement('emoji');
      expect(resetEmojisSpy).toHaveBeenCalledTimes(1);
      expect(resetEmojisSpy).toHaveBeenCalledWith('colour', plugin.modalFeature);
    });

    it('resets a comment element', () => {
      plugin.resetElement('comment');
      expect(resetCommentSpy).toHaveBeenCalledTimes(1);
      expect(resetCommentSpy).toHaveBeenCalledWith(plugin.modalFeature);
    });

    it('resets a star-comment element', () => {
      plugin.resetElement('starComment');
      expect(resetStarsSpy).toHaveBeenCalledTimes(1);
      expect(resetStarsSpy).toHaveBeenCalledWith(plugin.modalFeature);
      expect(resetCommentSpy).toHaveBeenCalledTimes(1);
      expect(resetCommentSpy).toHaveBeenCalledWith(plugin.modalFeature);
    });

    it('resets an emoji-comment element', () => {
      plugin.resetElement('emojiComment');
      expect(resetEmojisSpy).toHaveBeenCalledTimes(1);
      expect(resetEmojisSpy).toHaveBeenCalledWith('colour', plugin.modalFeature);
      expect(resetCommentSpy).toHaveBeenCalledTimes(1);
      expect(resetCommentSpy).toHaveBeenCalledWith(plugin.modalFeature);
    });

    it('does nothing if no case is matched', () => {
      expect(plugin.resetElement('foo')).not.toBeDefined();
    });
  });
});
