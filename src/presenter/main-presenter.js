import FiltersView from '../view/filters.js';
import SortView from '../view/sort.js';
import RoutePointView from '../view/route-point.js';
import EditFormView from '../view/form-editing.js';
import CreateFormView from '../view/form-creation.js';
import TripEventsListView from '../view/trip-events-list';
import { render, replace } from '../framework/render.js';

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

    render(
      new CreateFormView({
        destinations: this.pointsModel.getDestinations(),
        offers: this.pointsModel.getOffers()
      }),
      tripEventsListView.element
    );

    const points = this.pointsModel.getPoints();

    points.forEach((point) => {
      const destination = this.pointsModel.getDestinationById(point.destinationId);
      const offers = this.pointsModel.getOffersByIds(point.offers);

      const pointView = new RoutePointView({
        point,
        destination,
        offers,
        onEditClick: () => replacePointToForm()
      });

      const editFormView = new EditFormView({
        point,
        destination,
        offers,
        onSubmit: (evt) => {
          evt.preventDefault();
          replaceFormToPoint();
        },
        onClose: () => replaceFormToPoint()
      });

      function replacePointToForm () {
        replace(editFormView, pointView);
        document.addEventListener('keydown', onEscKeyDown);
      }

      function replaceFormToPoint () {
        replace(pointView, editFormView);
        document.removeEventListener('keydown', onEscKeyDown);
      }

      function onEscKeyDown(evt) {
        if (evt.key === 'Escape') {
          replaceFormToPoint();
        }
      }

      render(pointView, tripEventsListView.element);
    });
  }
}
