import Utils from '../../utils/Utils';
import './style.scss';

class Emojis {
  constructor(feature) {
    this.value = 0;
    this.feature = feature;
  }

  create() {
    let emojis = document.createElement('div');
    emojis.classList.add('ur-emojis');
    let count = 1;
    while (count < 6) {
      const emoji = this.createEmoji(count);
      emojis.appendChild(emoji);
      count++;
    }
    return emojis;
  }

  createEmoji(id) {
    let emojiBox = document.createElement('div');
    emojiBox.classList.add('ur-emoji-box');
    let hintBox = document.createElement('div');
    hintBox.classList.add('ur-emoji-hint-box');
    hintBox.id = `ur-emoji-hintBox-${id}%${this.feature}`;
    let hint = document.createElement('p');
    hint.classList.add('ur-emoji-hint');
    hint.innerText = Emojis.getEmojiName(id);
    let emoji = document.createElement('img');
    emoji.id = `ur-e-${id}%${this.feature}`;
    emoji.classList.add('ur-emoji');
    emoji.addEventListener('click', this.handleEmojiClick.bind(this));
    emoji.src = Emojis.getIconUrl('colour', id);
    emoji.alt = 'rating emoji icon';
    emojiBox.appendChild(emoji);
    hintBox.appendChild(hint);
    emojiBox.appendChild(hintBox);
    return emojiBox;
  }

  handleEmojiClick(event) {
    const [emojiId, feature] = Emojis.getIdData(event);
    this.value = emojiId;
    Emojis.resetEmojis('grey', feature);
    const chosenEmoji = document.getElementById(`ur-e-${emojiId}%${feature}`);
    chosenEmoji.src = Emojis.getIconUrl('colour', emojiId);
    let emojiHint = document.getElementById(`ur-emoji-hintBox-${emojiId}%${feature}`);
    emojiHint.style.display = 'flex';
    localStorage.setItem('rating', this.value);
    localStorage.setItem('ratingType', 'emoji');
  }

  static resetEmojis(color, feature) {
    let count = 1;
    while (count < 6) {
      let emoji = document.getElementById(`ur-e-${count}%${feature}`);
      let emojiHint = document.getElementById(`ur-emoji-hintBox-${count}%${feature}`);
      if (emoji) {
        emoji.src = Emojis.getIconUrl(color, count);
      }
      if (emojiHint) {
        emojiHint.style.display = 'none';
      }
      count++;
    }
  }

  static getIdData({ target: { id } }) {
    return Utils.parseId(id);
  }

  static getEmojiName(id) {
    const names = {
      1: 'horrible',
      2: 'disappointed',
      3: 'meh',
      4: 'good',
      5: 'awesome'
    };

    return names[id];
  }

  static getIconUrl(type, index) {
    const iconUrls = {
      'colour': {
        1: 'https://res.cloudinary.com/free-spirit/image/upload/v1591376352/1.png',
        2: 'https://res.cloudinary.com/free-spirit/image/upload/v1591376353/2.png',
        3: 'https://res.cloudinary.com/free-spirit/image/upload/v1591376353/3.png',
        4: 'https://res.cloudinary.com/free-spirit/image/upload/v1591376352/4.png',
        5: 'https://res.cloudinary.com/free-spirit/image/upload/v1591376352/5.png'
      },
      'grey': {
        1: 'https://res.cloudinary.com/free-spirit/image/upload/v1591378063/01.png',
        2: 'https://res.cloudinary.com/free-spirit/image/upload/v1591378063/02.png',
        3: 'https://res.cloudinary.com/free-spirit/image/upload/v1591378063/03.png',
        4: 'https://res.cloudinary.com/free-spirit/image/upload/v1591378063/04.png',
        5: 'https://res.cloudinary.com/free-spirit/image/upload/v1591378063/05.png'
      }
    };

    const url = iconUrls[type][index];
    return url;
  }
}

export default Emojis;
