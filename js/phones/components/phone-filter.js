import Component from '../../component.js';

const INPUT_CHANGE_DELAY = 300;

export default class PhoneFilter extends Component {
  constructor({ element }) {
    super({ element });
    this._render();
    this._inputEventName = 'input-enter';
    this._inputValue = '';
    this._input = this._element.querySelector('[data-element="input"]');

    this._makeInputEvent = this._debounce(
      this._makeInputEvent.bind(this),
      INPUT_CHANGE_DELAY
    );

    this.on('input', '[data-element="input"]', this._makeInputEvent);
  }

  getFilterValue() {
    return this._inputValue;
  }

  _makeInputEvent() {
    this._inputValue = this._input.value;
    this.emit(this._inputEventName);
  }

  _debounce(f, delay) {
    let timerId;

    return () => {
      clearTimeout(timerId);
      timerId = setTimeout(f, delay);
    };
  }

  _render() {
    this._element.innerHTML = `
                  <p>
                    Search:
                    <input data-element="input">
                  </p>
        `;
  }
}
