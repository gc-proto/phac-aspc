const isIneligible = (applicant) => {
    return (
      applicant.hasMisrepresented ||
      (applicant.hasCommittedViolation && !applicant.decisionRescinded)
    );
  };
  
  const isEligibleParent = (applicant) => {
    return (
      applicant.isParent &&
      applicant.numChildren > 0 &&
      applicant.receivesCanadaChildBenefit
    );
  };
  
  const getBenefitAmount = (applicant) => {
    if (applicant.adjustedIncome < 70000) {
      return applicant.numChildren * 650;
    } else if (applicant.adjustedIncome < 80000) {
      return applicant.numChildren * 390;
    } else if (applicant.adjustedIncome < 90000) {
      return applicant.numChildren * 260;
    } else {
      return 0;
    }
  };
  
  export { isIneligible, isEligibleParent, getBenefitAmount };
  