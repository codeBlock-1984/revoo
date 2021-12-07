import Stars from './Stars';
import Utils from '../../utils/Utils';

const createSpy = jest.spyOn(Stars.prototype, 'createStar');
const createStaticSpy = jest.spyOn(Stars.prototype, 'createStaticStar');
const getIdDataSpy = jest.spyOn(Stars, 'getIdData');
const colorStarsSpy = jest.spyOn(Stars, 'colorStars');
const resetStarsSpy = jest.spyOn(Stars, 'resetStars');
const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
const parseIdSpy = jest.spyOn(Utils, 'parseId');

let stars = new Stars('test-feature');
describe('Stars (class)', () => {
  it('produces new instances', () => {
    expect(stars).toBeDefined();
    expect(stars).toEqual({ value: 0, feature: 'test-feature' });
    expect(stars.create).toBeDefined();
    expect(stars.createStar).toBeDefined();
    expect(stars.createStatic).toBeDefined();
    expect(stars.createStaticStar).toBeDefined();
    expect(stars.handleStarClick).toBeDefined();
    expect(stars.handleStarMouseover).toBeDefined();
    expect(stars.handleStarMouseout).toBeDefined();
  });

  describe('create()', () => {
    it('creates a stars element', () => {
      const res = stars.create();
      document.body.appendChild(res);
      expect(res.tagName).toEqual('DIV');
      expect(res).toHaveProperty(['classList', 0], 'ur-stars');
      expect(createSpy).toHaveBeenCalledTimes(5);
      let count = 1;
      while (count < 6) {
        expect(createSpy).toHaveBeenNthCalledWith(count, count);
        expect(res.children[count - 1].tagName).toEqual('IMG');
        expect(res.children[count - 1].id).toEqual(`ur-s-${count}%test-feature`);
        count++;
      }
    });
  });

  describe('createStar()', () => {
    it('creates a clickable star element', () => {
      const star = stars.createStar(2);
      expect(star.tagName).toEqual('IMG');
      expect(star.id).toEqual('ur-s-2%test-feature');
      expect(star).toHaveProperty(['dataset', 'feature'], 'test-feature');
      expect(star).toHaveProperty(['classList', 0], 'ur-star');
      expect(star).toHaveProperty('src', 'https://res.cloudinary.com/free-spirit/image/upload/v1591359264/icons8-star-96_2.png');
      expect(star).toHaveProperty('alt', 'rating star icon');
    });
  });

  describe('createStatic()', () => {
    it('creates a stars element', () => {
      const res = stars.createStatic(3);
      expect(res.tagName).toEqual('DIV');
      expect(res).toHaveProperty(['classList', 0], 'ur-static-stars');
      expect(createStaticSpy).toHaveBeenCalledTimes(5);
      let count = 1;
      while (count < 6) {
        expect(createStaticSpy).toHaveBeenNthCalledWith(count, count > 3);
        expect(res.children[count - 1].tagName).toEqual('IMG');
        expect(res.children[count - 1].classList[0]).toEqual('ur-star');
        count++;
      }
    });
  });

  describe('createStaticStar()', () => {
    it('creates a non-clickable star element', () => {
      const star = stars.createStaticStar(true);
      const starTwo = stars.createStaticStar(false);
      expect(star.tagName).toEqual('IMG');
      expect(star).toHaveProperty(['dataset', 'feature'], 'test-feature');
      expect(star).toHaveProperty(['classList', 0], 'ur-star');
      expect(star).toHaveProperty('src', 'https://res.cloudinary.com/free-spirit/image/upload/v1591359264/icons8-star-96_2.png');
      expect(starTwo).toHaveProperty('src', 'https://res.cloudinary.com/free-spirit/image/upload/v1591357954/icons8-star-96.png');
      expect(star).toHaveProperty('alt', 'rating star icon');
    });
  });

  describe('handleStarClick()', () => {
    it('handles click event', () => {
      const event = { target: { id: 'ur-s-4%test-feature' } };
      stars.handleStarClick(event);
      expect(getIdDataSpy).toHaveBeenCalledTimes(1);
      expect(getIdDataSpy).toHaveBeenCalledWith(event);
      expect(resetStarsSpy).toHaveBeenCalledTimes(1);
      expect(resetStarsSpy).toHaveBeenCalledWith('test-feature');
      expect(colorStarsSpy).toHaveBeenCalledTimes(1);
      expect(colorStarsSpy).toHaveBeenCalledWith(4, 'test-feature');
      expect(localStorage.getItem('rating')).toEqual(4);
      expect(localStorage.getItem('starValue')).toEqual(4);
      expect(localStorage.getItem('ratingType')).toEqual('star');
    });
  });

  describe('handleStarMouseover()', () => {
    it('handles mouseover', () => {
      const event = { target: { id: 'ur-s-5%test-feature' } };
      stars.handleStarMouseover(event);
      expect(getIdDataSpy).toHaveBeenCalledTimes(1);
      expect(getIdDataSpy).toHaveBeenCalledWith(event);
      expect(colorStarsSpy).toHaveBeenCalledTimes(1);
      expect(colorStarsSpy).toHaveBeenCalledWith(5, 'test-feature');
    });
  });

  describe('handleStarMouseout()', () => {
    it('handles mouseout', () => {
      const event = { target: { id: 'ur-s-5%test-feature' } };
      localStorage.setItem('starValue', 3);
      stars.handleStarMouseout(event);
      expect(getIdDataSpy).toHaveBeenCalledTimes(1);
      expect(getIdDataSpy).toHaveBeenCalledWith(event);
      expect(mockGetItem).toHaveBeenCalledTimes(1);
      expect(mockGetItem).toHaveBeenCalledWith('starValue');
      expect(resetStarsSpy).toHaveBeenCalledTimes(1);
      expect(resetStarsSpy).toHaveBeenCalledWith('test-feature');
      expect(colorStarsSpy).toHaveBeenCalledTimes(1);
      expect(colorStarsSpy).toHaveBeenCalledWith(3, 'test-feature');
    });

    it('handles mouseout with no star value', () => {
      const event = { target: { id: 'ur-s-5%test-feature' } };
      localStorage.removeItem('starValue');
      stars.handleStarMouseout(event);
      expect(getIdDataSpy).toHaveBeenCalledTimes(1);
      expect(getIdDataSpy).toHaveBeenCalledWith(event);
      expect(mockGetItem).toHaveBeenCalledTimes(1);
      expect(mockGetItem).toHaveBeenCalledWith('starValue');
      expect(resetStarsSpy).toHaveBeenCalledTimes(1);
      expect(resetStarsSpy).toHaveBeenCalledWith('test-feature');
      expect(colorStarsSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('colorStars()', () => {
    it('sets the src of star img elements to yellow icon url', () => {
      Stars.colorStars(5, 'test-feature');
      let count = 1;
      while (count < 6) {
        let star = document.getElementById(`ur-s-${count}%test-feature`);
        expect(star.src).toEqual('https://res.cloudinary.com/free-spirit/image/upload/v1591357954/icons8-star-96.png');
        count++;
      }
    });
  });

  describe('resetStars()', () => {
    it('sets the src of star img elements to grey icon url', () => {
      Stars.resetStars('test-feature');
      let count = 1;
      while (count < 6) {
        let star = document.getElementById(`ur-s-${count}%test-feature`);
        expect(star.src).toEqual('https://res.cloudinary.com/free-spirit/image/upload/v1591359264/icons8-star-96_2.png');
        count++;
      }
    });
  });

  describe('getIdData()', () => {
    it('calls Utils parseId method', () => {
      Stars.getIdData({ target: { id: 'ur-s-3%test-feature' } });
      expect(parseIdSpy).toHaveBeenCalledTimes(1);
      expect(parseIdSpy).toHaveBeenCalledWith('ur-s-3%test-feature');
    });
  });
});
