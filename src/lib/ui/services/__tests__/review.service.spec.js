import ReviewService from '../Review.service';
import MakeRequest from '../../helpers/MakeRequest';

const getOptionsSpy = jest.spyOn(ReviewService, 'getOptions');
const getSecretSpy = jest.spyOn(ReviewService, 'getSecret');
const sendSpy = jest.spyOn(MakeRequest, 'send');
sendSpy.mockImplementation(() => {
  return { bar: 'bar' };
});

const secret = 'secret';
const data = { foo: 'foo' };
const feature = 'feature';
const page = 4;
const reviewId = 'klaskidkuppo';

const payload = {
  secret,
  data,
  feature,
  page
};
const options = {
  headers: {
    'Content-Type': 'application/json',
    'X-ClientSecret': secret
  }
};

const body = JSON.stringify(data);
const baseUrl = 'http://invtestsrv00.northcentralus.cloudapp.azure.com/reviews.service/api/';


describe('MakeRequest (class)', () => {
  describe('create()', () => {
    it('creates a review', async () => {
      const url = `${baseUrl}Reviews/Create`;
      const res = await ReviewService.create(payload);
      expect(getOptionsSpy).toHaveBeenCalledTimes(1);
      expect(getOptionsSpy).toHaveBeenCalledWith(url, 'POST', secret, data);
      expect(sendSpy).toHaveBeenCalledTimes(1);
      expect(sendSpy).toHaveBeenCalledWith({ ...options, url, method: 'POST', body });
      expect(res).toEqual({ bar: 'bar' });
    });
  });

  describe('getReviews()', () => {
    it('fetches the reviews list', async () => {
      const url = `${baseUrl}Reviews/Search?appFeature=${feature}&withComment=true&page=${page}&sort=-CreatedAt`;
      const res = await ReviewService.getReviews(payload);
      expect(getOptionsSpy).toHaveBeenCalledTimes(1);
      expect(getOptionsSpy).toHaveBeenCalledWith(url, 'GET', secret);
      expect(sendSpy).toHaveBeenCalledTimes(1);
      expect(sendSpy).toHaveBeenCalledWith({ ...options, url, method: 'GET' });
      expect(res).toEqual({ bar: 'bar' });
    });
  });

  describe('getReviewStats()', () => {
    it('returns the stats of a review', async () => {
      const url = `${baseUrl}ReviewStats/Search?appFeature=${feature}`;
      const res = await ReviewService.getReviewStats(payload);
      expect(getOptionsSpy).toHaveBeenCalledTimes(1);
      expect(getOptionsSpy).toHaveBeenCalledWith(url, 'GET', secret);
      expect(sendSpy).toHaveBeenCalledTimes(1);
      expect(sendSpy).toHaveBeenCalledWith({ ...options, url, method: 'GET' });
      expect(res).toEqual({ bar: 'bar' });
    });
  });

  describe('createReviewVote()', () => {
    it('creates a review vote', async () => {
      localStorage.setItem('secret', 'secret');
      const url = `${baseUrl}ReviewVotes/Create`;
      const res = await ReviewService.createReviewVote(payload);
      expect(getSecretSpy).toHaveBeenCalledTimes(1);
      expect(getSecretSpy).toHaveBeenCalledWith();
      expect(getOptionsSpy).toHaveBeenCalledTimes(1);
      expect(getOptionsSpy).toHaveBeenCalledWith(url, 'POST', secret, payload);
      expect(sendSpy).toHaveBeenCalledTimes(1);
      expect(sendSpy).toHaveBeenCalledWith({ ...options, url, method: 'POST', body: JSON.stringify(payload) });
      expect(res).toEqual({ bar: 'bar' });
    });
  });

  describe('createReviewReply()', () => {
    it('creates a review reply', async () => {
      localStorage.setItem('secret', 'secret');
      const url = `${baseUrl}Replies/Create`;
      const res = await ReviewService.createReviewReply(payload);
      expect(getSecretSpy).toHaveBeenCalledTimes(1);
      expect(getSecretSpy).toHaveBeenCalledWith();
      expect(getOptionsSpy).toHaveBeenCalledTimes(1);
      expect(getOptionsSpy).toHaveBeenCalledWith(url, 'POST', secret, payload);
      expect(sendSpy).toHaveBeenCalledTimes(1);
      expect(sendSpy).toHaveBeenCalledWith({ ...options, url, method: 'POST', body: JSON.stringify(payload) });
      expect(res).toEqual({ bar: 'bar' });
    });
  });

  describe('getReviewReplies()', () => {
    it('returns the replies on a review', async () => {
      payload.reviewId = reviewId;
      const url = `${baseUrl}Replies/Search?reviewId=${reviewId}&page=${page}&pageSize=5&sort=-CreatedAt`;
      const res = await ReviewService.getReviewReplies(payload);
      expect(getOptionsSpy).toHaveBeenCalledTimes(1);
      expect(getOptionsSpy).toHaveBeenCalledWith(url, 'GET', secret);
      expect(sendSpy).toHaveBeenCalledTimes(1);
      expect(sendSpy).toHaveBeenCalledWith({ ...options, url, method: 'GET' });
      expect(res).toEqual({ bar: 'bar' });
    });
  });

  describe('getSecret()', () => {
    it('returns the secret', () => {
      expect(ReviewService.getSecret()).toBe('secret');
    });
  });

  describe('getOptions()', () => {
    it('returns the options object', () => {
      const res = ReviewService.getOptions('test-url', 'POST', secret, { baz: 'baz' });
      expect(res).toEqual({ url: 'test-url', method: 'POST', ...options, body: JSON.stringify({ baz: 'baz' }) });
    });
  });
});
