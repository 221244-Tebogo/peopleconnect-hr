// helpers/leaveCalculations.js
const calculateLeaveBalance = (userType, startDate) => {
  const today = new Date();
  const leaveCycleStart = new Date(startDate);
  leaveCycleStart.setFullYear(today.getFullYear());

  // Define leave entitlements based on user type
  const sickLeaveDays = userType === "office" ? 30 : 36;
  const annualLeaveDays = userType === "office" ? 15 : 18;

  // Mock functions for calculating used leave (replace with actual database queries)
  const sickLeaveUsed = getSickLeaveUsed(userType);
  const annualLeaveUsed = getAnnualLeaveUsed(userType);

  return {
    sickLeaveBalance: sickLeaveDays - sickLeaveUsed,
    annualLeaveBalance: annualLeaveDays - annualLeaveUsed,
  };
};

// Mock functions for leave usage (replace these with real database queries)
const getSickLeaveUsed = (userType) => {
  // Placeholder calculation for sick leave used
  return 5;
};

const getAnnualLeaveUsed = (userType) => {
  // Placeholder calculation for annual leave used
  return 8;
};

module.exports = { calculateLeaveBalance };
