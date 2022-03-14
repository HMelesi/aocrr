const { sortData } = require("./formatData");

const strategyOne = async () => {
  const guardsArray = await sortData();

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

  console.log({ strategyOneAnswer: answer });
};

const strategyTwo = async () => {
  const guardsArray = await sortData();

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
  console.log({ strategyTwoAnswer: answer });
};

strategyOne();
strategyTwo();
