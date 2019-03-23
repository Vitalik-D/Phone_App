import Component from '../../component.js';

export default class ShoppingCart extends Component {
  constructor({ element }) {
    super({ element });

    this._bucketItems = [];
    this._render();

    this.on('click', '.shopping-card-remove', e => {
      this._removeItem(e);
    });
  }

  _removeItem(e) {
    let currentListItem = e.target.closest('.shopping-card-item');

    let requirePosToRemove = this._bucketItems.findIndex(
      item => item.id === currentListItem.dataset.itemId
    );

    this._bucketItems.splice(requirePosToRemove, 1);
    this._render();
  }

  addNewItemToList(itemId, itemName) {
    let itemArrayPosition = this._bucketItems.findIndex(
      item => item.id === itemId
    );

    if (itemArrayPosition === -1) {
      this._bucketItems.push({
        id: itemId,
        name: itemName,
        count: 1
      });
    } else {
      this._bucketItems[itemArrayPosition].count++;
    }

    this._render();
  }

  _render() {
    this._element.innerHTML = `
              <h4>Shopping Cart</h4>
                ${
                  this._bucketItems.length > 0
                    ? `
                    <ul 
                    data-bucket-list
                    >
                        ${this._bucketItems
                          .map(listItem => {
                            return `
                                <li data-item-id="${listItem.id}"
                                 class="shopping-card-item">
                                    ${listItem.name} 
                                    <span class="shopping-card-count">
                                        ${listItem.count}
                                    </span>
                                    <span class="shopping-card-remove">
                                      X
                                    </span>
                                </li>
                            `;
                          })
                          .join('')}`
                    : '<p class="element-empty">Shopping Cart is empty</p>'
                }
                     </ul>`;
  }
}
