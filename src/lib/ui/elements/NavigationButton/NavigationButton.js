import './style.scss';

class NavigationButton {
  constructor(type, shade, active) {
    this.type = type;
    this.shade = shade;
    this.active = active;
  }

  create() {
    let navigationButtonBox = document.createElement('div');
    navigationButtonBox.classList.add('ur-navigation-button-box');
    let navigationButton = document.createElement('img');
    navigationButton.dataset.active = `${this.active}`;
    navigationButton.dataset.name = 'navigationButton';
    navigationButton.dataset.type = this.type;
    navigationButton.addEventListener('hover', this.handleHover.bind(this));
    navigationButton.classList.add('ur-navigation-button');
    navigationButton.src = this.getUrl(this.shade);
    navigationButtonBox.appendChild(navigationButton);
    return navigationButtonBox;
  }

  getUrl(shade) {
    const urls = {
      right: {
        one: 'https://res.cloudinary.com/free-spirit/image/upload/v1591795025/right-one.png',
        two: 'https://res.cloudinary.com/free-spirit/image/upload/v1591795025/right-two.png',
        three: 'https://res.cloudinary.com/free-spirit/image/upload/v1591795025/right-three.png'
      },
      left: {
        one: 'https://res.cloudinary.com/free-spirit/image/upload/v1591795025/left-one.png',
        two: 'https://res.cloudinary.com/free-spirit/image/upload/v1591795304/left-two.png',
        three: 'https://res.cloudinary.com/free-spirit/image/upload/v1591795304/left-three.png'
      }
    };
    const url = urls[this.type][shade];
    return url;
  }

  handleHover(event) {
    if (this.active) {
      event.target.src = this.getUrl('three');
    }
  }
}

export default NavigationButton;
