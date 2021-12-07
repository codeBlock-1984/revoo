import Emojis from './Emojis';
import Utils from '../../utils/Utils';

const createEmojiSpy = jest.spyOn(Emojis.prototype, 'createEmoji');
const getEmojiNameSpy = jest.spyOn(Emojis, 'getEmojiName');
const getIconUrlSpy = jest.spyOn(Emojis, 'getIconUrl');
const getIdDataSpy = jest.spyOn(Emojis, 'getIdData');
const resetEmojisSpy = jest.spyOn(Emojis, 'resetEmojis');
const parseIdSpy = jest.spyOn(Utils, 'parseId');

const urls = {
  'colour': {
    1: 'https://res.cloudinary.com/free-spirit/image/upload/v1591376352/1.png',
    2: 'https://res.cloudinary.com/free-spirit/image/upload/v1591376353/2.png',
    3: 'https://res.cloudinary.com/free-spirit/image/upload/v1591376353/3.png',
    4: 'https://res.cloudinary.com/free-spirit/image/upload/v1591376352/4.png',
    5: 'https://res.cloudinary.com/free-spirit/image/upload/v1591376352/5.png'
  },
  'grey': {
    1: 'https://res.cloudinary.com/free-spirit/image/upload/v1591378063/01.png',
    2: 'https://res.cloudinary.com/free-spirit/image/upload/v1591378063/02.png',
    3: 'https://res.cloudinary.com/free-spirit/image/upload/v1591378063/03.png',
    4: 'https://res.cloudinary.com/free-spirit/image/upload/v1591378063/04.png',
    5: 'https://res.cloudinary.com/free-spirit/image/upload/v1591378063/05.png'
  }
};

let emojis = new Emojis('Test');
describe('Emojis (class)', () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });

  it('produces instances', () => {
    expect(emojis).toBeDefined();
    expect(emojis).toBeInstanceOf(Emojis);
    expect(emojis.value).toEqual(0);
    expect(emojis.feature).toEqual('Test');
    expect(emojis.create).toBeDefined();
    expect(emojis.createEmoji).toBeDefined();
    expect(emojis.handleEmojiClick).toBeDefined();
  });

  describe('create()', () => {
    it('creates an emojis element', () => {
      let res = emojis.create();
      document.body.appendChild(res);
      expect(res.tagName).toEqual('DIV');
      expect(res.classList).toHaveProperty([0], 'ur-emojis');
      expect(res.children.length).toEqual(5);
      expect(createEmojiSpy).toHaveBeenCalledTimes(5);
      expect(createEmojiSpy).toHaveBeenNthCalledWith(1, 1);
      expect(createEmojiSpy).toHaveBeenNthCalledWith(2, 2);
      expect(createEmojiSpy).toHaveBeenNthCalledWith(3, 3);
      expect(createEmojiSpy).toHaveBeenNthCalledWith(4, 4);
      expect(createEmojiSpy).toHaveBeenNthCalledWith(5, 5);
    });
  });

  describe('createEmoji()', () => {
    it('creates an emoji element', () => {
      let res = emojis.createEmoji(2);
      expect(res.tagName).toEqual('DIV');
      expect(res.classList).toHaveProperty([0], 'ur-emoji-box');
      expect(res.children.length).toEqual(2);
      expect(res.children[1].tagName).toEqual('DIV');
      expect(res.children[1].id).toEqual('ur-emoji-hintBox-2%Test');
      expect(res.children[1].classList).toHaveProperty([0], 'ur-emoji-hint-box');
      expect(res.children[1].children.length).toEqual(1);
      expect(res.children[1].firstElementChild.tagName).toEqual('P');
      expect(res.children[1].firstElementChild.classList).toHaveProperty([0], 'ur-emoji-hint');
      expect(res.children[1].firstElementChild.innerText).toEqual('disappointed');
      expect(res.children[0].tagName).toEqual('IMG');
      expect(res.children[0].classList).toHaveProperty([0], 'ur-emoji');
      expect(res.children[0].src).toEqual('https://res.cloudinary.com/free-spirit/image/upload/v1591376353/2.png');
      expect(res.children[0].id).toEqual('ur-e-2%Test');
      expect(res.children[0].alt).toEqual('rating emoji icon');
      expect(getEmojiNameSpy).toHaveBeenCalledTimes(1);
      expect(getEmojiNameSpy).toHaveBeenCalledWith(2);
      expect(getIconUrlSpy).toHaveBeenCalledTimes(1);
      expect(getIconUrlSpy).toHaveBeenCalledWith('colour', 2);      
    });
  });

  describe('handleEmojiClick', () => {
    it('handles click event on emoji element', () => {
      const event = { target: { id: 'ur-e-2%Test' } };
      emojis.handleEmojiClick(event);
      const clickedEmoji = document.getElementById('ur-e-2%Test');
      const emojiHint = document.getElementById('ur-emoji-hintBox-2%Test');
      expect(getIdDataSpy).toHaveBeenCalledTimes(1);
      expect(getIdDataSpy).toHaveBeenCalledWith(event);
      expect(resetEmojisSpy).toHaveBeenCalledTimes(1);
      expect(resetEmojisSpy).toHaveBeenCalledWith('grey', 'Test');
      expect(clickedEmoji.src).toEqual('https://res.cloudinary.com/free-spirit/image/upload/v1591376353/2.png');
      expect(getIconUrlSpy).toHaveBeenCalledTimes(6);
      expect(getIconUrlSpy).toHaveBeenCalledWith('colour', 2);
      expect(emojiHint.style.display).toEqual('flex');
      expect(localStorage.getItem('rating')).toEqual(2);
      expect(localStorage.getItem('ratingType')).toEqual('emoji');
    });
  });

  describe('resetEmojis()', () => {
    it('resets emojis to a specified colour', () => {
      Emojis.resetEmojis('grey', 'Test');
      let count = 1;
      while (count < 6) {
        let emoji = document.getElementById(`ur-e-${count}%Test`);
        let emojiHint = document.getElementById(`ur-emoji-hintBox-${count}%Test`);
        expect(emoji.src).toEqual(urls['grey'][count]);
        expect(emojiHint.style.display).toEqual('none');
        count++;
      }
      expect(getIconUrlSpy).toHaveBeenCalledTimes(5);
    });
  });

  describe('getIdData()', () => {
    it('calls Utils parseId method', () => {
      const arg = { target:  { id: 'ur-e-2%Test' } };
      Emojis.getIdData(arg);
      expect(parseIdSpy).toHaveBeenCalledTimes(1);
      expect(parseIdSpy).toHaveBeenCalledWith('ur-e-2%Test');
    });
  });

  describe('getEmojiName()', () => {
    it('returns emoji hint', () => {
      expect(Emojis.getEmojiName(3)).toEqual('meh');
    });
  });

  describe('getIconUrl()', () => {
    it('returns the url for an emoji with colour and id', () => {
      expect(Emojis.getIconUrl('grey', 1)).toEqual('https://res.cloudinary.com/free-spirit/image/upload/v1591378063/01.png');
    });
  });
});
