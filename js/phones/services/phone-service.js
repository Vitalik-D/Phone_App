const xhr = new XMLHttpRequest();

const compareByName = (a, b) => {
  if (a.name > b.name) {
    return 1;
  } else {
    return -1;
  }
};

const compareByDate = (a, b) => {
  if (a.age > b.age) {
    return 1;
  } else {
    return -1;
  }
};

const _getDataFromServer = id => {
  return fetch(`https://mate-academy.github.io/phone-catalogue-static/api/phones.json`)

    .then((response) => {
      return response.json();
    });
};

const PhoneService = {
  getAll({
    filterValue = '',
    orderValue = '',
    itemsAmount = 10,
    currentPage = 0
  } = {}) {
    const phonesListId = 'phones';

    return _getDataFromServer(phonesListId).then(dataFromServer => {
      let filteredPhones = this._filterPhones(filterValue, dataFromServer);
      let orderedPhones = this._sort(orderValue, filteredPhones);
      let pageCount = Math.ceil(filteredPhones.length / itemsAmount);

      let phones = orderedPhones.filter((item, index) => {
        return (
          index >= currentPage * itemsAmount &&
          index < currentPage * itemsAmount + itemsAmount
        );
      });

      return { phones, pageCount };
    })
      .catch((error) => {
        console.error(error);

        return {
          phones: [],
          pageCount: 0
        };
      });
  },

  getById(phoneId) {
    return _getDataFromServer(phoneId);
  },

  _sort(orderValue, phones) {
    return phones.sort(PhoneService.sortTypes[orderValue]);
  },

  _filterPhones(filterValue, phones) {
    filterValue = filterValue.toLowerCase();

    return phones.filter(phone => {
      let phoneName = phone.name.toLowerCase().trim();

      if (phoneName.indexOf(filterValue) === 0) {
        return phone.name;
      }
    });
  },

  sortTypes: {
    name: compareByName,
    age: compareByDate
  }
};

export default PhoneService;
