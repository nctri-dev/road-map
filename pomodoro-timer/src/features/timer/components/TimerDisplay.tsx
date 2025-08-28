import { MIN_SECOND, PERCENTAGE } from "../../../libs/constants/timer";
import { useTimer } from "../TimerContext";
import { formatSecondsToTime } from "../utils/formatTime";

const TimerDisplay = () => {
  const {
    state: { count, min },
  } = useTimer();

  const perWidth = `${
    ((min * MIN_SECOND - count) / (min * MIN_SECOND)) * PERCENTAGE
  }%`;

  return (
    <>
      <h1 className="text-7xl sm:text-8xl xl:text-9xl font-bold">
        {formatSecondsToTime(count)}
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
