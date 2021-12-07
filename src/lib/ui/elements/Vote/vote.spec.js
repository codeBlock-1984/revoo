import Vote from './Vote';
import ReviewService from '../../services/Review.service';

const handleClickSpy = jest.spyOn(Vote.prototype, 'handleClick');
const registerVoteSpy = jest.spyOn(Vote.prototype, 'registerVote');
const resetValueSpy = jest.spyOn(Vote.prototype, 'resetValue');
const increaseValueSpy = jest.spyOn(Vote.prototype, 'increaseValue');
const decreaseValueSpy = jest.spyOn(Vote.prototype, 'decreaseValue');
const updateActiveStatusSpy = jest.spyOn(Vote.prototype, 'updateActiveStatus');
const getVoteTypeIdSpy = jest.spyOn(Vote.prototype, 'getVoteTypeId');
const getIconUrlSpy = jest.spyOn(Vote.prototype, 'getIconUrl');
const getAliasSpy = jest.spyOn(Vote.prototype, 'getAlias');
const serviceSpy = jest.spyOn(ReviewService, 'createReviewVote');
const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');

serviceSpy
  .mockImplementationOnce((arg) => {
    return new Promise((resolve) => {
      resolve({ data: { ResponseCode: '00' } });
    });
  })
  .mockImplementationOnce((arg) => {
    return new Promise((resolve) => {
      resolve({ data: { ResponseCode: '01' } });
    });
  });

registerVoteSpy
  .mockImplementationOnce(() => {
    return new Promise((resolve) => {
      resolve(true);
    });
  });

