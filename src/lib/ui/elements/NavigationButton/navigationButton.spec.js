import NavigationButton from './NavigationButton';

const getUrlSpy = jest.spyOn(NavigationButton.prototype, 'getUrl');

let navigationButton = new NavigationButton('left', 'one', true);
describe('NavigationButton (class)', () => {
  it('can produce instances', () => {
    expect(navigationButton).toBeDefined();
    expect(navigationButton).toEqual({ type: 'left', shade: 'one', active: true });
    expect(navigationButton.create).toBeDefined();
  });

  describe('create()', () => {
    it('creates a navigation button element', () => {
      const res = navigationButton.create();
      expect(res.tagName).toEqual('DIV');
      expect(res.classList).toHaveProperty([0], 'ur-navigation-button-box');
      expect(res.firstElementChild.tagName).toEqual('IMG');
      expect(res.firstElementChild.dataset.active).toEqual('true');
      expect(res.firstElementChild.dataset.name).toEqual('navigationButton');
      expect(res.firstElementChild.dataset.type).toEqual('left');
      expect(res.firstElementChild.classList).toHaveProperty([0], 'ur-navigation-button');
      expect(res.firstElementChild.src).toEqual('https://res.cloudinary.com/free-spirit/image/upload/v1591795025/left-one.png');
      expect(getUrlSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUrl()', () => {
    it('returns the specified button url', () => {
      expect(navigationButton.getUrl('three')).toEqual('https://res.cloudinary.com/free-spirit/image/upload/v1591795304/left-three.png');
    });
  });

  describe('handleHover()', () => {
    it('handles hover events', () => {
      const res = navigationButton.create();
      const event = { target: res };
      navigationButton.handleHover(event);
      expect(res.src).toEqual('https://res.cloudinary.com/free-spirit/image/upload/v1591795304/left-three.png');
    });
  });
});
