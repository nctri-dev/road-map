import {
  HOUR_SECOND,
  MIN_SECOND,
  PAD_START,
  PERCENTAGE,
} from "../../../libs/constants/timer";
import { useTimer } from "../TimerContext";

const TimerDisplay = () => {
  const {
    state: { count, min },
  } = useTimer();
  const formatSecondsToTime = () => {
    const hours = Math.floor(count / HOUR_SECOND);
    const minutes = Math.floor((count % HOUR_SECOND) / MIN_SECOND);
    const seconds = count % MIN_SECOND;

    // Sử dụng String.prototype.padStart() để đảm bảo có 2 chữ số
    const formattedHours = hours
      ? String(hours).padStart(PAD_START, "0") + ":"
      : "";
    const formattedMinutes =
      hours || minutes ? String(minutes).padStart(PAD_START, "0") + ":" : "";
    const formattedSeconds = String(seconds).padStart(PAD_START, "0");

    return formattedHours + formattedMinutes + formattedSeconds;
  };

  const perWidth = `${
    ((min * MIN_SECOND - count) / (min * MIN_SECOND)) * PERCENTAGE
  }%`;

  return (
    <>
      <h1 className="text-7xl sm:text-8xl xl:text-9xl font-bold">
        {formatSecondsToTime()}
      </h1>
      <div className="h-1 bg-stone-50/20 rounded-full">
        <div
          style={{
            width: perWidth,
          }}
          className="h-full bg-secondary rounded-full transition-normal duration-75"
        ></div>
      </div>
    </>
  );
};

export default TimerDisplay;
