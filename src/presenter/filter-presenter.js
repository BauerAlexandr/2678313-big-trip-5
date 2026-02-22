import FiltersView from '../view/filters.js';
import { render, replace } from '../framework/render.js';
import { UpdateType } from '../const.js';

export default class FilterPresenter {
  #filtersContainer = null;
  #filterModel = null;
  #filtersView = null;

  constructor({ filtersContainer, filterModel }) {
    this.#filtersContainer = filtersContainer;
    this.#filterModel = filterModel;
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevFiltersView = this.#filtersView;

    this.#filtersView = new FiltersView({
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFiltersView === null) {
      render(this.#filtersView, this.#filtersContainer);
      return;
    }

    replace(this.#filtersView, prevFiltersView);
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

  #handleModelEvent = () => {
    this.init();
  };
}
