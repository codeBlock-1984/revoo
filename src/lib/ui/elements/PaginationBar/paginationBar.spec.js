import PaginationBar from './PaginationBar';
import NavigationButton from '../NavigationButton/NavigationButton';
import PageLink from '../PageLink/PageLink';
import Ellipsis from '../Ellipsis/Ellipsis';
import Utils from '../../utils/Utils';

const getNavigationButtonSpy = jest.spyOn(PaginationBar.prototype, 'getNavigationButton');
const getPageLinkSpy = jest.spyOn(PaginationBar.prototype, 'getPageLink');
const isActiveLinkSpy = jest.spyOn(PaginationBar.prototype, 'isActiveLink');
const getEllipsisSpy = jest.spyOn(PaginationBar.prototype, 'getEllipsis');
const navCreateSpy = jest.spyOn(NavigationButton.prototype, 'create');
const pageLinkCreateSpy = jest.spyOn(PageLink.prototype, 'create');
const ellipsisCreateSpy = jest.spyOn(Ellipsis.prototype, 'create');
const getValueSpy = jest.spyOn(Utils, 'getValue');

let params = { pageCount: 8, pageSize: 10, currentPage: 1, firstInRange: 3, lastInRange: 5 };
let paginationBar = new PaginationBar(params);
describe('PaginationBar (class)', () => {
  it('can produce instances', () => {
    expect(paginationBar).toBeDefined();
    expect(paginationBar).toEqual({ pageCount: 8, pageSize: 10, currentPage: 1, firstInRange: 3, lastInRange: 5, isFirstPage: true, isLastPage: false, leftEllipsis: 3, rightEllipsis: 5 });
    expect(paginationBar.getNavigationButton).toBeDefined();
    expect(paginationBar.getPageLink).toBeDefined();
    expect(paginationBar.isActiveLink).toBeDefined();
    expect(paginationBar.getEllipsis).toBeDefined();
  });

  describe('create()', () => {
    it('creates a paginationBar element', () => {
      let res = paginationBar.create();
      let bar = res.firstElementChild;
      expect(res.tagName).toEqual('DIV');
      expect(res.classList).toHaveProperty([0], 'ur-pagination-wrapper');
      expect(res.id).toEqual('ur-paginationWrapper');
      expect(res.children.length).toEqual(1);
      expect(bar.tagName).toEqual('DIV');
      expect(bar.classList).toHaveProperty([0], 'ur-pagination-bar');
      expect(bar.children.length).toEqual(9);
      expect(bar.children[0].tagName).toEqual('DIV');
      expect(bar.children[0].classList).toHaveProperty([0], 'ur-navigation-button-box');
      expect(bar.children[1].tagName).toEqual('DIV');
      expect(bar.children[1].classList).toHaveProperty([0], 'ur-page-link-box');
      expect(bar.children[2].tagName).toEqual('DIV');
      expect(bar.children[2].classList).toHaveProperty([0], 'ur-ellipsis-box');
      expect(bar.children[3].tagName).toEqual('DIV');
      expect(bar.children[3].classList).toHaveProperty([0], 'ur-page-link-box');
      expect(bar.children[4].tagName).toEqual('DIV');
      expect(bar.children[4].classList).toHaveProperty([0], 'ur-page-link-box');
      expect(bar.children[5].tagName).toEqual('DIV');
      expect(bar.children[5].classList).toHaveProperty([0], 'ur-page-link-box');
      expect(bar.children[6].tagName).toEqual('DIV');
      expect(bar.children[6].classList).toHaveProperty([0], 'ur-ellipsis-box');
      expect(bar.children[7].tagName).toEqual('DIV');
      expect(bar.children[7].classList).toHaveProperty([0], 'ur-page-link-box');
      expect(bar.children[8].tagName).toEqual('DIV');
      expect(bar.children[8].classList).toHaveProperty([0], 'ur-navigation-button-box');
      expect(getNavigationButtonSpy).toHaveBeenCalledTimes(2);
      expect(getNavigationButtonSpy).toHaveBeenNthCalledWith(1, 'left', true);
      expect(getNavigationButtonSpy).toHaveBeenNthCalledWith(2, 'right', false);
      expect(getPageLinkSpy).toHaveBeenCalledTimes(5);
      expect(isActiveLinkSpy).toHaveBeenCalledTimes(5);
      expect(getPageLinkSpy).toHaveBeenNthCalledWith(1, 1, true);
      expect(getPageLinkSpy).toHaveBeenNthCalledWith(2, 3, false);
      expect(getPageLinkSpy).toHaveBeenNthCalledWith(3, 4, false);
      expect(getPageLinkSpy).toHaveBeenNthCalledWith(4, 5, false);
      expect(getPageLinkSpy).toHaveBeenNthCalledWith(5, 8, false);
      expect(isActiveLinkSpy).toHaveBeenNthCalledWith(1, 1);
      expect(isActiveLinkSpy).toHaveBeenNthCalledWith(2, 3);
      expect(isActiveLinkSpy).toHaveBeenNthCalledWith(3, 4);
      expect(isActiveLinkSpy).toHaveBeenNthCalledWith(4, 5);
      expect(isActiveLinkSpy).toHaveBeenNthCalledWith(5, 8);
      expect(getEllipsisSpy).toHaveBeenCalledTimes(2);
      expect(getEllipsisSpy).toHaveBeenNthCalledWith(1, 'left');
      expect(getEllipsisSpy).toHaveBeenNthCalledWith(2, 'right');
    });
  });

  describe('getNavigationButton()', () => {
    it('calls navigationButton create method with inactive true', () => {
      paginationBar.getNavigationButton('left', true);
      expect(navCreateSpy).toHaveBeenCalledTimes(1);
      expect(navCreateSpy).toHaveBeenCalledWith();
    });

    it('calls navigationButton create method with inactive false', () => {
      paginationBar.getNavigationButton('left', false);
      expect(navCreateSpy).toHaveBeenCalledTimes(1);
      expect(navCreateSpy).toHaveBeenCalledWith();
    });
  });

  describe('getPageLink()', () => {
    it('calls PageLink create method', () => {
      paginationBar.getPageLink('2', false);
      expect(pageLinkCreateSpy).toHaveBeenCalledTimes(1);
      expect(pageLinkCreateSpy).toHaveBeenCalledWith();
    });
  });

  describe('getEllipsis()', () => {
    it('calls Ellipsis create method', () => {
      paginationBar.getEllipsis('left');
      expect(ellipsisCreateSpy).toHaveBeenCalledTimes(1);
      expect(ellipsisCreateSpy).toHaveBeenCalledWith();
    });
  });

  describe('isActiveLink()', () => {
    it('returns a boolean flag to indicate if link is active', () => {
      expect(paginationBar.isActiveLink(1)).toEqual(true);
      expect(paginationBar.isActiveLink(5)).toEqual(false);
    });
  });

  describe('noramlizeParams()', () => {
    it('parses contructor arguments', () => {
      const params = { pageCount: 7, pageSize: 10, currentPage: 2, firstInRange: 3, lastInRange: 6 };
      PaginationBar.normalizeParams(params);
      expect(getValueSpy).toHaveBeenCalledTimes(2);
      expect(getValueSpy).toHaveBeenNthCalledWith(1, 3, 2);
      expect(getValueSpy).toHaveBeenNthCalledWith(2, 6, 6);
    });

    it('parses contructor arguments', () => {
      const params = { pageCount: 9, pageSize: 10, currentPage: 7, firstInRange: 3, lastInRange: 6 };
      const res = PaginationBar.normalizeParams(params);
      expect(res).toEqual({ pageCount: 9, pageSize: 10, currentPage: 7, firstInRange: 4, lastInRange: 7, isFirstPage: false, isLastPage: false });
    });
  });
});
