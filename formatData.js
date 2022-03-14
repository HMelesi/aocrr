const fs = require("fs");

const sortData = () => {
  const data = fs.readFileSync("./data.txt").toString();

  const sortedData = data.split("\n").sort((a, b) => {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  });

  const guardsArray = [];
  let currentGuardId;
  let minute;
  let awake = true;

  for (let i = 0; i < sortedData.length; i++) {
    if (/Guard/.test(sortedData[i])) {
      const id = Number(sortedData[i].match(/#(\w+)/)[1]);
      guardsArray.push({
        id,
        minutes: [],
      });
      currentGuardId = id;
    } else {
      const newMinute = Number(sortedData[i].match(/([0-9]{2})]/)[1]);

      if (!awake) {
        const guard = guardsArray.find(
          (guardObject) => guardObject.id === currentGuardId
        );
        for (let i = minute; i < newMinute; i++) {
          guard.minutes.push(i);
        }
      }

      minute = newMinute;
      awake = !awake;
    }
  }
  return guardsArray;
};

const data = sortData();

module.exports = { data };
