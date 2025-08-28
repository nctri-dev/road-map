import Button from "@/components/ui/Button";
import { SESSIONS, STATUS } from "@/libs/constants/timer";
import { useTimer } from "@/features/timer/TimerContext";

const Controls = () => {
  const {
    handleIsRunning,
    isShowWithStatus,
    handlePause,
    handleReset,
    handleStart,
    isShowWithType,
  } = useTimer();
  return (
    <div className="flex gap-5 justify-center">
      <Button
        onClick={handleIsRunning}
        hidden={!isShowWithStatus([STATUS.STOP])}
      >
        Start
      </Button>

      <Button
        onClick={handlePause}
        hidden={!isShowWithStatus([STATUS.IS_RUNNING])}
      >
        Pause
      </Button>
      <Button
        onClick={handleIsRunning}
        hidden={!isShowWithStatus([STATUS.PAUSE])}
      >
        Resume
      </Button>
      <Button
        onClick={handleReset}
        hidden={!isShowWithStatus([STATUS.PAUSE, STATUS.IS_RUNNING])}
      >
        Reset
      </Button>

      <Button
        onClick={handleStart.bind(null, SESSIONS.FOCUS)}
        hidden={!isShowWithStatus([STATUS.TIMEOUT])}
      >
        {isShowWithType([SESSIONS.FOCUS]) ? "Restart Focus" : "Start Focus"}
      </Button>
      <Button
        onClick={handleStart.bind(null, SESSIONS.SHORT)}
        hidden={
          !isShowWithStatus([STATUS.TIMEOUT]) ||
          !isShowWithType([SESSIONS.FOCUS])
        }
      >
        Short
      </Button>

      <Button
        onClick={handleStart.bind(null, SESSIONS.SHORT)}
        hidden={
          !isShowWithStatus([STATUS.TIMEOUT]) ||
          !isShowWithType([SESSIONS.SHORT])
        }
      >
        Another short break
      </Button>

      <Button
        onClick={handleStart.bind(null, SESSIONS.LONG)}
        hidden={
          !isShowWithStatus([STATUS.TIMEOUT]) ||
          !isShowWithType([SESSIONS.FOCUS])
        }
      >
        Long
      </Button>

      <Button
        onClick={handleStart.bind(null, SESSIONS.LONG)}
        hidden={
          !isShowWithStatus([STATUS.TIMEOUT]) ||
          !isShowWithType([SESSIONS.LONG])
        }
      >
        Another long break
      </Button>
    </div>
  );
};

export default Controls;
