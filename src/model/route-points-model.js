import { generateRoutePoint, destinations, offers } from '../mock/route-point';

export default class RoutePointsModel {
  #points;
  #destinations;
  #offers;

  constructor() {
    this.#points = Array.from({ length: 5 }, generateRoutePoint);
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  getDestinationById(destinationId) {
    return this.#destinations.find((d) => d.id === destinationId);
  }

  getOffersByIds(offerIds) {
    return this.#offers.filter((offer) => offerIds.includes(offer.id));
  }

  updatePoint(updatedPoint) {
    this.#points = this.#points.map((point) =>
      point.id === updatedPoint.id ? updatedPoint : point
    );
  }
}
