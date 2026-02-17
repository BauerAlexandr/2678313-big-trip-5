import dayjs from 'dayjs';
import flatpickr from 'flatpickr';

const formatDateForInput = (date) => dayjs(date).format('DD/MM/YY HH:mm');

const destroyDatepickers = (dateFromPicker, dateToPicker) => {
  dateFromPicker?.destroy();
  dateToPicker?.destroy();
};

const createDatepickers = (dateFromInput, dateToInput, dateFrom, dateTo, onDateFromChange, onDateToChange) => {
  const dateFromPicker = flatpickr(dateFromInput, {
    dateFormat: 'd/m/y H:i',
    enableTime: true,
    'time_24hr': true,
    defaultDate: dateFrom,
    onChange: onDateFromChange
  });

  const dateToPicker = flatpickr(dateToInput, {
    dateFormat: 'd/m/y H:i',
    enableTime: true,
    'time_24hr': true,
    defaultDate: dateTo,
    minDate: dateFrom,
    onChange: onDateToChange
  });

  return { dateFromPicker, dateToPicker };
};

const initDatepickers = (view, dateFromPicker, dateToPicker, dateFrom, dateTo, onDateFromChange, onDateToChange) => {
  destroyDatepickers(dateFromPicker, dateToPicker);

  const dateFromInput = view.element.querySelector('[name="event-start-time"]');
  const dateToInput = view.element.querySelector('[name="event-end-time"]');

  return createDatepickers(dateFromInput, dateToInput, dateFrom, dateTo, onDateFromChange, onDateToChange);
};

const clearDatepickers = (dateFromPicker, dateToPicker) => {
  destroyDatepickers(dateFromPicker, dateToPicker);

  return { dateFromPicker: null, dateToPicker: null };
};

const syncDateRange = (view, dateToPicker, selectedDate) => {
  view._setState({ dateFrom: selectedDate });
  dateToPicker.set('minDate', selectedDate);

  if (dayjs(view._state.dateTo).isBefore(selectedDate)) {
    view._setState({ dateTo: selectedDate });
    dateToPicker.setDate(selectedDate, true);
  }
};

const setDateToState = (view, selectedDate) => {
  view._setState({ dateTo: selectedDate });
};

export { formatDateForInput, destroyDatepickers, createDatepickers, initDatepickers, clearDatepickers, syncDateRange, setDateToState };
