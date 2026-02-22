import Observable from '../framework/observable.js';
import { FilterType, UpdateType } from '../const.js';

export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType = UpdateType.MAJOR, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
