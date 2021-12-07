import PageLink from './PageLink';

const getColourSpy = jest.spyOn(PageLink.prototype, 'getColour');

let pageLink = new PageLink('1', true);
describe('PageLink (class)', () => {
  it('produces instances', () => {
    expect(pageLink).toBeDefined();
    expect(pageLink).toBeInstanceOf(PageLink);
    expect(pageLink).toEqual({ text: '1', active: true });
    expect(pageLink.create).toBeDefined();
    expect(pageLink.getColour).toBeDefined();
  });

  describe('create()', () => {
    it('creates a link element', () => {
      let res = pageLink.create();
      let link = res.firstElementChild;
      expect(res.tagName).toEqual('DIV');
      expect(res.classList).toHaveProperty([0], 'ur-page-link-box');
      expect(link.tagName).toEqual('P');
      expect(link.innerText).toEqual(pageLink.text);
      expect(link.classList).toHaveProperty([0], 'ur-page-link');
      expect(link.id).toEqual('ur-pageLink-1');
      expect(link.style.color).toEqual('rgb(0, 123, 255)');
      expect(link.dataset.url).toEqual('1');
      expect(link.dataset.name).toEqual('pageLink');
      expect(link.dataset.active).toEqual('true');
      expect(getColourSpy).toHaveBeenCalledTimes(1);
      expect(getColourSpy).toHaveBeenCalledWith();
    });
  });

  describe('getColour()', () => {
    it('returns the colour of the link', () => {
      let newLink = new PageLink('2', false);
      expect(pageLink.getColour()).toEqual('#007bff');
      expect(newLink.getColour()).toEqual('#757575');
    });
  });
});
