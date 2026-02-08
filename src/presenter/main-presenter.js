import FiltersView from '../view/filters.js';
import SortView from '../view/sort.js';
import CreateFormView from '../view/form-creation.js';
import TripEventsListView from '../view/trip-events-list';
import { render } from '../framework/render.js';
import RoutePointPresenter from './route-point-presenter.js';
import { SortType } from '../const.js';

export default class MainPresenter {
  #filtersContainer;
  #listContainer;
  #pointsModel;

  #tripEventsListView = new TripEventsListView();
  #sortComponent = null;

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #boardPoints = [];

  constructor({ filtersContainer, listContainer, pointsModel }) {
    this.#filtersContainer = filtersContainer;
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = this.#boardPoints.map((point) => point.id === updatedPoint.id ? updatedPoint : point);
    this.#pointsModel.updatePoint(updatedPoint);

    this.#pointPresenters
      .get(updatedPoint.id)
      .init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoints();
  };

  init() {
    this.#boardPoints = [...this.#pointsModel.points].sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

    this.#renderBoard();
  }

  #renderBoard() {
    render(new FiltersView(), this.#filtersContainer);
    this.#renderSort();
    render(this.#tripEventsListView, this.#listContainer);

    this.#renderPoints();
  }

  #renderCreateForm() {
    render(
      new CreateFormView({
        destinations: this.#pointsModel.destinations,
        offers: this.#pointsModel.offers
      }),
      this.#tripEventsListView.element
    );
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#listContainer);
  }

  #renderPoints() {
    this.#renderCreateForm();
    this.#boardPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const presenter = new RoutePointPresenter({
      container: this.#tripEventsListView.element,
      destinations: this.#pointsModel.destinations,
      offers: this.#pointsModel.offers,
      pointsModel: this.#pointsModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    presenter.init(point);
    this.#pointPresenters.set(point.id, presenter);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#tripEventsListView.element.innerHTML = '';
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.#boardPoints.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case SortType.TIME:
        this.#boardPoints.sort((a, b) => {
          const durationA = new Date(a.dateTo) - new Date(a.dateFrom);
          const durationB = new Date(b.dateTo) - new Date(b.dateFrom);
          return durationB - durationA;
        });
        break;
      case SortType.DAY:
        this.#boardPoints.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
        break;
    }
    this.#currentSortType = sortType;
  }
}
