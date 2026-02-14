import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { TYPES } from '../mock/route-point.js';

export default class CreateFormView extends AbstractStatefulView{
  #destinations;
  #offers;

  constructor({ destinations = [], offers = [] } = {}) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this._state = {
      type: 'flight',
      destinationId: destinations[0]?.id || null
    };

    this._restoreHandlers();
  }

  getDestinationSection() {
    const destination = this.#destinations.find((item) => item.id === this._state.destinationId);

    if (!destination) {
      return '';
    }

    const photosTemplate = destination.pictures
      .map(
        (picture) =>
          `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
      )
      .join('');

    return `
      <section class="event__section event__section--destination">
        <h3 class="event__section-title event__section-title--destination">
          Destination
        </h3>

        <p class="event__destination-description">
          ${destination.description}
        </p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${photosTemplate}
          </div>
        </div>
      </section>
    `;
  }

  get template() {
    const destinationOptions = this.#destinations
      .map((dest) => `<option value="${dest.name}"></option>`)
      .join('');
    const destinationName = this.#destinations.find((item) => item.id === this._state.destinationId)?.name || '';

    const offersTemplate = this.#offers
      .filter((offer) => offer.type === this._state.type)
      .map((offer) => `
        <div class="event__offer-selector">
          <input
            class="event__offer-checkbox visually-hidden"
            type="checkbox"
            name="event-offer-${offer.id}"
          >
          <label class="event__offer-label">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>
      `)
      .join('');

    return `
      <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-create">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${this._state.type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-create" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>
                  ${TYPES.map((eventType) => `
                    <div class="event__type-item">
                      <input id="event-type-${eventType}-create" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}" ${this._state.type === eventType ? 'checked' : ''}>
                      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-create">${eventType}</label>
                    </div>
                  `).join('')}
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-create">
                ${this._state.type}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-create" type="text" name="event-destination" list="destination-list-create" value="${destinationName}">
              <datalist id="destination-list-create">
                ${destinationOptions}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-create">From</label>
              <input class="event__input  event__input--time" id="event-start-time-create" type="text" name="event-start-time" value="19/03/19 00:00">
              &mdash;
              <label class="visually-hidden" for="event-end-time-create">To</label>
              <input class="event__input  event__input--time" id="event-end-time-create" type="text" name="event-end-time" value="19/03/19 00:00">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-create">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-create" type="text" name="event-price" value="">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Cancel</button>
          </header>
          <section class="event__details">
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>

              <div class="event__available-offers">
                ${offersTemplate}
              </div>
            </section>

            ${this.getDestinationSection()}
          </section>
        </form>
      </li>
    `;
  }

  _restoreHandlers() {
    this.element
      .querySelectorAll('.event__type-input')
      .forEach((input) => input.addEventListener('change', this.#typeChangeHandler));

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
  }

  #typeChangeHandler = (evt) => {
    this.updateElement({type: evt.target.value});
  };

  #destinationChangeHandler = (evt) => {
    const value = evt.target.value.trim();
    const destination = this.#destinations.find((item) => item.name === value);

    if (!destination) {
      return;
    }

    this.updateElement({
      destinationId: destination.id
    });
  };
}
