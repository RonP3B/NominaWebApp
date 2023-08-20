const countVacationDays = (startDate, endDate) => {
  const startMs = startDate.getTime();
  const endMs = endDate.getTime();
  const diffMs = endMs - startMs;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
};

module.exports = countVacationDays;
