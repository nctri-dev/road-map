import { HOUR_SECOND, MIN_SECOND, PAD_START } from "@/libs/constants/timer";

export const formatSecondsToTime = (count: number) => {
  const hours = Math.floor(count / HOUR_SECOND);
  const minutes = Math.floor((count % HOUR_SECOND) / MIN_SECOND);
  const seconds = count % MIN_SECOND;

  const formattedHours = hours
    ? String(hours).padStart(PAD_START, "0") + ":"
    : "";
  const formattedMinutes =
    hours || minutes ? String(minutes).padStart(PAD_START, "0") + ":" : "";
  const formattedSeconds = String(seconds).padStart(PAD_START, "0");

  const formattedTime = formattedHours + formattedMinutes + formattedSeconds;
  document.title = formattedTime;
  return formattedTime;
};
