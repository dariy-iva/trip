import {trips, departureSelector, descriptionSelector, overflowButtonText} from './scripts/constants/constants.js';

const tripsSection = document.querySelector('.trips');

// отрисовка элементов страницы (элементы списков, карточек)
function setLiElements(container, itemList, liClass) {
  itemList.forEach(item => {
    const liElement = document
      .querySelector('.trip__li-template')
      .content
      .firstElementChild
      .cloneNode(true);
    liElement.classList.add(liClass);
    liElement.textContent = item;
    container.append(liElement);
  })
}

function setDepartures(tripElement, departureList) {
  const descriptionsBlock = tripElement.querySelector('.trip__descriptions');

  const descriptionWithDepartures = document
    .querySelector('.trip__departures-template')
    .content
    .firstElementChild
    .cloneNode(true);

  const shotDepartureList = departureList.length > 4 ? departureList.slice(0, 3).concat(overflowButtonText) : departureList;
  const departuresContainer = descriptionWithDepartures.querySelector('.trip__departures');
  setLiElements(departuresContainer, shotDepartureList, departureSelector);

  departureList.length > 4 && departuresContainer.lastElementChild.addEventListener('click', () => {
    departuresContainer.lastElementChild.remove()
    setLiElements(departuresContainer, departureList.slice(3), departureSelector);
  });

  descriptionsBlock.append(descriptionWithDepartures);
}

function setDescriptions(tripElement, descriptionList, departureList) {
  const descriptionsBlock = tripElement.querySelector('.trip__descriptions');
  setLiElements(descriptionsBlock, descriptionList, descriptionSelector);
  setDepartures(tripElement, departureList);
}

function renderTripList() {
  trips.forEach(item => {
    const trip = document
      .querySelector('.trip-template')
      .content
      .firstElementChild
      .cloneNode(true);
    trip.querySelector('.trip__image').src = item.image;
    item.label ? trip.querySelector('.trip__label').textContent = item.label : trip.querySelector('.trip__label').remove();
    trip.querySelector('.trip__time').textContent = item.time;
    item.special && trip.querySelector('.trip__label').classList.add(`trip__label_content_${item.special}`);
    item.sale ? trip.querySelector('.trip__sale').textContent = 'Акция - ' : trip.querySelector('.trip__sale').remove();
    trip.querySelector('#caption').textContent = item.title;
    trip.querySelector('#price').textContent = item.price;
    item.priceCash ? trip.querySelector('#cash-price').textContent = item.priceCash : trip.querySelector('.trip__cash-price').remove();
    setDescriptions(trip, item.options, item.departures);

    tripsSection.append(trip);
  })
}

renderTripList();
