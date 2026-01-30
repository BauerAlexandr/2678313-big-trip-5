import { generateRoutePoint, destinations, offers } from '../mock/route-point';

export default class RoutePointsModel {
  constructor() {
    this.points = Array.from({ length: 3 }, generateRoutePoint);
    this.destinations = destinations;
    this.offers = offers;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getDestinationById(destinationId) {
    return this.destinations.find((d) => d.id === destinationId);
  }

  getOffersByIds(offerIds) {
    return this.offers.filter((offer) => offerIds.includes(offer.id));
  }
}
