import Comment from './Comment';

describe('Comment (class)', () => {
  let comment = new Comment('Test-feature');
  const res = comment.create();
  it('can produce new instances', () => {
    expect(comment).toBeInstanceOf(Comment);
    expect(comment).toBeDefined();
    expect(comment).toEqual({ value: null, feature: 'Test-feature' });
    expect(comment).toHaveProperty('value', null);
    expect(comment).toHaveProperty('feature', 'Test-feature');
    expect(comment.create).toBeDefined();
    expect(comment.handleCommentInput).toBeDefined();
  });

  describe('create()', () => {
    it('creates a form element with textbox', () => {
      expect(res.tagName).toEqual('FORM');
      expect(res.classList).toContain('ur-form');
      expect(res.childElementCount).toEqual(1);
      expect(res.firstElementChild.tagName).toEqual('TEXTAREA');
      expect(res.firstElementChild.classList).toHaveProperty([0], 'ur-text-box');
      expect(res.firstElementChild.id).toEqual(`ur-textBox-${comment.feature}`);
      expect(res.firstElementChild.rows).toEqual(4);
      expect(res.firstElementChild.cols).toEqual(50);
    });
  });

  describe('handleCommentInput()', () => {
    it('sets the comment key in localStorage', () => {
      const event = { target: { value: 'test comment' } }
      comment.handleCommentInput(event);
      expect(localStorage.getItem('comment')).toEqual('test comment');
    });
  });

  describe('resetComment()', () => {
    it('sets the specified comment value to empty string', () => {
      Comment.resetComment('Test-feature');
      expect(res.firstChild.value).toEqual('');
    });
  });  
});
