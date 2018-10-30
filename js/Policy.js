/*jshint esversion: 6 */

/** Class for insurance Policy */
class Policy {
  /**
   * Creates an insurance Policy.
   * @param {string} nameOfInsuredObject
   * @param {Date} validFrom
   * @param {Date} validTill
   * @param {Object} risks - Array of insured {@link Risk}.
   */
  constructor(nameOfInsuredObject, validFrom, validTill, risks) {
    this._nameOfInsuredObject = nameOfInsuredObject;
    this._validFrom = validFrom;
    this._validTill = validTill;
    this._risks = risks;
  }

  /**
   * Get name of insured object.
   * @return {string}
   */
  get nameOfInsuredObject() {
    return this._nameOfInsuredObject;
  }

  /**
   * Get date when policy becomes active.
   * @return {Date}
   */
  get validFrom() {
    return this._validFrom;
  }

  /**
   * Get list of the Risks that are included in the policy at given time moment.
   * @return {Object}
   */
  get risks() {
    return this._risks;
  }

  /**
   * Same as {@link risks}.
   * @return {Object}
   */
  get insuredRisks() {
    return this.risks;
  }

  /**
   * Returns {@link Date} when policy becomes inactive.
   * @return {Date}
   */
  get validTill() {
    return this._validTill;
  }

  /**
   * Returns date when policy becomes inactive,
   * in yyyy-mm-dd format.
   * @return {string}
   */
  get validTillFormatted() {
    let helper = new Helper;

    return helper.formatDate(this._validTill);
  }

  /**
   * Get total price of the policy.
   * @return {number}
   */
  get premium() {
    let risks = this._risks;
    let validMonths = this.validMonths();
    var totalMonthPrice = 0;
    risks.forEach(function(risk) {
      totalMonthPrice += risk.monthlyPrice();
    });

    return totalMonthPrice * validMonths;
  }

  /**
   * Returns number of months which the policy is active.
   * Note: Inlcudes full starting and ending month.
   * @returns {number}
   */
  validMonths() {
    let helper = new Helper();
    return helper.monthsBetween(this._validFrom, this._validTill);
  }

  /**
   * Add a new risk to the policy.
   * @param risk
   */
  addRisk(risk) {
    this.risks.push(risk);
  }
}
