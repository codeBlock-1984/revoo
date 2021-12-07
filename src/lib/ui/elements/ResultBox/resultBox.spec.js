import ResultBox from './ResultBox';

let resultBox = new ResultBox();
describe('ResultBox (class)', () => {
  it('can produce new instances', () => {
    expect(resultBox).toBeDefined();
    expect(resultBox).toEqual({});
    expect(resultBox.create).toBeDefined();
  });

  describe('create()', () => {
    it('returns a resultBox element', () => {
      const res = resultBox.create();
      const txt = res.firstElementChild;
      expect(res.tagName).toEqual('DIV');
      expect(res.children.length).toEqual(1);
      expect(res.classList).toHaveProperty([0], 'ur-result-box');
      expect(txt.tagName).toEqual('P');
      expect(txt.classList).toHaveProperty([0], 'ur-result-text');
      expect(txt.id).toEqual('ur-resultText');
      expect(txt.innerText).toEqual(' ');
    });
  });
});
