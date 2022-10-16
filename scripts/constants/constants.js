export const trips = [
  {
    title: 'Обзорная экскурсия по рекам и каналам  с остановками Hop on Hop Off 2019',
    image: './images/trips/kazanskiy.webp',
    label: 'новинка',
    sale: true,
    special: 'new',
    options: ['Билет на целый день', 'Неограниченное число катаний', '6 остановок у главных достопримечательностей'],
    time: '2 часа',
    price: '900',
    priceCash: '1200',
    departures: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
  },
  {
    title: 'Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2020',
    image: './images/trips/bridge.webp',
    label: 'новинка',
    sale: false,
    special: 'new',
    options: ['Билет на целый день', 'Неограниченное число катаний', '6 остановок у главных достопримечательностей'],
    time: '2 часа',
    price: '900',
    priceCash: '1200',
    departures: ['12:00', '13:00', '14:00']
  },
  {
    title: 'Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2020',
    image: './images/trips/spas.webp',
    label: 'круглый год',
    sale: false,
    special: 'year',
    options: ['Билет на целый день', 'Неограниченное число катаний', '6 остановок у главных достопримечательностей'],
    time: '2 часа',
    price: '900',
    priceCash: '1200',
    departures: ['12:00', '13:00', '14:00', '15:00']
  },
  {
    title: 'Обзорная экскурсия по рекам и каналам  с остановками Hop on Hop Off 2019',
    image: './images/trips/piano.webp',
    label: null,
    sale: false,
    special: null,
    options: ['Билет на целый день', 'Неограниченное число катаний', '6 остановок у главных достопримечательностей'],
    time: '2 часа',
    price: '900',
    priceCash: null,
    departures: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
  }
];

export const overflowButtonText = 'eщё...';
export const departureSelector = 'trip__departure';
export const descriptionSelector = 'trip__description';

export const departureToB = ['2021-08-21 18:00:00', '2021-08-21 18:30:00', '2021-08-21 18:45:00', '2021-08-21 19:00:00', '2021-08-21 19:15:00', '2021-08-21 21:00:00'];
export const departureToA = ['2021-08-21 18:30:00', '2021-08-21 18:45:00', '2021-08-21 19:00:00', '2021-08-21 19:15:00', '2021-08-21 19:35:00', '2021-08-21 21:50:00', '2021-08-21 21:55:00'];
export const priceTicketOneWay = 700;
export const priceTicketRound = 1200;
export const timeOneWay = 50;
export const timeBackElementShowSelector = 'order__time-back_show';
export const resultElementShowSelector = 'order__result_show';