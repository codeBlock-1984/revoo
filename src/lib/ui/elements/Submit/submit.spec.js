import Submit from './Submit';
import ReviewService from '../../services/Review.service';
import Comment from '../Comment/Comment';
import Stars from '../Stars/Stars';
import Emojis from '../Emojis/Emojis';
import Utils from '../../utils/Utils';

const setSessionDataSpy = jest.spyOn(Submit.prototype, 'setSessionData');
const validateSpy = jest.spyOn(Submit.prototype, 'validate');
const initiateLoaderSpy = jest.spyOn(Submit.prototype, 'initiateLoader');
const getReviewTypeSpy = jest.spyOn(Submit.prototype, 'getReviewType');
const fadeResultSpy = jest.spyOn(Submit.prototype, 'fadeResult');
const serviceCreateSpy = jest.spyOn(ReviewService, 'create');
const handleResultSpy = jest.spyOn(Submit.prototype, 'handleResult');
const handleErrorSpy = jest.spyOn(Submit.prototype, 'handleError');
const resetResultSpy = jest.spyOn(Submit.prototype, 'resetResult');
const resetCommentSpy = jest.spyOn(Comment, 'resetComment');
const resetStarsSpy = jest.spyOn(Stars, 'resetStars');
const resetEmojisSpy = jest.spyOn(Emojis, 'resetEmojis');
const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
const getValueSpy = jest.spyOn(Utils, 'getValue');

jest.useFakeTimers();
fadeResultSpy
  .mockImplementationOnce((element, customClass) => { })
  .mockImplementationOnce((element, customClass) => { })
  .mockImplementationOnce((element, customClass) => { });

serviceCreateSpy
  .mockImplementation((payload) => {
    return new Promise((resolve) => {
      resolve({ data: 'data', error: null });
    });
  })
  .mockImplementationOnce((payload) => {
    return new Promise((resolve) => {
      resolve({ data: 'data', error: null });
    }); 
  })
  .mockImplementationOnce((payload) => {
    return new Promise((resolve) => {
      resolve({ data: null, error: 'error' });
    }); 
  });

const initStorage = () => {
  localStorage.setItem('rating', 4);
  localStorage.setItem('ratingType', 'star');
  localStorage.setItem('comment', 'test comment');
  localStorage.setItem('secret', 'secret');
  localStorage.setItem('user', 'user');
  localStorage.setItem('feature', 'feature');
};

