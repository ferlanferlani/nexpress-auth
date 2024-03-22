export const capitalizeFirstWord = (sentence) => {
  if (!sentence) return "";

  const words = sentence.split(" ");

  const capitalizedWords = words.map((word) => {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const capitalizedSentence = capitalizedWords.join(" ");

  return capitalizedSentence;
};
