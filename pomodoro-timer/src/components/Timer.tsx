import Card from "./ui/Card";
import TimerDisplay from "@/features/timer/components/TimerDisplay";
import SessionSelector from "@/features/timer/components/SessionSelector";
import Controls from "@/features/timer/components/Controls";
import ControlAddTime from "@/features/timer/components/ControlsAddTime";
import Setting from "@/features/timer/components/Setting";
import { TimerProvider } from "@/features/timer/TimerContext";

const TimerCard = () => {
  return (
    <TimerProvider>
      <Card className="flex flex-1 flex-col relative py-10 min-w-100">
        <Setting />
        <div className="flex flex-col gap-10 m-auto justify-center sm:min-w-100 text-center">
          <SessionSelector />
          <TimerDisplay />
          <ControlAddTime />
          <Controls />
        </div>
      </Card>
    </TimerProvider>
  );
};

export default TimerCard;
