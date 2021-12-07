import ResultBox from '../ResultBox/ResultBox';
import Submit from '../Submit/Submit';
import './style.scss';

class ReviewModal {
  constructor(buttonColor) {
    this.buttonColor = buttonColor;
  }

  create() {
    let submit = this.getSubmit();
    let resultBox = this.getResultBox();
    let modalBox = document.createElement('div');
    modalBox.classList.add('ur-modal-box');
    modalBox.id = 'ur-modalBox';
    let modal = document.createElement('div');
    modal.classList.add('ur-modal');
    let modalHeader = document.createElement('div');
    modalHeader.classList.add('ur-modal-header');
    let modalBody = document.createElement('div');
    modalBody.classList.add('ur-modal-body');
    modalBody.id = 'ur-modalBody';
    let modalFooter = document.createElement('div');
    modalFooter.classList.add('ur-modal-footer');
    let modalClose = document.createElement('div');
    modalClose.classList.add('ur-modal-close');
    let modalTitle = document.createElement('h3');
    modalTitle.classList.add('ur-modal-title');
    modalTitle.innerText = 'Tell us how you feel';
    let modalCloseIcon = document.createElement('img');
    modalCloseIcon.classList.add('ur-modal-close-icon');
    modalCloseIcon.id = 'ur-modalCloseIcon';
    modalCloseIcon.src = 'https://res.cloudinary.com/free-spirit/image/upload/v1592472330/cancel_48px.png';
    // add up modal elements
    modalClose.appendChild(modalCloseIcon);
    modalHeader.appendChild(modalClose);
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(resultBox);
    modalFooter.appendChild(submit);
    modal.appendChild(modalHeader);
    modal.appendChild(modalBody);
    modal.appendChild(modalFooter);
    modalBox.appendChild(modal);
    return modalBox;
  }

  getSubmit() {
    let submit = new Submit(this.buttonColor);
    let submitButton = submit.create();
    return submitButton;
  }

  getResultBox() {
    let resultBox = new ResultBox();
    return resultBox.create();
  }
}

export default ReviewModal;
