'use strict';

import Component from './../../component.js';

export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({ element });
    this._details = {};

    this._initEventListeners();
  }

  _initEventListeners() {
    this.on('click', '[data-button="back"]', () => {
      this.hide();
      this.emit('back-button-clicked');
    });

    this.on('click', '[data-button="add-to-basket"]', () => {
      this.emit('add-button-clicked', this._details.id, this._details.name);
    });

    this.on('click', '[data-selectable-img]', e => {
      this._changeMainViewerImage(e.target.src);
    });
  }

  show(phoneDetails) {
    if (phoneDetails) {
      this._details = phoneDetails;
      this._render();
    }

    super.show();
  }

  _changeMainViewerImage(src) {
    let mainImage = this._element.querySelector('.phone');

    mainImage.src = src;
  }

  _render() {
    this._element.innerHTML = `
         <div data-element="phone-viewer">
            <img class="phone"
             src="img/phones/${this._details.id}.0.jpg"
             >
             
            <button data-button="back">Back</button>
            <button data-button="add-to-basket">Add to basket</button>
        
            <h1>${this._details.name}</h1>
        
            <p>${this._details.description}</p>
            
            <ul class="phone-thumbs">
                ${this._details.images
                  .map(image => {
                    return `
                        <li>
                           <img data-selectable-img src="${image}">
                        </li>
                       `;
                  })
                  .join('')}    
            </ul>
        </div>
       `;
  }
}
