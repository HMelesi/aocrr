const { data } = require("./formatData");
const { deepCloneGuardsArray } = require("./utils");

const strategyOne = (dataArray) => {
  const guardsArray = deepCloneGuardsArray(dataArray);

  guardsArray.sort((a, b) => {
    return b.minutes.length - a.minutes.length;
  });

  const sleepiestGuard = guardsArray[0];

  const sleepiestMinute = sleepiestGuard.minutes
    .sort(
      (a, b) =>
        sleepiestGuard.minutes.filter((minute) => minute === a).length -
        sleepiestGuard.minutes.filter((minute) => minute === b).length
    )
    .pop();

  const answer = sleepiestMinute * sleepiestGuard.id;

  return answer;
};

const strategyTwo = (dataArray) => {
  const guardsArray = deepCloneGuardsArray(dataArray);

  guardsArray.forEach((guard) => {
    guard.sleepiestMinute = guard.minutes
      .sort(
        (a, b) =>
          guard.minutes.filter((minute) => minute === a).length -
          guard.minutes.filter((minute) => minute === b).length
      )
      .pop();
    guard.sleepyMinuteCount = guard.minutes.filter(
      (minute) => minute === guard.sleepiestMinute
    ).length;
  });

  guardsArray.sort((a, b) => {
    return b.sleepyMinuteCount - a.sleepyMinuteCount;
  });

  const sleepiestGuard = guardsArray[0];

  const answer = sleepiestGuard.id * sleepiestGuard.sleepiestMinute;

  return answer;
};

console.log({ strategyTwoAnswer: strategyOne(data) });
console.log({ strategyTwoAnswer: strategyTwo(data) });
