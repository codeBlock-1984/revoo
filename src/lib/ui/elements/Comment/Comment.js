import './style.scss';

class Comment {
  constructor(feature) {
    this.value = null;
    this.feature = feature;
  }

  create() {
    let comment = document.createElement('form');
    comment.classList.add('ur-form');
    let textBox = document.createElement('textarea');
    textBox.id = `ur-textBox-${this.feature}`;
    textBox.classList.add('ur-text-box');
    textBox.rows = 4;
    textBox.cols = 50;
    textBox.addEventListener('input', this.handleCommentInput.bind(this));
    comment.appendChild(textBox);
    return comment;
  }
  
  handleCommentInput(event) {
    this.value = event.target.value;
    localStorage.setItem('comment', this.value);
  }

  static resetComment(feature) {
    let commentBox = document.getElementById(`ur-textBox-${feature}`);
    if (commentBox) {
      commentBox.value = '';
    }
  }
}

export default Comment;
