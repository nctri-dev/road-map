import Button from "@/components/ui/Button";
import { useTimer } from "@/features/timer/TimerContext";

const ControlAddTime = () => {
  const { handleStart } = useTimer();
  return (
    <div className="flex justify-between mx-auto">
      <Button variant="secondary" onClick={handleStart.bind(null, "add25min")}>
        + 25 min
      </Button>
      <Button variant="secondary" onClick={handleStart.bind(null, "add10min")}>
        + 10 min
      </Button>
      <Button variant="secondary" onClick={handleStart.bind(null, "add5min")}>
        + 5 min
      </Button>
      <Button variant="secondary" onClick={handleStart.bind(null, "add1min")}>
        + 1 min
      </Button>
    </div>
  );
};

export default ControlAddTime;
