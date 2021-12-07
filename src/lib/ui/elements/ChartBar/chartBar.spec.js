import ChartBar from './ChartBar';

describe('ChartBar (class)', () => {
  let chartBar = new ChartBar(4, 40, '5 Star');
  it('can produce new instances', () => {
    expect(chartBar).toBeInstanceOf(ChartBar);
    expect(chartBar).toBeDefined();
    expect(chartBar).toEqual({ value: 4, percentage: 40, label: '5 Star' });
    expect(chartBar).toHaveProperty('value', 4);
    expect(chartBar).toHaveProperty('percentage', 40);
    expect(chartBar).toHaveProperty('label', '5 Star');
    expect(chartBar.create).toBeDefined();
  });

  describe('create()', () => {
    it('creates a div element with children', () => {
      const res = chartBar.create();
      expect(res.tagName).toEqual('DIV');
      expect(res.classList).toContain('ur-chart-bar-box');
      expect(res.childElementCount).toEqual(3);
      expect(res.firstElementChild.tagName).toEqual('DIV');
      expect(res.firstElementChild.classList).toHaveProperty([0], 'ur-chart-bar-label-wrapper');
      expect(res.firstElementChild.firstElementChild.tagName).toEqual('P');
      expect(res.firstElementChild.firstElementChild.innerText).toEqual(chartBar.label);
      expect(res.firstElementChild.firstElementChild.classList).toHaveProperty([0], 'ur-chart-bar-label');
      expect(res.children[2].tagName).toEqual('DIV');
      expect(res.children[2].classList).toHaveProperty([0], 'ur-chart-bar-text-wrapper');
      expect(res.children[2].firstElementChild.tagName).toEqual('P');
      expect(res.children[2].firstElementChild.innerText).toEqual(`${chartBar.percentage}%`);
      expect(res.children[2].firstElementChild.classList).toHaveProperty([0], 'ur-chart-bar-text');
      expect(res.children[1].tagName).toEqual('DIV');
      expect(res.children[1].classList).toHaveProperty([0], 'ur-bar-wrapper');
      expect(res.children[1].firstElementChild.tagName).toEqual('DIV');
      expect(res.children[1].firstElementChild.classList).toHaveProperty([0], 'ur-bar');
      expect(res.children[1].firstElementChild.style.width).toEqual(`${chartBar.percentage}%`);
    });
  });  
});
