function updateAllowance(day, amount, data) {
  const dayIndex = data.findIndex((item) => item.day === day);
  if (dayIndex !== -1) {
    data[dayIndex].allowance = amount;
  }

  return data;
}

function updateExpenses(day, amount, data) {
  const dayIndex = data.findIndex((item) => item.day === day);
  if (dayIndex !== -1) {
    data[dayIndex].expenses = amount;
  }

  return data;
}

export { updateAllowance, updateExpenses };