let submit = new Submit('white');
describe('Submit (class)', () => {
  it('produces new instances', () => {
    expect(submit).toBeDefined();
    expect(submit).toEqual({ color: 'white', rating: '', comment: '', secret: null, user: null, feature: null, username: null });
    expect(submit.create).toBeDefined();
    expect(submit.handleSubmit).toBeDefined();
    expect(submit.getReviewType).toBeDefined();
    expect(submit.validate).toBeDefined();
    expect(submit.initiateLoader).toBeDefined();
    expect(submit.setSessionData).toBeDefined();
    expect(submit.handleResult).toBeDefined();
    expect(submit.fadeResult).toBeDefined();
  });

  describe('create()', () => {
    it('creates a submit button', () => {
      let res = submit.create();
      expect(res.tagName).toEqual('BUTTON');
      expect(res.classList).toHaveProperty([0], 'ur-submit');
      expect(res.id).toEqual('ur-submitButton');
      expect(res.style.backgroundColor).toBe('white');
      expect(res).toHaveProperty(['dataset', 'name'], 'submit');
      expect(res.innerText).toEqual('submit');
    });
  });

  describe('handleSubmit()', () => {
    it('handles submit action', async () => {
      const resultText = document.createElement('DIV');
      resultText.id = 'ur-resultText';
      resultText.classList.add('ur-error');
      document.body.appendChild(resultText);
      const event = { stopPropagation: jest.fn() };
      const payload = { secret: 'secret', data: { Comment: 'test comment', Rating: 4, AppFeature: 'feature', UserId: 'user', ReviewTypeId: 1, ParentId: 0 } };
      initStorage();
      await submit.handleSubmit(event);
      expect(setSessionDataSpy).toHaveBeenCalledTimes(1);
      expect(setSessionDataSpy).toHaveBeenCalledWith();
      expect(validateSpy).toHaveBeenCalledTimes(1);
      expect(validateSpy).toHaveBeenCalledWith();
      expect(initiateLoaderSpy).toHaveBeenCalledTimes(1);
      expect(initiateLoaderSpy).toHaveBeenCalledWith();
      expect(getReviewTypeSpy).toHaveBeenCalledTimes(1);
      expect(getReviewTypeSpy).toHaveBeenCalledWith('star', 4, 'test comment');
      expect(serviceCreateSpy).toHaveBeenCalledTimes(1);
      expect(serviceCreateSpy).toHaveBeenCalledWith(payload);
      expect(handleErrorSpy).toHaveBeenCalledTimes(0);
      expect(handleResultSpy).toHaveBeenCalledTimes(1);
      expect(handleResultSpy).toHaveBeenCalledWith({ data: 'data', error: null });
      expect(removeItemSpy).toHaveBeenCalledTimes(4);
      expect(removeItemSpy).toHaveBeenNthCalledWith(1, 'rating');
      expect(removeItemSpy).toHaveBeenNthCalledWith(2, 'ratingType');
      expect(removeItemSpy).toHaveBeenNthCalledWith(3, 'comment');
      expect(removeItemSpy).toHaveBeenNthCalledWith(4, 'starValue');
      expect(resetCommentSpy).toHaveBeenCalledTimes(1);
      expect(resetCommentSpy).toHaveBeenCalledWith();
      expect(resetStarsSpy).toHaveBeenCalledTimes(1);
      expect(resetStarsSpy).toHaveBeenCalledWith();
      expect(resetEmojisSpy).toHaveBeenCalledTimes(1);
      expect(resetEmojisSpy).toHaveBeenCalledWith('colour');
      expect(event.stopPropagation).toHaveBeenCalledTimes(1);
      expect(event.stopPropagation).toHaveBeenCalledWith();
    });

    it('returns undefined when validation fails', async () => {
      const event = { stopPropagation: jest.fn() };
      let result = await submit.handleSubmit(event);
      expect(setSessionDataSpy).toHaveBeenCalledTimes(1);
      expect(setSessionDataSpy).toHaveBeenCalledWith();
      expect(validateSpy).toHaveBeenCalledTimes(1);
      expect(validateSpy).toHaveBeenCalledWith();
      expect(result).toEqual(undefined);
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
      expect(handleErrorSpy).toHaveBeenCalledWith();
      expect(initiateLoaderSpy).toHaveBeenCalledTimes(0);
      expect(getReviewTypeSpy).toHaveBeenCalledTimes(0);
      expect(serviceCreateSpy).toHaveBeenCalledTimes(0);
      expect(handleResultSpy).toHaveBeenCalledTimes(0);
      expect(removeItemSpy).toHaveBeenCalledTimes(0);
      expect(resetCommentSpy).toHaveBeenCalledTimes(0);
      expect(resetStarsSpy).toHaveBeenCalledTimes(0);
      expect(resetEmojisSpy).toHaveBeenCalledTimes(0);
      expect(event.stopPropagation).toHaveBeenCalledTimes(0);
    });
  });

  describe('getReviewType()', () => {
    it('returns the id of the reviewType', () => {
      expect(submit.getReviewType('star', 4, 'comment')).toEqual(1);
      expect(submit.getReviewType('emoji', 3, '')).toEqual(4);
      expect(submit.getReviewType('star', 5, '')).toEqual(3);
      expect(submit.getReviewType('', null, 'comment')).toEqual(2);
      expect(submit.getReviewType('', null, '')).toEqual(null);
    });
  });

  describe('validate()', () => {
    it('validates submit data and returns a boolean result', () => {
      expect(submit.validate()).toEqual(false);
      initStorage();
      submit.setSessionData();
      expect(submit.validate()).toEqual(true);
    });
  });

  describe('initiateLoader()', () => {
    it('sets resultText innerText value', () => {
      const resultText = document.getElementById('ur-resultText');
      submit.initiateLoader();
      expect(resultText.classList).toContain('ur-normal');
      expect(resultText.classList).not.toContain('ur-error');
      expect(resultText.innerText).toEqual('sending...');
    });
  });

  describe('setSessionData', () => {
    it('sets submit data from storage', () => {
      submit.setSessionData();
      expect(getValueSpy).toHaveBeenCalledTimes(2);
      expect(getValueSpy).toHaveBeenNthCalledWith(1, 4, 0);
      expect(getValueSpy).toHaveBeenNthCalledWith(2, 'test comment', '');
      expect(getItemSpy).toHaveBeenCalledTimes(7);
      expect(getItemSpy).toHaveBeenNthCalledWith(1, 'rating');
      expect(getItemSpy).toHaveBeenNthCalledWith(2, 'ratingType');
      expect(getItemSpy).toHaveBeenNthCalledWith(3, 'comment');
      expect(getItemSpy).toHaveBeenNthCalledWith(4, 'secret');
      expect(getItemSpy).toHaveBeenNthCalledWith(5, 'user');
      expect(getItemSpy).toHaveBeenNthCalledWith(6, 'username');
      expect(getItemSpy).toHaveBeenNthCalledWith(7, 'feature');
    });
  });

  describe('handleResult()', () => {
    it('handles submit action success result', () => {
      const resultText = document.createElement('DIV');
      resultText.id = 'ur-resultText';
      document.body.innerHTML = '';
      document.body.appendChild(resultText);
      submit.handleResult({ data: 'data', error: null });
      expect(resultText.classList).toContain('ur-success');
      expect(resultText.innerText).toEqual('Review sent successfully!');
      expect(fadeResultSpy).toHaveBeenCalledTimes(1);
      expect(fadeResultSpy).toHaveBeenCalledWith(resultText, 'ur-success');
    });

    it('handles submit action error result', () => {
      const resultText = document.createElement('DIV');
      resultText.id = 'ur-resultText';
      document.body.innerHTML = '';
      document.body.appendChild(resultText);
      submit.handleResult({ data: null, error: 'error' });
      expect(resultText.classList).toContain('ur-error');
      expect(resultText.innerText).toEqual('Oops! Your review could not be sent at this time. Try again later.');
      expect(fadeResultSpy).toHaveBeenCalledTimes(1);
      expect(fadeResultSpy).toHaveBeenCalledWith(resultText, 'ur-error');
    });
  });

  describe('handleError()', () => {
    it('handles validation error', () => {
      const resultText = document.createElement('DIV');
      resultText.id = 'ur-resultText';
      document.body.innerHTML = '';
      document.body.appendChild(resultText);
      const res = submit.handleError();
      expect(resultText.classList).toContain('ur-error');
      expect(resultText.innerText).toEqual('You cannot submit nothing');
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
      expect(res).toEqual(undefined);
    });
  });

  describe('resetResult', () => {
    it('resets resultText', () => {
      const resultText = document.createElement('DIV');
      resultText.id = 'ur-resultText';
      resultText.classList.add('ur-error');
      document.body.innerHTML = 'You cannot submit nothing';
      document.body.appendChild(resultText);
      const myFunc = jest.fn();
      submit.resetResult(resultText, 'ur-error', myFunc);
      expect(resultText.classList).not.toContain('ur-error');
      expect(resultText.innerText).toEqual('');
      expect(myFunc).toHaveBeenCalledTimes(1);
      expect(myFunc).toHaveBeenLastCalledWith();
    });
  });

  describe('fadeResult()', () => {
    it('resets resultText and reloads page', () => {
      submit.fadeResult();
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 4000);
    });
  });
});
