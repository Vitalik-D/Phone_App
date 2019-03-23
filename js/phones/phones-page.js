'use strict';

import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import ShoppingCart from './components/shopping-cart.js';
import PhoneFilter from './components/phone-filter.js';
import PhoneOrder from './components/phone-ordering.js';
import PhoneAmount from './components/phone-amount.js';
import PageButtons from './components/page-buttons.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();
    this._initPhoneFilter();
    this._initPhoneOrdering();
    this._initShoppingCart();
    this._initPhoneAmount();
    this._initPageButtons();
    this._initCatalog();
    this._initViewer();
  }

  _showPhones() {
    let searchSettings = {
      filterValue: this._phoneFilter.getFilterValue(),
      orderValue: this._phoneOrdering.getOrderValue(),
      itemsAmount: this._phoneAmount.getAmountOfItems(),
      currentPage: this._pageButtons.getCurrentPage()
    };

    this._catalog._renderWhileLoading();

    PhoneService.getAll(searchSettings)
      .then(({ phones, pageCount }) => {
          this._viewer.hide();
          this._catalog.show(phones);

          this._pageButtons.updatePageCount(pageCount);
    });
  }

  _initPhoneAmount() {
    this._phoneAmount = new PhoneAmount({
      element: this._element.querySelector('[data-component="phone-amount"]')
    });

    this._phoneAmount.subscribe('page-size-selected', () => {
      this._pageButtons.resetCurrentPage();
    });
  }

  _initPageButtons() {
    this._pageButtons = new PageButtons({
      element: this._element.querySelector('[data-component="page-buttons"]')
    });

    this._pageButtons.subscribe('current-page-selected', () => {
      this._showPhones();
    });
  }

  _initPhoneOrdering() {
    this._phoneOrdering = new PhoneOrder({
      element: this._element.querySelector('[data-component="phone-order"]')
    });

    this._phoneOrdering.subscribe('order-changed', () => {
      this._showPhones();
    });
  }

  _initPhoneFilter() {
    this._phoneFilter = new PhoneFilter({
      element: this._element.querySelector('[data-component="phone-filter"]')
    });

    this._phoneFilter.subscribe('input-enter', () => {
      this._pageButtons.resetCurrentPage();
      this._showPhones();
    });
  }

  _initShoppingCart() {
    this._shoppingCart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]')
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: document.querySelector(
        '[data-component="phone-viewer"]')
    });

    this._viewer.subscribe(
      'back-button-clicked',
      () => {
      this._pageButtons.show();
      this._phoneAmount.show();
      this._showPhones();
    });

    this._viewer.subscribe(
      'add-button-clicked',
      (phoneId, phoneName) => {
      this._shoppingCart.addNewItemToList(phoneId, phoneName);
    });
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: document.querySelector('[data-component="phone-catalog"]')
    });

    this._catalog.subscribe(
      'phone-selected',
        phoneId => {

        PhoneService.getById(phoneId).then(
          phoneDetails => {
        this._phoneAmount.hide();
        this._pageButtons.hide();
        this._catalog.hide();
        this._viewer.show(phoneDetails);
      });
    });

    this._catalog.subscribe('add-button-clicked', (phoneId, phoneName) => {
      this._shoppingCart.addNewItemToList(phoneId, phoneName);
    });

    this._showPhones();
  }

  _render() {
    this._element.innerHTML = `
        <div class="row">
          <!--Sidebar-->
          <div class="col-md-2">
              <section>
                <div data-component="phone-filter"></div>
                <div data-component="phone-order"></div>
              </section>
            
              <section>
                <div data-component="shopping-cart"></div>
              </section>
          </div>
          <!--Main content-->
          <div class="col-md-10">
            <div data-component="phone-amount"></div>
            <div data-component="phone-catalog"></div>
            <div data-component="page-buttons"></div>
            <div data-component="phone-viewer" hidden></div>
          </div>
        </div>`;
  }
}
