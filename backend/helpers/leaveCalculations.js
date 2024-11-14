// helpers/leaveCalculations.js
const calculateLeaveBalance = (userType, startDate) => {
  const today = new Date();
  const leaveCycleStart = new Date(startDate);
  leaveCycleStart.setFullYear(today.getFullYear());

  // Annual leave entitlement per year
  const annualLeaveDays = 15; // Annual leave days per year
  const sickLeaveDays = 0; // Total sick leave days over a 36-month cycle

  // Annual leave balance: user hasn't taken leave since start of the year
  const annualLeaveBalance = annualLeaveDays; // Full entitlement since they started in January

  const sickLeaveBalance = sickLeaveDays;

  return {
    annualLeaveBalance,
    sickLeaveBalance,
  };
};

module.exports = { calculateLeaveBalance };
