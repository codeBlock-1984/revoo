import ReviewModal from './ReviewModal';
import ResultBox from '../ResultBox/ResultBox';
import Submit from '../Submit/Submit';

const getSubmitSpy = jest.spyOn(ReviewModal.prototype, 'getSubmit');
const getResultBoxSpy = jest.spyOn(ReviewModal.prototype, 'getResultBox');
const resultBoxCreateSpy = jest.spyOn(ResultBox.prototype, 'create');
const submitCreateSpy = jest.spyOn(Submit.prototype, 'create');

let reviewModal = new ReviewModal('grey');
describe('ReviewModal (class)', () => {
  it('can produce new instances', () => {
    expect(reviewModal).toBeDefined();
    expect(reviewModal).toEqual({ buttonColor: 'grey' });
    expect(reviewModal.create).toBeDefined();
    expect(reviewModal.getSubmit).toBeDefined();
    expect(reviewModal.getResultBox).toBeDefined();
  });

  describe('create()', () => {
    it('returns a modal element', () => {
      const res = reviewModal.create();
      const modal = res.firstElementChild;
      expect(res.tagName).toEqual('DIV');
      expect(res.classList).toHaveProperty([0], 'ur-modal-box');
      expect(res.id).toEqual('ur-modalBox');
      expect(res.children.length).toEqual(1);
      expect(modal.tagName).toEqual('DIV');
      expect(modal.children.length).toEqual(3);
      expect(modal.classList).toHaveProperty([0], 'ur-modal');
      expect(modal.children).toHaveProperty([0, 'tagName'], 'DIV');
      expect(modal.children).toHaveProperty([0, 'classList', 0], 'ur-modal-header');
      expect(modal.children).toHaveProperty([1, 'tagName'], 'DIV');
      expect(modal.children).toHaveProperty([1, 'classList', 0], 'ur-modal-body');
      expect(modal.children).toHaveProperty([1, 'id'], 'ur-modalBody');
      expect(modal.children).toHaveProperty([1, 'childNodes', 'length'], 0);
      expect(modal.children).toHaveProperty([2, 'tagName'], 'DIV');
      expect(modal.children).toHaveProperty([2, 'classList', 0], 'ur-modal-footer');
      expect(modal.children).toHaveProperty([0, 'childNodes', 'length'], 3);
      expect(modal.children).toHaveProperty([0, 'children', 0, 'tagName'], 'DIV');
      expect(modal.children).toHaveProperty([0, 'children', 0, 'classList', 0], 'ur-modal-close');
      expect(modal.children).toHaveProperty([0, 'children', 0, 'children', 'length'], 1);
      expect(modal.children).toHaveProperty([0, 'children', 0, 'children', 0, 'tagName'], 'IMG');
      expect(modal.children).toHaveProperty([0, 'children', 0, 'children', 0, 'classList', 0], 'ur-modal-close-icon');
      expect(modal.children).toHaveProperty([0, 'children', 0, 'children', 0, 'id'], 'ur-modalCloseIcon');
      expect(modal.children).toHaveProperty([0, 'children', 0, 'children', 0, 'src'], 'https://res.cloudinary.com/free-spirit/image/upload/v1592472330/cancel_48px.png');
      expect(modal.children).toHaveProperty([0, 'children', 1, 'tagName'], 'H3');
      expect(modal.children).toHaveProperty([0, 'children', 1, 'classList', 0], 'ur-modal-title');
      expect(modal.children).toHaveProperty([0, 'children', 1, 'innerText'], 'Tell us how you feel');
      expect(modal.children).toHaveProperty([0, 'children', 2, 'tagName'], 'DIV');
      expect(modal.children).toHaveProperty([0, 'children', 2, 'classList', 0], 'ur-result-box');
      expect(modal.children).toHaveProperty([2, 'children', 'length'], 1);
      expect(modal.children).toHaveProperty([2, 'children', 0, 'tagName'], 'BUTTON');
      expect(modal.children).toHaveProperty([2, 'children', 0, 'classList', 0], 'ur-submit');
      expect(getSubmitSpy).toHaveBeenCalledTimes(1);
      expect(getSubmitSpy).toHaveBeenCalledWith();
      expect(getResultBoxSpy).toHaveBeenCalledTimes(1);
      expect(getResultBoxSpy).toHaveBeenCalledWith();
    });
  });

  describe('getSubmit()', () => {
    it('calls SubmitButton create method', () => {
      reviewModal.getSubmit();
      expect(submitCreateSpy).toHaveBeenCalledTimes(1);
      expect(submitCreateSpy).toHaveBeenCalledWith();
    });
  });

  describe('getResultBox()', () => {
    it('calls ResultBox create method', () => {
      reviewModal.getResultBox();
      expect(resultBoxCreateSpy).toHaveBeenCalledTimes(1);
      expect(resultBoxCreateSpy).toHaveBeenCalledWith();
    });
  });
});
