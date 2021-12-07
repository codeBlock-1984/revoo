import PageLink from '../PageLink/PageLink';
import NavigationButton from '../NavigationButton/NavigationButton';
import Ellipsis from '../Ellipsis/Ellipsis';
import './style.scss';
import Utils from '../../utils/Utils';

class PaginationBar {
  constructor(params) {
    const { pageCount, pageSize, currentPage, firstInRange, lastInRange, isFirstPage, isLastPage } = PaginationBar.normalizeParams(params);
    this.pageCount = pageCount;
    this.pageSize = pageSize;
    this.currentPage = currentPage;
    this.isFirstPage = isFirstPage;
    this.isLastPage = isLastPage;
    this.firstInRange = firstInRange;
    this.lastInRange = lastInRange;
    this.leftEllipsis = firstInRange;
    this.rightEllipsis = lastInRange;
  }

  create() {
    let paginationWrapper = document.createElement('div');
    paginationWrapper.classList.add('ur-pagination-wrapper');
    paginationWrapper.id = 'ur-paginationWrapper';
    let paginationBar = document.createElement('div');
    paginationBar.classList.add('ur-pagination-bar');
    let previousButton = this.getNavigationButton('left', this.isFirstPage);
    let nextButton = this.getNavigationButton('right', this.isLastPage);
    paginationBar.appendChild(previousButton);
    let count = this.firstInRange;
    let firstPage = 1;
    let lastPage = this.pageCount;
    const link = this.getPageLink(firstPage, this.isActiveLink(firstPage));
    paginationBar.appendChild(link);
    if (this.leftEllipsis && (this.leftEllipsis > (firstPage + 1))) {
      const ellipsis = this.getEllipsis('left');
      paginationBar.appendChild(ellipsis);
    }
    while ((count < (this.lastInRange + 1)) && (count < this.pageCount)) {
      const link = this.getPageLink(count, this.isActiveLink(count));
      paginationBar.appendChild(link);
      count++;
    }
    if (firstPage !== lastPage) {
      if (this.rightEllipsis && this.rightEllipsis < (lastPage - 1)) {
        const ellipsis = this.getEllipsis('right');
        paginationBar.appendChild(ellipsis);
      }
      const link = this.getPageLink(lastPage, this.isActiveLink(lastPage));
      paginationBar.appendChild(link);
    }
    paginationBar.appendChild(nextButton);
    paginationWrapper.appendChild(paginationBar)
    return paginationWrapper;
  }

  getNavigationButton(type, isInactive) {
    const shade = isInactive ? 'one' : 'two';
    let navigationButton = new NavigationButton(type, shade, !isInactive);
    return navigationButton.create();
  }

  getPageLink(text, isActiveLink) {
    let pageLink = new PageLink(text, isActiveLink);
    return pageLink.create();
  }

  isActiveLink(page) {
    return page === this.currentPage;
  }

  getEllipsis(type) {
    let ellipsis = new Ellipsis(type);
    return ellipsis.create();
  }

  static normalizeParams({ pageCount, pageSize, currentPage, firstInRange, lastInRange }) {
    pageCount = Number(pageCount);
    pageSize = Number(pageSize);
    currentPage = Number(currentPage);
    firstInRange = Utils.getValue(firstInRange, 2);
    lastInRange = Utils.getValue(lastInRange, (pageCount - 1));
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === pageCount;
    if ((currentPage < firstInRange) && (currentPage > 1)) {
      const lag = firstInRange - currentPage;
      firstInRange = currentPage;
      lastInRange -= lag;
    }
    if ((currentPage > lastInRange) && (currentPage < pageCount)) {
      const lead = currentPage - lastInRange;
      lastInRange = currentPage;
      firstInRange += lead;
    }
    return { pageCount, pageSize, currentPage, firstInRange, lastInRange, isFirstPage, isLastPage };
  }
}

export default PaginationBar;
