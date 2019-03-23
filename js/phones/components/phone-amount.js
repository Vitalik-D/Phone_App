import Component from '../../component.js';

export default class PhoneAmount extends Component {
  constructor({ element }) {
    super({ element });
    this._itemsAmount = 10;

    this.on('change', '[data-element="page-selector"]', event => {
      let select = event.target.closest('[data-element="page-selector"]');

      this._itemsAmount = +select.value;
      this.emit('page-size-selected');
    });

    this._render();
  }

  getAmountOfItems() {
    return this._itemsAmount;
  }

  _render() {
    this._element.innerHTML = `
            <p class="catalog-select-block">
                Show
                 <select data-element="page-selector">
                      <option value="5">5</option>
                      <option value="10" selected>10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="25">25</option>
                      <option value="30">30</option>
                 </select>
                entries
            </p>
    `;
  }
}
