/*jshint esversion: 6 */

/** Helper class for generic tasks */
class Helper {
  /**
   * Checks if presented date is in the past
   * @param {Date} date
   * @returns {boolean}
   */
  isDateinPast(date) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    return date < today;
  }

  /**
   * Formats date to yyyy-mm-dd
   * (Can be refactored with format options later)
   * @param {Date} date
   * @returns {string}
   */
  formatDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Date object months start at 0 ¯\_(ツ)_/¯
    let day = date.getDate();
    let delimiter = '-';

    return year + delimiter + month + delimiter + day;
  }

  /**
   * Return number of months between 2 dates.
   * Note: Includes start month and end month.
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {number}
   */
  monthsBetween(startDate, endDate) {
    let startYear = startDate.getFullYear();
    let endYear = endDate.getFullYear();
    let startMonth = startDate.getMonth();
    let endMonth = endDate.getMonth();

    if (startMonth === 0) { // Adjust for January being 0
      startMonth++;
      endMonth++;
    }

    return (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
  }
}
