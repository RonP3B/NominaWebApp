const getARS = (salary) => {
  if (isNaN(salary) || salary <= 0) return 0;
  return (salary * 0.0304).toFixed(2);
};

const getAFP = (salary) => {
  if (isNaN(salary) || salary <= 0) return 0;
  return (salary * 0.0287).toFixed(2);
};

const getISR = (salary) => {
  if (isNaN(salary) || salary <= 0) return 0;

  const isrSecond = 2628.36;
  const isrThird = 4010.57;
  let result = 0;
  let isr = 0;

  if (salary > 34685 && salary < 52207.42) {
    isr = salary - 34685;
    result = isr * 0.15;
  } else if (salary > 52207.42 && salary < 72260.25) {
    isr = salary - 52207.42;
    result = isr * 0.2 + isrSecond;
  } else if (salary > 72260.25) {
    isr = salary - 72260.25;
    result = isr * 0.25 + isrSecond + isrThird;
  }

  return result.toFixed(2);
};

module.exports = { getARS, getAFP, getISR };
