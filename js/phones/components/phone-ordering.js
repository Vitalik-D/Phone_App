import Component from '../../component.js';

export default class PhoneOrder extends Component {
  constructor({ element }) {
    super({ element });
    this._render();
    this._orderValue = '';
    this._select = this._element.querySelector('[data-element="select"]');

    this.on('change', '[data-element="select"]', () => {
      this._orderValue = this._select.value;

      this.emit('order-changed');
    });
  }

  getOrderValue() {
    return this._orderValue;
  }

  _render() {
    this._element.innerHTML = `
                  <p>
                    Sort by:
                    <select data-element="select">
                      <option value="name">Alphabetical</option>
                      <option value="age" selected>Newest</option>
                    </select>
                  </p>
        `;
  }
}
