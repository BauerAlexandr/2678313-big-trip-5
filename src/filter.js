import dayjs from 'dayjs';
import { FilterType } from './const.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => {
    const currentDate = dayjs();
    return points.filter((point) => dayjs(point.dateFrom).isAfter(currentDate));
  },
  [FilterType.PRESENT]: (points) => {
    const currentDate = dayjs();
    return points.filter((point) => !dayjs(point.dateFrom).isAfter(currentDate) && !dayjs(point.dateTo).isBefore(currentDate));
  },
  [FilterType.PAST]: (points) => {
    const currentDate = dayjs();
    return points.filter((point) => dayjs(point.dateTo).isBefore(currentDate));
  }
};

export { filter };
