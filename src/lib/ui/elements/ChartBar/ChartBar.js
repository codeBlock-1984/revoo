import './style.scss';

class ChartBar {
  constructor(value, percentage, label) {
    this.value = value;
    this.percentage = percentage;
    this.label = label;
  }

  create() {
    let chartBarBox = document.createElement('div');
    chartBarBox.classList.add('ur-chart-bar-box');
    let chartBarLabelWrapper = document.createElement('div');
    chartBarLabelWrapper.classList.add('ur-chart-bar-label-wrapper');
    let chartBarLabel = document.createElement('p');
    chartBarLabel.innerText = this.label;
    let chartBarTextWrapper = document.createElement('div');
    chartBarTextWrapper.classList.add('ur-chart-bar-text-wrapper');
    let chartBarText = document.createElement('p');
    chartBarText.classList.add('ur-chart-bar-text');
    chartBarText.innerText = `${this.percentage}%`;
    chartBarLabel.classList.add('ur-chart-bar-label');
    let barWrapper = document.createElement('div');
    barWrapper.classList.add('ur-bar-wrapper');
    let bar = document.createElement('div');
    bar.classList.add('ur-bar');
    bar.style.width = `${this.percentage}%`;
    chartBarLabelWrapper.appendChild(chartBarLabel);
    chartBarTextWrapper.appendChild(chartBarText);
    barWrapper.appendChild(bar);
    chartBarBox.appendChild(chartBarLabelWrapper);
    chartBarBox.appendChild(barWrapper);
    chartBarBox.appendChild(chartBarTextWrapper);
    return chartBarBox;
  }
}

export default ChartBar;
