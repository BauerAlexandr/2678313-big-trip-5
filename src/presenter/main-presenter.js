import FiltersView from '../view/filters.js';
import SortView from '../view/sort.js';
import RoutePointView from '../view/route-point.js';
import EditFormView from '../view/form-editing.js';
import CreateFormView from '../view/form-creation.js';
import TripEventsListView from '../view/trip-events-list';
import { render } from '../render.js';

export default class MainPresenter {
  constructor({ filtersContainer, listContainer, pointsModel }) {
    this.filtersContainer = filtersContainer;
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    render(new FiltersView(), this.filtersContainer);
    render(new SortView(), this.listContainer);

    const tripEventsListView = new TripEventsListView();
    render(tripEventsListView, this.listContainer);

    const points = this.pointsModel.getPoints();

    points.forEach((point, index) => {
      const destination = this.pointsModel.getDestinationById(point.destinationId);
      const pointOffers = this.pointsModel.getOffersByIds(point.offers);

      if (index === 0) {
        render(
          new CreateFormView({
            destinations: this.pointsModel.getDestinations(),
            offers: this.pointsModel.getOffers()
          }),
          tripEventsListView.getElement()
        );
        render(
          new EditFormView({
            point,
            destination,
            offers: pointOffers
          }),
          tripEventsListView.getElement()
        );
      } else {
        render(
          new RoutePointView({
            point,
            destination,
            offers: pointOffers
          }),
          tripEventsListView.getElement()
        );
      }
    });

  }

}
