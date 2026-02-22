const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const UpdateType = {
  MAJOR: 'major',
};

const UserAction = {
  ADD_POINT: 'ADD_POINT',
  UPDATE_POINT: 'UPDATE_POINT',
  DELETE_POINT: 'DELETE_POINT',
};


const HOUR_IN_MINUTES = 60;
const DAY_IN_MINUTES = 1440;

export { Mode, SortType, FilterType, UpdateType, UserAction, HOUR_IN_MINUTES, DAY_IN_MINUTES};
