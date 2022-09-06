var spareRandom = null;

function normalRandom() {
  let val: number, u: number, v: number, s: number, mul: number;

  if (spareRandom !== null) {
    val = spareRandom;
    spareRandom = null;
  } else {
    do {
      u = Math.random() * 2 - 1;
      v = Math.random() * 2 - 1;

      s = u * u + v * v;
    } while (s === 0 || s >= 1);

    mul = Math.sqrt((-2 * Math.log(s)) / s);

    val = u * mul;
    spareRandom = v * mul;
  }

  return val;
}

function normalRandomInRange(min: number, max: number) {
  var val: number;
  do {
    val = normalRandom();
  } while (val < min || val > max);

  return val;
}

function normalRandomScaled(mean: number, stddev: number) {
  var r = normalRandom();

  r = r * stddev + mean;

  return r;
}

function normalRandomScaledInRange(
  mean: number,
  stddev: number,
  min: number,
  max: number
) {
  let r: number;
  do {
    r = normalRandomScaled(mean, stddev);
  } while (r < min || r > max);

  return r;
}

const getRandomRate = (
  mean: number,
  stddev: number,
  min: number,
  max: number
) => {
  const rate = normalRandomScaledInRange(mean, stddev, min, max);
  return rate;
};

export default getRandomRate;
