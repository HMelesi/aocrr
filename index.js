const { sortData } = require("./formatData");

const getAnswer = async () => {
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

  console.log(answer);
};

getAnswer();
