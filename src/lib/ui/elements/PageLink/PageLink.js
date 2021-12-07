import './style.scss';

class PageLink {
  constructor(text, active) {
    this.text = text;
    this.active = active;
  }

  create() {
    let pageLinkBox = document.createElement('div');
    pageLinkBox.classList.add('ur-page-link-box');
    let pageLink = document.createElement('p');
    pageLink.innerText = `${this.text}`;
    pageLink.classList.add('ur-page-link');
    pageLink.id = `ur-pageLink-${this.text}`;
    pageLink.style.color = this.getColour();
    pageLink.dataset.url = this.text;
    pageLink.dataset.name = 'pageLink';
    pageLink.dataset.active = `${this.active}`;
    pageLinkBox.appendChild(pageLink);
    return pageLinkBox;
  }

  getColour() {
    return this.active ? '#007bff' : '#757575';
  }
}

export default PageLink;
