import UserReview from './UserReview';
import Stars from '../Stars/Stars';
import CompositeVote from '../CompositeVote/CompositeVote';
import ReviewService from '../../services/Review.service';

const getReplyWrapperSpy = jest.spyOn(UserReview.prototype, 'getReplyWrapper');
const closeActiveReplySpy = jest.spyOn(UserReview, 'closeActiveReply');
const resetReplySpy = jest.spyOn(UserReview.prototype, 'resetReply');
const handleButtonStateSpy = jest.spyOn(UserReview.prototype, 'handleButtonState');
const loadRepliesSpy = jest.spyOn(UserReview.prototype, 'loadReplies');
const getReviewRepliesSpy = jest.spyOn(ReviewService, 'getReviewReplies');
const reviewCreateSpy = jest.spyOn(UserReview.prototype, 'create');
const getLoadMoreButtonSpy = jest.spyOn(UserReview.prototype, 'getLoadMoreButton');
const createReviewReplySpy = jest.spyOn(ReviewService, 'createReviewReply');
const createStaticSpy = jest.spyOn(Stars.prototype, 'createStatic');
const createSpy = jest.spyOn(CompositeVote.prototype, 'create');
const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

let arg = { Id: 'test-id', UserId: '0324eaf-user-id', Comment: 'test comment', Rating: 4, ReviewUpVotes: 3, ReviewDownVotes: 1, CreatedAt: '2020-03-12T15:12:02.4210627Z', Username: 'Jane Doe' };
let props = { id: 'test-id', user: '0324eaf-user-id', comment: 'test comment', rating: 4, upVotes: 3, downVotes: 1, time: '2020-03-12T15:12:02.4210627Z', username: 'Jane Doe', type: 'review', reply: null, replyButtonColor: 'blue' };
let userReview = new UserReview(arg, 'blue');
describe('UserReview (class)', () => {
  it('can produce instances', () => {
    expect(userReview).toBeDefined();
    expect(userReview).toBeInstanceOf(UserReview);
    expect(userReview).toEqual(props);
    expect(userReview.create).toBeDefined();
  });

  describe('create()', () => {
    it('returns a userReview element', () => {
      const reviewBox = userReview.create();
      const reviewHeader = reviewBox.children[0];
      const reviewUserBox = reviewHeader.children[0];
      const userAvatar = reviewUserBox.children[0];
      const reviewUserName = reviewUserBox.children[1];
      const reviewSubHeader = reviewHeader.children[1];
      const reviewTime = reviewSubHeader.children[0];
      const ratingBox = reviewSubHeader.children[1];
      const reviewRating = ratingBox.children[0];
      const reviewBody = reviewBox.children[1];
      const reviewText = reviewBody.children[0];
      const reviewFooter = reviewBox.children[2];
      const reviewVotesBox = reviewFooter.children[0];
      const replyIcon = reviewFooter.children[1];
      const votes = reviewVotesBox.children[0];
      const revDate = new Date(userReview.time);
      const revTime = revDate.toLocaleString();
      const replyWrapper = reviewBox.children[3];

      document.body.appendChild(reviewBox);
      
      expect(reviewBox.tagName).toEqual('DIV');
      expect(reviewBox.classList[0]).toEqual('ur-review-box');
      expect(reviewBox.childElementCount).toEqual(4);
      expect(reviewHeader.tagName).toEqual('DIV');
      expect(reviewHeader.classList[0]).toEqual('ur-review-header');
      expect(reviewHeader.childElementCount).toEqual(2);
      expect(reviewUserBox.tagName).toEqual('DIV');
      expect(reviewUserBox.classList[0]).toEqual('ur-review-user-box');
      expect(reviewUserBox.childElementCount).toEqual(2);
      expect(userAvatar.tagName).toEqual('IMG');
      expect(userAvatar.classList).toHaveProperty([0], 'ur-user-avatar');
      expect(userAvatar.src).toEqual('https://res.cloudinary.com/free-spirit/image/upload/v1591707618/avatar-purple.png');
      expect(reviewUserName.tagName).toEqual('P');
      expect(reviewUserName.classList[0]).toEqual('ur-review-user-name');
      expect(reviewUserName.innerText).toEqual('Jane Doe');
      expect(reviewSubHeader.tagName).toEqual('DIV');
      expect(reviewSubHeader.classList[0]).toEqual('ur-review-sub-header');
      expect(reviewSubHeader.childElementCount).toEqual(2);
      expect(reviewTime.tagName).toEqual('P');
      expect(reviewTime.classList[0]).toEqual('ur-review-time');
      expect(reviewTime.innerText).toEqual(revTime);
      expect(ratingBox.tagName).toEqual('DIV');
      expect(ratingBox.classList[0]).toEqual('ur-review-stars-box');
      expect(ratingBox.childElementCount).toEqual(1);
      expect(reviewRating.tagName).toEqual('DIV');
      expect(reviewBody.tagName).toEqual('DIV');
      expect(reviewBody.classList[0]).toEqual('ur-review-body');
      expect(reviewBody.childElementCount).toEqual(1);
      expect(reviewText.tagName).toEqual('P');
      expect(reviewText.classList[0]).toEqual('ur-review-text');
      expect(reviewText.innerText).toEqual(userReview.comment);
      expect(reviewFooter.tagName).toEqual('DIV');
      expect(reviewFooter.classList[0]).toEqual('ur-review-footer');
      expect(reviewFooter.childElementCount).toEqual(2);
      expect(reviewVotesBox.tagName).toEqual('DIV');
      expect(reviewVotesBox.classList[0]).toEqual('ur-review-votes-box');
      expect(reviewVotesBox.childElementCount).toEqual(1);
      expect(createStaticSpy).toHaveBeenCalledTimes(1);
      expect(createStaticSpy).toHaveBeenCalledWith(userReview.rating);
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith();
      expect(votes.tagName).toEqual('DIV');
      expect(replyIcon.tagName).toBe('IMG');
      expect(replyIcon.src).toBe('https://res.cloudinary.com/free-spirit/image/upload/v1593539325/icons8-reply-arrow-100.png');
      expect(replyIcon.classList[0]).toBe('ur-reply-icon');
      expect(replyIcon.dataset.name).toBe('ur-reply');
      expect(replyIcon.dataset.reviewId).toBe(userReview.id);
      expect(replyIcon.id).toBe('ur-replyIcon-test-id');
      expect(getReplyWrapperSpy).toHaveBeenCalledTimes(1);
      expect(getReplyWrapperSpy).toHaveBeenCalledWith();
      expect(replyWrapper.tagName).toBe('DIV');
    });
  });

  describe('handleReplyClick()', () => {
    it('returns undefined', async () => {
      const event = { target: { dataset: { open: 'true' } } };
      const res = await userReview.handleReplyClick(event);
      expect(res).toBe(undefined);
    });

    it('handles click events on the reply icon', async () => {
      localStorage.setItem('activeReply', 'activeReply');
      closeActiveReplySpy.mockImplementationOnce((arg) => {});
      loadRepliesSpy.mockImplementationOnce(() => new Promise((resolve) => { resolve() }));
      const event = { target: { dataset: { open: null } } };
      await userReview.handleReplyClick(event);
      const wrapper = document.getElementById(`ur-replyWrapper-${userReview.id}`);
      expect(getItemSpy).toHaveBeenCalledTimes(1);
      expect(getItemSpy).toHaveBeenCalledWith('activeReply');
      expect(resetReplySpy).toHaveBeenCalledTimes(1);
      expect(resetReplySpy).toHaveBeenCalledWith();
      expect(handleButtonStateSpy).toHaveBeenCalledTimes(1);
      expect(handleButtonStateSpy).toHaveBeenCalledWith();
      expect(closeActiveReplySpy).toHaveBeenCalledTimes(1);
      expect(closeActiveReplySpy).toHaveBeenCalledWith('activeReply');
      expect(setItemSpy).toHaveBeenCalledTimes(2);
      expect(setItemSpy).toHaveBeenLastCalledWith('activeReply', `ur-replyWrapper-${userReview.id}`);
      expect(wrapper.children[2].innerHTML).toBe('');
      expect(loadRepliesSpy).toHaveBeenCalledTimes(1);
      expect(loadRepliesSpy).toHaveBeenCalledWith(wrapper.children[2], 1);
      expect(wrapper.style.display).toBe('flex');
      expect(event.target.dataset.open).toBe('false');
    });

    it('toggles reply box display', async () => {
      localStorage.setItem('activeReply', 'activeReply');
      await userReview.handleReplyClick();
      const wrapper = document.getElementById(`ur-replyWrapper-${userReview.id}`);
      expect(removeItemSpy).toHaveBeenCalledTimes(1);
      expect(removeItemSpy).toHaveBeenCalledWith('activeReply');
      expect(wrapper.style.display).toBe('none');
    });
  });

  describe('loadReplies()', () => {
    it('loads replies', async () => {
      const newArg = { ...arg, Id: 'new-id' };
      const response = { data: { Data: { page: 2, pages: 4, records: [newArg] } } };
      getReviewRepliesSpy.mockImplementationOnce(() => new Promise(resolve => { resolve(response); }));
      const btn = userReview.getLoadMoreButton(2);
      const reply = document.getElementById(`ur-replyWrapper-${userReview.id}`).children[2];
      reply.innerHTML = '';
      reply.appendChild(btn);
      const res = await userReview.loadReplies(reply, 2);
      expect(getReviewRepliesSpy).toHaveBeenCalledTimes(1);
      expect(getReviewRepliesSpy).toHaveBeenLastCalledWith({ reviewId: userReview.id, page: 2});
      expect(reply.contains(btn)).toBe(false);
      expect(reply.childElementCount).toBe(2);
      expect(reviewCreateSpy).toHaveBeenCalledTimes(1);
      expect(reviewCreateSpy).toHaveBeenCalledWith();
      expect(reply.firstElementChild.classList[0]).toBe('ur-review-box');
      expect(getLoadMoreButtonSpy).toHaveBeenCalledTimes(2);
      expect(getLoadMoreButtonSpy).toHaveBeenLastCalledWith(3);
      expect(reply.children[1].classList[0]).toBe('ur-load-more');
      expect(res).toBe(true);
    });

    it('returns false if request fails', async () => {
      const response = { data: { Error: 'error' } };
      getReviewRepliesSpy.mockImplementationOnce(() => new Promise(resolve => { resolve(response); }));
      const reply = document.getElementById(`ur-replyWrapper-${userReview.id}`).children[2];
      const res = await userReview.loadReplies(reply, 3);
      expect(getReviewRepliesSpy).toHaveBeenCalledTimes(1);
      expect(getReviewRepliesSpy).toHaveBeenLastCalledWith({ reviewId: userReview.id, page: 3});
      expect(res).toBe(false);
    });
  });

  describe('getLoadMoreButton()', () => {
    it('returns a load more button', () => {
      const res = userReview.getLoadMoreButton(2);
      expect(res.tagName).toBe('BUTTON');
      expect(res.innerText).toBe('Load more');
      expect(res.classList[0]).toBe('ur-load-more');
      expect(res.id).toBe(`ur-loadMore-${userReview.id}`);
      expect(res.dataset.reviewId).toBe(`${userReview.id}`);
      expect(res.dataset.page).toBe('2');
      expect(res.dataset.name).toBe('ur-load-more');
      expect(res.type).toBe('button');
    });
  });

  describe('getReplyWrapper()', () => {
    it('returns composite reply', () => {
      const res = userReview.getReplyWrapper();
      const replyBox = res.children[0];
      const replySubmit = res.children[1];
      const replies = res.children[2];
      expect(res.tagName).toBe('DIV');
      expect(res.style.display).toBe('none');
      expect(res.classList[0]).toBe('ur-reply-wrapper');
      expect(res.id).toBe(`ur-replyWrapper-${userReview.id}`);
      expect(res.dataset.reviewId).toBe(`${userReview.id}`);
      expect(res.dataset.name).toBe('ur-reply-wrapper');
      expect(res.childElementCount).toBe(3);
      expect(replyBox.tagName).toBe('DIV');
      expect(replyBox.contentEditable).toBe(true);
      expect(replyBox.id).toBe(`ur-replyBox-${userReview.id}`);
      expect(replyBox.dataset.name).toBe('ur-reply-box');
      expect(replyBox.dataset.reviewId).toBe(`${userReview.id}`);
      expect(replyBox.classList).toHaveProperty([0], 'ur-reply-box');
      expect(replies.tagName).toBe('DIV');
      expect(replies.classList[0]).toBe('ur-replies');
      expect(replies.dataset.reviewId).toBe(`${userReview.id}`);
      expect(replies.dataset.name).toBe('ur-replies');
      expect(replies.id).toBe(`ur-replies-${userReview.id}`);
      expect(replySubmit.tagName).toBe('BUTTON');
      expect(replySubmit.style.backgroundColor).toBe('blue');
      expect(replySubmit.classList[0]).toBe('ur-reply-button');
      expect(replySubmit.innerText).toBe('reply');
      expect(replySubmit.disabled).toBe(true);
      expect(replySubmit.dataset.reviewId).toBe(`${userReview.id}`);
      expect(replySubmit.dataset.name).toBe('ur-reply-submit');
      expect(replySubmit.id).toBe(`ur-replyButton-${userReview.id}`);
      expect(replySubmit.type).toBe('button');
    });
  });

  describe('loadMore()', () => {
    it('loads more replies', async () => {
      loadRepliesSpy.mockImplementationOnce(() => new Promise(resolve => { resolve(true); }));
      const rev = userReview.create();
      document.body.innerHTML = '';
      document.body.appendChild(rev);
      const btn = userReview.getLoadMoreButton(2);
      const reply = document.getElementById(`ur-replyWrapper-${userReview.id}`).children[2];
      reply.innerHTML = '';
      reply.appendChild(btn);
      await userReview.loadMore({ target: btn });
      expect(btn.innerText).toBe('loading...');
      expect(btn.disabled).toBe(true);
      expect(loadRepliesSpy).toHaveBeenCalledTimes(1);
      expect(loadRepliesSpy).toHaveBeenCalledWith(reply, '2');
    })

    it('resets load more button if loadReplies fails', async () => {
      loadRepliesSpy.mockImplementationOnce(() => new Promise(resolve => { resolve(false); }));
      const rev = userReview.create();
      document.body.innerHTML = '';
      document.body.appendChild(rev);
      const btn = userReview.getLoadMoreButton(2);
      const reply = document.getElementById(`ur-replyWrapper-${userReview.id}`).children[2];
      reply.innerHTML = '';
      reply.appendChild(btn);
      await userReview.loadMore({ target: btn });
      expect(btn.innerText).toBe('Load More');
      expect(btn.disabled).toBe(false);
      expect(loadRepliesSpy).toHaveBeenCalledTimes(1);
      expect(loadRepliesSpy).toHaveBeenCalledWith(reply, '2');
    })
  });

  describe('handleReplySubmit', () => {
    it('submits user reply', async () => {
      localStorage.setItem('user', '0324eaf-user-id');
      localStorage.setItem('username', 'Jane Doe');
      const response = { data: { ResponseCode: '00', Data: 'data' } };
      handleButtonStateSpy.mockImplementationOnce(() => {});
      createReviewReplySpy.mockImplementationOnce(() => new Promise(resolve => { resolve(response); }));
      loadRepliesSpy.mockImplementationOnce(() => new Promise(resolve => { resolve(); }));
      userReview.handleReplyInput({ target: { innerText: 'test reply' } });
      const payload = {
        ReviewId: userReview.id,
        Comment: 'test reply',
        UserId: userReview.user,
        Username: userReview.username
      };
      const wrapper = document.getElementById(`ur-replyWrapper-${userReview.id}`).children[2];
      const btn = userReview.getLoadMoreButton(2);
      await userReview.handleReplySubmit({ target: btn });
      expect(getItemSpy).toHaveBeenCalledTimes(2);
      expect(getItemSpy).toHaveBeenNthCalledWith(1, 'user');
      expect(getItemSpy).toHaveBeenNthCalledWith(2, 'username');
      expect(createReviewReplySpy).toHaveBeenCalledTimes(1);
      expect(createReviewReplySpy).toHaveBeenLastCalledWith(payload);
      expect(wrapper.innerHTML).toBe('');
      expect(loadRepliesSpy).toHaveBeenCalledTimes(1);
      expect(loadRepliesSpy).toHaveBeenCalledWith(wrapper, 1);
      expect(resetReplySpy).toHaveBeenCalledTimes(1);
      expect(resetReplySpy).toHaveBeenCalledWith();
    });
  });

  describe('closeActiveReply()', () => {
    it('closes the active reply pane', () => {
      const reply = document.createElement('div');
      reply.style.display = 'flex';
      reply.id = 'ieee';
      document.body.innerHTML = '';
      document.body.appendChild(reply);
      localStorage.setItem('activeReply', 'ieee');
      UserReview.closeActiveReply('ieee');
      expect(localStorage.getItem('activeReply')).toBeFalsy();
      expect(reply.style.display).toBe('none');
    });
  });

  describe('handleReplyInput()', () => {
    it('handles input events on reply box', () => {
      localStorage.removeItem('reply');
      handleButtonStateSpy.mockImplementationOnce(() => {});
      document.body.innerHTML = '';
      document.body.appendChild(userReview.create());
      userReview.resetReply();
      userReview.handleReplyInput({ target: { innerText: 'new reply' } });
      expect(userReview.reply).toBe('new reply');
      expect(handleButtonStateSpy).toHaveBeenCalledTimes(1);
      expect(handleButtonStateSpy).toHaveBeenCalledWith();
      expect(localStorage.getItem('reply')).toBe('new reply');
    });
  });

  describe('resetReply()', () => {
    it('resets the reply', () => {
      document.body.innerHTML = '';
      document.body.appendChild(userReview.create());
      const box = document.getElementById(`ur-replyBox-${userReview.id}`);
      handleButtonStateSpy.mockImplementationOnce(() => {});
      userReview.handleReplyInput({ target: { innerText: 'test reply' } });
      userReview.resetReply();
      expect(userReview.reply).toBe(null);
      expect(box.innerText).toBe('');
    });
  });

  describe('handleButtonState()', () => {
    it('sets button disabled state to true', () => {
      document.body.innerHTML = '';
      document.body.appendChild(userReview.create());
      const btn = document.getElementById(`ur-replyButton-${userReview.id}`);
      btn.disabled = false;
      userReview.handleButtonState();
      expect(btn).toHaveProperty('disabled', true);
    });

    it('sets button disabled false', () => {
      document.body.innerHTML = '';
      document.body.appendChild(userReview.create());
      const btn = document.getElementById(`ur-replyButton-${userReview.id}`);
      userReview.handleReplyInput({ target: { innerText: 'test reply' } });
      userReview.handleButtonState();
      expect(btn).toHaveProperty('disabled', false);
    });
  });
});
