const deepCloneGuardsArray = (formattedData) => {
  const cloneArray = [];
  formattedData.forEach((guard) => {
    const cloneGuard = {
      id: guard.id,
      minutes: [...guard.minutes],
    };
    cloneArray.push(cloneGuard);
  });
  return cloneArray;
};

module.exports = { deepCloneGuardsArray };
