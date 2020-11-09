export const CtoF = (c) => (c * 9) / 5 + 32;
export const hourFormatter = (value) => {
  let suffix = "";
  if (value === 0) {
    value = 12;
  }
  if (value <= 11) {
    suffix = "AM";
  } else {
    suffix = "PM";
    if (value > 12) {
      value -= 12;
    }
  }
  return value + suffix;
};
