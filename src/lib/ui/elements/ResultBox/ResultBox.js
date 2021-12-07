import './style.scss';

class ResultBox {
  constructor() {

  }

  create() {
    let resultBox = document.createElement('div');
    resultBox.classList.add('ur-result-box');
    let resultText = document.createElement('p');
    resultText.id = 'ur-resultText';
    resultText.innerText = ' ';
    resultText.classList.add('ur-result-text');
    resultBox.appendChild(resultText);
    return resultBox;
  }
}

export default ResultBox;
