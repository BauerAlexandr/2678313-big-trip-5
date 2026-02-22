import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import RoutePointsModel from './model/route-points-model.js';
import FilterModel from './model/filter-model.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const listContainer = document.querySelector('.trip-events');
const newEventButton = document.querySelector('.trip-main__event-add-btn');
const pointsModel = new RoutePointsModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({
  filtersContainer,
  filterModel
});

const presenter = new MainPresenter({
  listContainer,
  pointsModel,
  filterModel,
  newEventButton
});

filterPresenter.init();
presenter.init();
