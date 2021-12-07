import MakeRequest from '../MakeRequest';

const mockJson = jest.fn(() => 'data');
const getOptionsSpy = jest.spyOn(MakeRequest, 'getOptions');
global.fetch = jest.fn();
fetch.mockImplementationOnce(() => {
    return new Promise((resolve) => {
      resolve({ json: mockJson });
    });
  })
  .mockImplementationOnce(() => {
    return new Promise((resolve) => {
      resolve({});
    });
  });

const payload = { url: 'url', method: 'POST', headers: { 'x-header': 'header' }, body: 'body' };

describe('MakeRequest (class)', () => {
  describe('send()', () => {
    it('sends a request', async () => {
      const res = await MakeRequest.send(payload);
      expect(getOptionsSpy).toHaveBeenCalledTimes(1);
      expect(getOptionsSpy).toHaveBeenCalledWith('POST', { 'x-header': 'header' }, 'body');
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('url', { method: 'POST', headers: { 'x-header': 'header' }, body: 'body' });
      expect(res).toEqual({ data: 'data', error: null });
    });

    it('returns an error', async () => {
      const res = await MakeRequest.send(payload);
      expect(getOptionsSpy).toHaveBeenCalledTimes(1);
      expect(getOptionsSpy).toHaveBeenCalledWith('POST', { 'x-header': 'header' }, 'body');
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(res.data).toBe(null);
      expect(res.error.name).toBe('TypeError');
      expect(res.error.message).toBe('res.json is not a function');
    });
  });

  describe('getOptions()', () => {
    it('returns the request options', () => {
      const res = MakeRequest.getOptions('POST', { 'x-header': 'header' }, { data: 'data' });
      expect(res).toEqual({ method: 'POST', headers: { 'x-header': 'header' }, body: { data: 'data' } });
    });

    it('returns the request options sans body', () => {
      const res = MakeRequest.getOptions('POST', { 'x-header': 'header' });
      expect(res).toEqual({ method: 'POST', headers: { 'x-header': 'header' } });
    });
  });
});
