import CompositeVote from './CompositeVote';
import Vote from '../Vote/Vote';

const createSpy = jest.spyOn(Vote.prototype, 'create');
const handleClickSpy = jest.spyOn(Vote.prototype, 'handleClick');
handleClickSpy.mockImplementation(() => {});
const resetValueSpy = jest.spyOn(Vote.prototype, 'resetValue');
const getSiblingAliasSpy = jest.spyOn(CompositeVote.prototype, 'getSiblingAlias');
const getTypeSpy = jest.spyOn(CompositeVote.prototype, 'getType');
const getSiblingTypeSpy = jest.spyOn(CompositeVote.prototype, 'getSiblingType');

let compositeVote, res;
describe('CompositeVote (class)', () => {
  beforeEach(() => {
    compositeVote = new CompositeVote('test-id', 14, 3);
    res = compositeVote.create();
  });

  it('can produce new instances', () => {
    compositeVote = new CompositeVote('test-id', 14, 3);
    expect(compositeVote).toBeInstanceOf(CompositeVote);
    expect(compositeVote).toBeDefined();
    expect(compositeVote).toEqual({ reviewId: 'test-id', upVotes: 14, downVotes: 3, up: null, down: null });
    expect(compositeVote.create).toBeDefined();
    expect(compositeVote.getType).toBeDefined();
    expect(compositeVote.getSiblingType).toBeDefined();
    expect(compositeVote.getSiblingAlias).toBeDefined();
  });

  describe('create()', () => {
    it('creates a div element with children', () => {
      expect(res.tagName).toEqual('DIV');
      expect(res.classList).toHaveProperty([0], 'ur-composite-vote');
      expect(createSpy).toHaveBeenCalledTimes(2);
      expect(compositeVote.up).toBeDefined();
      expect(compositeVote.up).toBeInstanceOf(Vote);
      expect(compositeVote.down).toBeDefined();
      expect(compositeVote.down).toBeInstanceOf(Vote);
      expect(res.children[0].tagName).toEqual('DIV');
      expect(res.children[1].tagName).toEqual('DIV');
    });
  });

  describe('handleClick()', () => {
    it('handles the click event on object instances', () => {
      const event = { target: { id: 'u-test-id' } };
      document.body.appendChild(res);
      compositeVote.handleClick(event);
      expect(getSiblingAliasSpy).toHaveBeenCalledTimes(1);
      expect(getTypeSpy).toHaveBeenCalledTimes(1);
      expect(getSiblingTypeSpy).toHaveBeenCalledTimes(1);
      expect(resetValueSpy).toHaveBeenCalledTimes(1);
      expect(handleClickSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getType()', () => {
    it('returns a type', () => {
      expect(compositeVote.getType('u')).toEqual('up');
    });
  });

  describe('getSiblingType()', () => {
    it('returns the sibling type', () => {
      expect(compositeVote.getSiblingType('u')).toEqual('down');
    });
  });

  describe('getSiblingAlias()', () => {
    it('returns the sibling alias', () => {
      expect(compositeVote.getSiblingAlias('u')).toEqual('d');
    });
  });
});
