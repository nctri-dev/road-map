export const adjustFontSize = (text = "", { min = 14, max = 36 }): number => {
  const charCount = text.length;
  let fontSize = max - charCount * 0.2;

  if (fontSize < min) fontSize = min;
  else if (fontSize > max) fontSize = max;

  return fontSize;
};
