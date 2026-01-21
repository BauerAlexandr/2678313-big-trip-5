import FiltersView from '../view/filters.js';
import { render } from '../framework/render';

export default class MainPresenter {
  constructor({ filtersContainer, listContainer }) {
    this.filtersContainer = filtersContainer;
    this.listContainer = listContainer;
  }

  init() {
    render(new FiltersView(), this.filtersContainer);
  }
}
