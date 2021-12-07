import './style.scss';

class Ellipsis {
  constructor(type) {
    this.type = type;
  }

  create() {
    let ellipsisBox = document.createElement('div');
    ellipsisBox.classList.add('ur-ellipsis-box');
    let ellipsis = document.createElement('p');
    ellipsis.classList.add('ur-ellipsis', `ur-ellipsis-${this.type}`);
    ellipsis.dataset.name = 'ellipsis';
    ellipsis.dataset.type = this.type;
    ellipsis.innerText = '...';
    ellipsisBox.appendChild(ellipsis);
    return ellipsisBox;
  }
}

export default Ellipsis;
