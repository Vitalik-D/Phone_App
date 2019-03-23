'use strict';

import Component from './../../component.js';

export default class PhoneCatalog extends Component {
  constructor({ element }) {
    super({ element });
    this._phones = [];

    this._render();
    this._initEventListeners();
  }

  show(phones = []) {
    this._phones = phones;
    this._render();

    super.show();
  }

  _initEventListeners() {
    this.on('click', '[data-show-details]', event => {
      let target = event.target;
      let phoneElement = target.closest('[data-element="phone"]');

      this.emit('phone-selected', phoneElement.dataset.elementId);
    });

    this.on('click', '[data-add-to-bucket]', event => {
      let target = event.target;
      let phoneElement = target.closest('[data-element="phone"]');

      this.emit(
        'add-button-clicked',
        phoneElement.dataset.elementId,
        phoneElement.dataset.elementName
      );
    });
  }

  _render() {
    this._element.innerHTML = `
        ${
          this._phones.length > 0
            ? `
            <ul class="phones">
                ${this._phones
                  .map(phone => {
                    return `
                     <li class="thumbnail"
                        data-element="phone"
                        data-element-id="${phone.id}"
                        data-element-name="${phone.name}"
                        >
                         
                            <a href="#!/phones/${phone.id}"
                               data-show-details class="thumb">
                                  <img alt="${phone.id}"
                                   src="${phone.imageUrl}">
                            </a>
                
                            <div class="phones__btn-buy-wrapper">
                              <a data-add-to-bucket
                               class="btn btn-success">
                                Add
                              </a>
                            </div>
                
                            <a data-show-details
                             href="#!/phones/motorola-xoom-with-wi-fi"
                             >
                                ${phone.name}
                             </a>
                            <p>
                                ${phone.snippet}
                            </p> 
                      </li>
                    `;
                  })
                  .join('')}
             </ul>`
            : '<p class="element-empty">Such item is not exist</p>'
        }`;
  }
}
