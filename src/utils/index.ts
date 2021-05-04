export const formatTimePadding = (timeInSeconds: number) => {
  const seconds = String(timeInSeconds % 60);
  const minutes = String((timeInSeconds / 60) | 0);

  return `${minutes.length === 1 ? "0" + minutes : minutes}:${
    seconds.length === 1 ? "0" + seconds : seconds
  }`;
};
