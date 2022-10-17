import {
  departureToB,
  departureToA,
  priceTicketOneWay,
  priceTicketRound,
  timeOneWay,
  timeBackElementShowSelector,
  resultElementShowSelector,
} from '../constants/constants.js';

const form = document.forms.calculator;
const routeSelect = document.querySelector('#route');
const timeSelect = document.querySelector('#time');
const timeBackSelect = document.querySelector('#time-back');
const numInput = document.querySelector('#num');
const timeBackElement = document.querySelector('#label-of-time-back');

const resultElement = document.querySelector('#result');
const countElement = document.querySelector('#count');
const tariffElement = document.querySelector('#tariff');
const travelTimeElement = document.querySelector('#travel-time');
const sumElement = document.querySelector('#sum');
const departureElement = document.querySelector('#departure');
const arrivalElement = document.querySelector('#arrival');

const localeDepartureToB = getLocalTimeDepartures(departureToB);
const localeDepartureToA = getLocalTimeDepartures(departureToA);

// извлечение времени из исходных данных + его перевод в локальный часовой пояс
function getLocalTimeDepartures(dateList) {
  return dateList.map(item => {
    const nowDate = new Date(item + ' GMT+3');
    const nowHours = nowDate.getHours() > 9 ? nowDate.getHours() : '0' + nowDate.getHours();
    const nowMinutes = nowDate.getMinutes() > 9 ? nowDate.getMinutes() : '0' + nowDate.getMinutes();
    return nowHours + ':' + nowMinutes;
  });
}

// отрисовка вариантов выбора из списка на странице
function renderOptionList(valueList, select) {
  select.innerHTML = '';
  valueList.forEach(item => {
    const option = document
      .querySelector(`.time-option__template`)
      .content
      .firstElementChild
      .cloneNode(true);
    option.value = item;
    option.textContent = item;
    select.append(option);
  })
}

// счетчик времени прибытия
function counterArrivalTime(departure, time) {
  const hoursDeparture = +(departure.split(':')[0])
  const minutesDeparture = +(departure.split(':')[1])

  const hoursArrival = minutesDeparture + time < 60
    ? departure.split(':')[0]
    : Math.floor((minutesDeparture + time) / 60) + hoursDeparture;
  const minutesArrival = minutesDeparture + time < 60
    ? minutesDeparture + time
    : (minutesDeparture + time) % 60;

  return (hoursArrival > 9 ? hoursArrival : '0' + hoursArrival) + ':' + (minutesArrival > 9 ? minutesArrival : '0' + minutesArrival);
}

// отрисовка результатов подсчета на странице
function setResults(config) {
  const {tariff, departure, departureBack, number} = config;
  const lastNumber = +number.toString().slice(-1)
  const numberText = 'билет' + (lastNumber === 1 && (number < 2 || number > 20)
    ? ''
    : (lastNumber > 1 && lastNumber < 5) && (number < 5 || number > 20)
      ? 'а'
      : 'ов');
  countElement.textContent = number + ' ' + numberText;
  tariffElement.textContent = routeSelect[routeSelect.selectedIndex].textContent;
  sumElement.textContent = (tariff === 'round' ? priceTicketRound : priceTicketOneWay) * number;
  travelTimeElement.textContent = tariff === 'round' ? timeOneWay * 2 : timeOneWay;
  departureElement.textContent = departure;
  arrivalElement.textContent = counterArrivalTime(tariff === 'round' ? departureBack : departure, timeOneWay);
}


// обработчики событий формы
function handleRouteChange(e) {
  const value = e.target.value;

  switch (value) {
    case 'round':
      renderOptionList(localeDepartureToB, timeSelect);
      renderOptionList(localeDepartureToA.filter(item => item > counterArrivalTime(timeSelect.value, timeOneWay)), timeBackSelect);
      timeBackElement.required = true;
      timeBackElement.classList.add(timeBackElementShowSelector);
      break;
    case 'toA':
      timeBackElement.classList.remove(timeBackElementShowSelector);
      renderOptionList(localeDepartureToA, timeSelect);
      break;
    case 'toB':
      timeBackElement.classList.remove(timeBackElementShowSelector);
      renderOptionList(localeDepartureToB, timeSelect);
      break;
  }
}

function handleTimeChange(e) {
  if (routeSelect.value === 'round') {
    const newDepartureToA = localeDepartureToA.filter(item => item > counterArrivalTime(e.target.value, timeOneWay))
    renderOptionList(newDepartureToA, timeBackSelect);
  }
}

function handleSubmitForm(e) {
  e.preventDefault();
  resultElement.classList.add(resultElementShowSelector);

  setResults({
    tariff: routeSelect.value,
    number: numInput.value,
    departure: timeSelect.value,
    departureBack: timeBackSelect.value
  });
}

routeSelect.addEventListener('change', handleRouteChange);
timeSelect.addEventListener('change', handleTimeChange);
form.addEventListener('submit', handleSubmitForm);

renderOptionList(localeDepartureToB, timeSelect);

document.querySelector('.body').classList.remove('body_hidden');