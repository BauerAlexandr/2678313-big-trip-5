import FiltersView from '../view/filters.js';
import SortView from '../view/sort.js';
import CreateFormView from '../view/form-creation.js';
import TripEventsListView from '../view/trip-events-list';
import { render } from '../framework/render.js';
import RoutePointPresenter from './route-point-presenter.js';

export default class MainPresenter {
  constructor({ filtersContainer, listContainer, pointsModel }) {
    this.filtersContainer = filtersContainer;
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
  }

  #pointPresenters = new Map();
  #handlePointChange = (updatedPoint) => {
    this.pointsModel.updatePoint(updatedPoint);

    this.#pointPresenters
      .get(updatedPoint.id)
      .init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  init() {
    render(new FiltersView(), this.filtersContainer);
    render(new SortView(), this.listContainer);

    const tripEventsListView = new TripEventsListView();
    render(tripEventsListView, this.listContainer);

    render(
      new CreateFormView({
        destinations: this.pointsModel.destinations,
        offers: this.pointsModel.offers
      }),
      tripEventsListView.element
    );

    const points = this.pointsModel.points;

    points.forEach((point) => {
      const presenter = new RoutePointPresenter({
        container: tripEventsListView.element,
        point,
        destinations: this.pointsModel.destinations,
        offers: this.pointsModel.offers,
        pointsModel: this.pointsModel,
        onDataChange: this.#handlePointChange,
        onModeChange: this.#handleModeChange,
      });

      presenter.init(point);
      this.#pointPresenters.set(point.id, presenter);
    });
  }
}
