/*jshint esversion: 6 */

/** Risk class */
class Risk {
  /**
   * Create a Risk.
   * @param {string} name - Name of the Risk.
   * @param {number} yearlyPrice - Price of the Risk per year.
   */
  constructor(name, yearlyPrice) {
    this._name = name;
    this._yearlyPrice = yearlyPrice;
  }

  /**
   * Returns name of the Risk.
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Returns Risk price per year.
   * @returns {number}
   */
  get yearlyPrice() {
    return this._yearlyPrice;
  }

  /**
   * Returns Risk price per month.
   * @returns {number}
   */
  monthlyPrice() {
    return this._yearlyPrice / 12;
  }
}