const arg = { reviewId: 'rev-id', value: 4, type: 'up' };
let vote = new Vote(arg.reviewId, arg.value, arg.type);
describe('Vote (class)', () => {
  it('creates instances', () => {
    expect(vote).toBeDefined();
    expect(vote).toBeInstanceOf(Vote);
    expect(vote).toEqual({ ...arg, active: false });
    expect(vote.create).toBeDefined();
    expect(vote.handleClick).toBeDefined();
    expect(vote.registerVote).toBeDefined();
    expect(vote.resetValue).toBeDefined();
    expect(vote.increaseValue).toBeDefined();
    expect(vote.decreaseValue).toBeDefined();
    expect(vote.updateActiveStatus).toBeDefined();
    expect(vote.getVoteTypeId).toBeDefined();
    expect(vote.getIconUrl).toBeDefined();
    expect(vote.getAlias).toBeDefined();
  });

  describe('create()', () => {
    it('returns a vote element', () => {
      const res = vote.create();
      const icon = res.children[0];
      const text = res.children[1];
      document.body.appendChild(res);
      expect(res.tagName).toEqual('DIV');
      expect(res.classList[0]).toEqual('ur-vote-box');
      expect(res.childElementCount).toEqual(2);
      expect(icon.tagName).toEqual('IMG');
      expect(icon.classList[0]).toEqual('ur-vote-icon');
      expect(icon.id).toEqual(`u-${vote.reviewId}`);
      expect(icon.src).toEqual('https://res.cloudinary.com/free-spirit/image/upload/v1591707618/gray-thumbs-up.png');
      expect(text.tagName).toEqual('P');
      expect(text.classList[0]).toEqual('ur-vote-text');
      expect(text.innerText).toEqual(`${vote.value}`);
      expect(getAliasSpy).toHaveBeenCalledTimes(1);
      expect(getAliasSpy).toHaveBeenCalledWith();
      expect(getIconUrlSpy).toHaveBeenCalledTimes(1);
      expect(getIconUrlSpy).toHaveBeenCalledWith('inactive');
    });
  });

  describe('handleClick()', () => {
    it('handles click events', async () => {
      const icon = document.getElementById(`u-${vote.reviewId}`);
      const event = { target: icon };
      await vote.handleClick(event);
      expect(registerVoteSpy).toHaveBeenCalledTimes(1);
      expect(registerVoteSpy).toHaveBeenCalledWith();
      expect(updateActiveStatusSpy).toHaveBeenCalledTimes(1);
      expect(updateActiveStatusSpy).toHaveBeenCalledWith();
      expect(getIconUrlSpy).toHaveBeenCalledTimes(1);
      expect(getIconUrlSpy).toHaveBeenCalledWith('active');
      expect(icon.src).toEqual('https://res.cloudinary.com/free-spirit/image/upload/v1591707618/active-thumbs-up.png');
      expect(increaseValueSpy).toHaveBeenCalledTimes(1);
      expect(increaseValueSpy).toHaveBeenCalledWith(icon.nextElementSibling);
    });

    it('resets vote if status is active', async () => {
      const icon = document.getElementById(`u-${vote.reviewId}`);
      const event = { target: icon };
      await vote.handleClick(event);
      expect(registerVoteSpy).toHaveBeenCalledTimes(0);
      expect(updateActiveStatusSpy).toHaveBeenCalledTimes(1);
      expect(updateActiveStatusSpy).toHaveBeenCalledWith();
      expect(getIconUrlSpy).toHaveBeenCalledTimes(1);
      expect(getIconUrlSpy).toHaveBeenCalledWith('inactive');
      expect(icon.src).toEqual('https://res.cloudinary.com/free-spirit/image/upload/v1591707618/gray-thumbs-up.png');
      expect(decreaseValueSpy).toHaveBeenCalledTimes(1);
      expect(decreaseValueSpy).toHaveBeenCalledWith(icon.nextElementSibling);
    });
  });

  describe('registerVote()', () => {
    it('registers a vote click for a review', async () => {
      localStorage.setItem('user', 'user-id-1');
      const res = await vote.registerVote();
      expect(getItemSpy).toHaveBeenCalledTimes(2);
      expect(getItemSpy).toHaveBeenCalledWith('user');
      expect(getVoteTypeIdSpy).toHaveBeenCalledTimes(1);
      expect(getVoteTypeIdSpy).toHaveBeenCalledWith();
      expect(serviceSpy).toHaveBeenCalledTimes(1);
      expect(serviceSpy).toHaveBeenCalledWith({ ReviewId: vote.reviewId, UserId: 'user-id-1', ReviewVoteTypeId: 1 });
      expect(res).toEqual(true);
    });

    it('registers a vote click for a review', async () => {
      localStorage.setItem('user', 'user-id-1');
      const res = await vote.registerVote();
      expect(getItemSpy).toHaveBeenCalledTimes(2);
      expect(getItemSpy).toHaveBeenCalledWith('user');
      expect(getVoteTypeIdSpy).toHaveBeenCalledTimes(1);
      expect(getVoteTypeIdSpy).toHaveBeenCalledWith();
      expect(serviceSpy).toHaveBeenCalledTimes(1);
      expect(serviceSpy).toHaveBeenCalledWith({ ReviewId: vote.reviewId, UserId: 'user-id-1', ReviewVoteTypeId: 1 });
      expect(res).toEqual(false);
    });
  });

  describe('resetValue()', () => {
    it('resets the vote element', () => {
      const icon = document.getElementById(`u-${vote.reviewId}`);
      const event = { target: icon };
      vote.updateActiveStatus();
      vote.resetValue(icon);
      expect(icon.src).toEqual('https://res.cloudinary.com/free-spirit/image/upload/v1591707618/gray-thumbs-up.png');
      expect(updateActiveStatusSpy).toHaveBeenCalledTimes(2);
      expect(updateActiveStatusSpy).toHaveBeenLastCalledWith();
      expect(decreaseValueSpy).toHaveBeenCalledTimes(1);
      expect(decreaseValueSpy).toHaveBeenLastCalledWith(icon.nextElementSibling);
    });
  });

  describe('increaseValue()', () => {
    it('increases the value of the vote object', () => {
      const icon = document.getElementById(`u-${vote.reviewId}`);
      const text = icon.nextElementSibling;
      const currentValue = vote.value;
      vote.increaseValue(text);
      expect(vote.value).toEqual(currentValue + 1);
      expect(text.innerText).toEqual(vote.value);
    });
  });

  describe('decreaseValue()', () => {
    it('decreases the value of the vote object', () => {
      const icon = document.getElementById(`u-${vote.reviewId}`);
      const text = icon.nextElementSibling;
      const currentValue = vote.value;
      vote.decreaseValue(text);
      expect(vote.value).toEqual(currentValue - 1);
      expect(text.innerText).toEqual(vote.value);
    });
  });

  describe('updateActiveStatus()', () => {
    it('reverses the current status of the vote object', () => {
      const currentStatus = vote.active;
      vote.updateActiveStatus();
      expect(vote.active).toEqual(!currentStatus);
    });
  });

  describe('getVoteTypeId()', () => {
    it('returns the vote type id of the vote object', () => {
      expect(vote.getVoteTypeId()).toEqual(1);
    });
  });

  describe('getIconUrl()', () => {
    it('returns the url of a vote type', () => {
      expect(vote.getIconUrl('inactive')).toEqual('https://res.cloudinary.com/free-spirit/image/upload/v1591707618/gray-thumbs-up.png');
      expect(vote.getIconUrl('active')).toEqual('https://res.cloudinary.com/free-spirit/image/upload/v1591707618/active-thumbs-up.png');
    });
  });

  describe('getAlias()', () => {
    it('returns the vote object alias', () => {
      expect(vote.getAlias()).toEqual('u');
    });
  });
});
