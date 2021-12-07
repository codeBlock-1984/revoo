import MakeRequest from '../helpers/MakeRequest';

const baseUrl = 'http://invtestsrv00.northcentralus.cloudapp.azure.com/reviews.service/api/';

class ReviewService {
  static async create(payload) {
    const { secret, data } = payload;
    const options = ReviewService.getOptions(`${baseUrl}Reviews/Create`, 'POST', secret, data);
    const res = await MakeRequest.send(options);
    return res;
  }

  static async getReviews(payload) {
    const { secret, feature, page } = payload;
    const options = ReviewService.getOptions(`${baseUrl}Reviews/Search?appFeature=${feature}&withComment=true&page=${page}&sort=-CreatedAt`, 'GET', secret);
    const res = await MakeRequest.send(options);
    return res;
  }

  static async getReviewStats(payload) {
    const { secret, feature } = payload;
    const options = ReviewService.getOptions(`${baseUrl}ReviewStats/Search?appFeature=${feature}`, 'GET', secret);
    const res = await MakeRequest.send(options);
    return res;
  }

  static async createReviewVote(payload) {
    const secret = ReviewService.getSecret();
    const options = ReviewService.getOptions(`${baseUrl}ReviewVotes/Create`, 'POST', secret, payload);
    const res = await MakeRequest.send(options);
    return res;
  }

  static async createReviewReply(payload) {
    const secret = ReviewService.getSecret();
    const options = ReviewService.getOptions(`${baseUrl}Replies/Create`, 'POST', secret, payload);
    const res = await MakeRequest.send(options);
    return res;
  }

  static async getReviewReplies(payload) {
    const secret = ReviewService.getSecret();
    const { reviewId, page } = payload;
    const options = ReviewService.getOptions(`${baseUrl}Replies/Search?reviewId=${reviewId}&page=${page}&pageSize=5&sort=-CreatedAt`, 'GET', secret);
    const res = await MakeRequest.send(options);
    return res;
  }

  static getSecret() {
    const secret = localStorage.getItem('secret');
    return secret;
  }

  static getOptions(url, method, secret, body=null) {
    const options = {
      url,
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-ClientSecret': secret
      }
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    return options;
  }
}

export default ReviewService;
