import Utils from '../Utils';

describe('Utils (class)', () => {
  describe('parseId()', () => {
    it('returns id data', () => {
      const res = Utils.parseId('test-4%feature');
      expect(res).toHaveProperty([0], 4);
      expect(res).toHaveProperty([1], 'feature');
    });
  });

  describe('getValue()', () => {
    it('returns a value', () => {
      expect(Utils.getValue('value', '')).toBe('value');
    });

    it('returns a default value', () => {
      expect(Utils.getValue(null, 'default value')).toBe('default value');
    });
  });

  describe('ternary()', () => {
    it('returns a value', () => {
      expect(Utils.ternary(true, 'value', 'default value')).toBe('value');
    });

    it('returns a default value', () => {
      expect(Utils.ternary(false, 'value', 'default value')).toBe('default value');
    });
  });
});
