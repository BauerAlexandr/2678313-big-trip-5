import { nanoid } from 'nanoid';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const destinations = [
  {
    id: 'dest-1',
    name: 'Amsterdam',
    description: 'Amsterdam is a city of canals and freedom. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    pictures: Array.from({length: 3}, () => ({
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`,
      description: 'Amsterdam architecture'
    }))
  },
  {
    id: 'dest-2',
    name: 'Chamonix',
    description: 'Chamonix-Mont-Blanc is a resort area near the junction of France, Switzerland and Italy.',
    pictures: Array.from({length: 2}, () => ({
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`,
      description: 'Mountain views'
    }))
  },
  {
    id: 'dest-3',
    name: 'Geneva',
    description: 'Geneva is a global city, a financial center, and a worldwide center for diplomacy.',
    pictures: []
  }
];

export const offers = [
  { id: 'off-1', type: 'flight', title: 'Add luggage', price: 50 },
  { id: 'off-2', type: 'flight', title: 'Switch to comfort', price: 80 },
  { id: 'off-3', type: 'taxi', title: 'Order Uber', price: 20 },
  { id: 'off-4', type: 'drive', title: 'Rent a car', price: 200 },
];

export const generateRoutePoint = () => {
  const year = getRandomInteger(2024, 2026);
  const month = getRandomInteger(1, 12);
  const day = getRandomInteger(10, 25);
  const durationHours = getRandomInteger(1, 168);
  const dateFrom = `${year}-${month}-${day}T${getRandomInteger(10, 12)}:00`;
  const dateTo = `${year}-${month}-${day + Math.floor(durationHours / 24)}T${getRandomInteger(13, 23)}:00`;

  return {
    id: nanoid(),
    type: getRandomArrayElement(TYPES),
    destinationId: getRandomArrayElement(destinations).id,
    dateFrom: dateFrom,
    dateTo: dateTo,
    basePrice: getRandomInteger(100, 2000),
    offers: [getRandomArrayElement(offers).id],
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
