/*jshint esversion: 6 */

/** Insurance company class */
class InsuranceCompany {
  /**
   * Returns hardcoded company name.
   * @returns {string}
   */
  get name() {
    return 'Super nice Insurance Ltd';
  }

  /**
   * Returns list of insurable risks or false if no risks are available.
   * @returns {object|boolean}
   */
  get availableRisks() {
    return this._availableRisks ? this._availableRisks : false;
  }

  /**
   * Sets list of insurable risks.
   * @param {object} risks - Aray of {@link Risk} objects that can now be insured.
   */
  setAvailableRisks(risks) {
    this._availableRisks = risks;
  }

  /**
   * Returns list of {@link Policy} objects or false if no policies are available.
   * @returns {object|boolean}
   */
  get availablePolicies() {
    return this._availablePolicies ? this._availablePolicies : false;
  }

  /**
   * Sets list of policies available at the company.
   * @param {object} policies - Array of {@link Policy} objects that can now be insured.
   */
  setAvailablePolicies(policies) {
    this._availablePolicies = policies;
  }

  /**
   * Sells the policy
   * @param {string} nameOfInsuredObject - Name of the insured object. Must be unique in the given period.
   * @param {Date} validFrom - Date and time when policy starts. Can't be in the past.
   * @param {number} validMonths - Policy period in full months.
   * @param {object} selectedRisks - Array of {@link Risk} objects that must be included in the policy.
   * @returns {Policy|boolean}
   */
  sellPolicy(nameOfInsuredObject, validFrom, validMonths, selectedRisks) {
    /* Check if valid from is in the past */
    let validFromDate = new Date(validFrom.getTime());
    let helper = new Helper;

    if (helper.isDateinPast(validFromDate)) {
      throw Error('Policy can\'t start in the past');
    }

    /* Calculate policy expiration date */
    let validTill = validFromDate;
    // Date class starts counting months from 0, so we need to go down by 1
    validTill.setMonth(validTill.getMonth() + (validMonths));
    // Adjust last active day of policy
    validTill.setDate(validTill.getDate() - 1);

    // Create policy and add it to the available policies in the company
    let policy = new Policy(nameOfInsuredObject, validFrom, validTill, selectedRisks);
    this.setAvailablePolicies([policy]);

    return policy;
  }

  /**
   * Adds a {@link Risk} to a specific policy.
   * @param {string} nameOfInsuredObject
   * @param {Risk} risk
   * @param {Date} validFrom
   */
  addRisk(nameOfInsuredObject, risk, validFrom) {
    let helper = new Helper;
    if (helper.isDateinPast(validFrom)) {
      throw Error('Can\'t add risk that starts in the past');
    }

    let policy = this.getPolicy(nameOfInsuredObject, validFrom);
    if (policy !== undefined) {
      policy.addRisk(risk);
    }
  }

  /**
   * Returns policy by name and date during which it has to be active.
   * @param {string} nameOfInsuredObject
   * @param {Date} effectiveDate
   * @return {Policy|undefined}
   */
  getPolicy(nameOfInsuredObject, effectiveDate) {
    var effectiveTime = effectiveDate.getTime();

    // Returns policy if the name matches and it's active in the provided date
    return this.availablePolicies.find(function (policy) {
      return ((policy.nameOfInsuredObject === nameOfInsuredObject) &&
        (policy.validFrom.getTime() <= effectiveTime) &&
        (policy.validTill.getTime() >= effectiveTime));
    });
  }
}
