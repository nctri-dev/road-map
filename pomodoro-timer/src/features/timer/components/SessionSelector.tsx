import Button from "../../../components/ui/Button";
import { SESSIONS } from "../../../libs/constants/timer";
import { useTimer } from "../TimerContext";
import { isBtnPrimary } from "../utils/btnVariant";

const SessionSelector = () => {
  const {
    state: { selected },
    handleTab,
  } = useTimer();
  return (
    <div className="flex gap-4 m-auto">
      <Button
        variant={isBtnPrimary(selected === SESSIONS.FOCUS)}
        onClick={handleTab.bind(null, SESSIONS.FOCUS)}
      >
        Focus
      </Button>
      <Button
        variant={isBtnPrimary(selected === SESSIONS.SHORT)}
        onClick={handleTab.bind(null, SESSIONS.SHORT)}
      >
        Short <span className={`hidden sm:inline-block`}>Break</span>
      </Button>
      <Button
        variant={isBtnPrimary(selected === SESSIONS.LONG)}
        onClick={handleTab.bind(null, SESSIONS.LONG)}
      >
        Long <span className={`hidden sm:inline-block`}>Break</span>
      </Button>
    </div>
  );
};

export default SessionSelector;
