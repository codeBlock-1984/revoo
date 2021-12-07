import Utils from '../../utils/Utils';
import './style.scss';

class Stars {
  constructor(feature) {
    this.value = 0;
    this.feature = feature;
  }

  create() {
    let stars = document.createElement('div');
    stars.classList.add('ur-stars');
    let count = 1;
    while (count < 6) {
      const star = this.createStar(count);
      stars.appendChild(star);
      count++;
    }
    return stars;
  }

  createStar(id) {
    let star = document.createElement('img');
    star.id = `ur-s-${id}%${this.feature}`;
    star.dataset.feature = this.feature;
    star.classList.add('ur-star');
    star.addEventListener('click', this.handleStarClick.bind(this));
    star.addEventListener('mouseover', this.handleStarMouseover.bind(this));
    star.addEventListener('mouseout', this.handleStarMouseout.bind(this));
    star.src = 'https://res.cloudinary.com/free-spirit/image/upload/v1591359264/icons8-star-96_2.png';
    star.alt = 'rating star icon';
    return star;
  }

  createStatic(value) {
    let stars = document.createElement('div');
    stars.classList.add('ur-static-stars');
    let count = 1;
    while (count < 6) {
      let flag = count > value;
      const star = this.createStaticStar(flag);
      stars.appendChild(star);
      count++;
    }
    return stars;
  }

  createStaticStar(flag) {
    let star = document.createElement('img');
    star.dataset.feature = this.feature;
    star.classList.add('ur-star');
    if (flag) {
      star.src = 'https://res.cloudinary.com/free-spirit/image/upload/v1591359264/icons8-star-96_2.png';
    } else {
      star.src = 'https://res.cloudinary.com/free-spirit/image/upload/v1591357954/icons8-star-96.png';
    }
    star.alt = 'rating star icon';
    return star;
  }

  handleStarClick(event) {
    const [id, feature] = Stars.getIdData(event);
    let starId = id;
    this.value = starId;
    Stars.resetStars(feature);
    Stars.colorStars(starId, feature);
    localStorage.setItem('rating', this.value);
    localStorage.setItem('starValue', this.value);
    localStorage.setItem('ratingType', 'star');
  }

  handleStarMouseover(event) {
    const [id, feature] = Stars.getIdData(event);
    let starId = id;
    Stars.colorStars(starId, feature);
  }

  handleStarMouseout(event) {
    const [id, feature] = Stars.getIdData(event);
    const value = localStorage.getItem('starValue');
    if (value) {
      Stars.resetStars(feature);
      Stars.colorStars(value, feature);
    } else {
      Stars.resetStars(feature);
    }
  }

  static resetStars(feature) {
    let count = 1;
    while (count < 6) {
      let star = document.getElementById(`ur-s-${count}%${feature}`);
      if (star) {
        star.src = 'https://res.cloudinary.com/free-spirit/image/upload/v1591359264/icons8-star-96_2.png';
      }
      count++;
    }
  }

  static getIdData({ target: { id } }) {
    return Utils.parseId(id);
  }

  static colorStars(starId, feature) {
    let count = starId;
    while (count > 0) {
      let star = document.getElementById(`ur-s-${count}%${feature}`);
      star.src = 'https://res.cloudinary.com/free-spirit/image/upload/v1591357954/icons8-star-96.png';
      count--;
    }
  }
}

export default Stars;
