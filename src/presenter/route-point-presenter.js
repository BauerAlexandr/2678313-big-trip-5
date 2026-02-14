import RoutePointView from '../view/route-point.js';
import EditFormView from '../view/form-editing.js';
import { render, replace, remove } from '../framework/render.js';
import { Mode } from '../const.js';

export default class RoutePointPresenter {
  #container;
  #point;
  #destinations;
  #offers;

  #pointView;
  #editFormView;
  #mode = Mode.DEFAULT;
  #pointsModel;
  #onDataChange;
  #onModeChange;

  constructor({ container, point, destinations, offers, pointsModel, onDataChange, onModeChange }) {
    this.#container = container;
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#pointsModel = pointsModel;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  #replacePointToForm() {
    replace(this.#editFormView, this.#pointView);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointView, this.#editFormView);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#onModeChange();
    this.#replacePointToForm();
  };

  #handleFormClose = () => {
    this.#replaceFormToPoint();
  };

  #handleFormSubmit = (evt) => {
    evt.preventDefault();
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#onDataChange({
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    });
  };

  destroy() {
    remove(this.#pointView);
    remove(this.#editFormView);
  }

  init(point) {
    this.#point = point;

    const destination = this.#pointsModel.getDestinationById(point.destinationId);
    const offers = this.#pointsModel.getOffersByIds(point.offers);

    const prevPointView = this.#pointView;
    const prevEditFormView = this.#editFormView;

    this.#pointView = new RoutePointView({
      point,
      destination,
      offers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#editFormView = new EditFormView({
      point,
      destination,
      offers,
      destinations: this.#destinations,
      allOffers: this.#offers,
      onSubmit: this.#handleFormSubmit,
      onClose: this.#handleFormClose
    });

    if (!prevPointView) {
      render(this.#pointView, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointView, prevPointView);
    } else {
      replace(this.#editFormView, prevEditFormView);
    }
  }

}
