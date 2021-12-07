import Ellipsis from './Ellipsis';

let ellipsis = new Ellipsis('right');
describe('Ellipsis (class)', () => {
  it('can produce new instances', () => {
    expect(ellipsis).toBeInstanceOf(Ellipsis);
    expect(ellipsis).toBeDefined();
    expect(ellipsis).toEqual({ type: 'right' });
    expect(ellipsis.create).toBeDefined();
  });

  describe('create()', () => {
    it('creates a div element with children', () => {
      const res = ellipsis.create();
      expect(res.tagName).toEqual('DIV');
      expect(res.classList).toHaveProperty([0], 'ur-ellipsis-box');
      expect(res.firstElementChild.tagName).toEqual('P');
      expect(res.firstElementChild.classList).toHaveProperty([0], 'ur-ellipsis');
      expect(res.firstElementChild.classList).toHaveProperty([1], 'ur-ellipsis-right');
      expect(res.firstElementChild.dataset.name).toEqual('ellipsis');
      expect(res.firstElementChild.dataset.type).toEqual('right');
      expect(res.firstElementChild.innerText).toEqual('...');
    });
  });
});
