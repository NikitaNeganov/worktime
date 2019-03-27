const alphabetRu = [
  "а",
  "б",
  "в",
  "г",
  "д",
  "е",
  "ж",
  "з",
  "и",
  "й",
  "к",
  "л",
  "м",
  "н",
  "о",
  "п",
  "р",
  "с",
  "т",
  "у",
  "ф",
  "х",
  "ц",
  "ч",
  "ш",
  "щ",
  "ъ",
  "ы",
  "ь",
  "э",
  "ю",
  "я",
  " ",
  "-"
];
const alphabetEn = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  " ",
  "-"
];

export const ru = alphabetRu.reduce((pv, cv) => {
  const temp = {};
  temp.name = cv;
  temp.state = false;
  pv.push(temp);
  return pv;
}, []);
export const en = alphabetEn.reduce((pv, cv) => {
  const temp = {};
  temp.name = cv;
  temp.state = false;
  pv.push(temp);
  return pv;
}, []);
