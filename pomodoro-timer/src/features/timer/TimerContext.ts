import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useReducer,
  useState,
  type FC,
  type FormEvent,
  type InputEvent,
  type ReactNode,
} from "react";
import { MIN_SECOND, SESSIONS, STATUS } from "@/libs/constants/timer";
import { useTimerStore } from "@/libs/stores/timer";
import useAlarm from "./hooks/useAlarm";
import { useToastStore } from "@/libs/stores/toast";
interface TimerContextType {
  isOpen: boolean;
  state: { count: number; min: number; selected: string };
  handleOpen: () => void;
  handlePause: () => void;
  isShowWithStatus: (arr: string[]) => boolean;
  isShowWithType: (arr: string[]) => boolean;
  handleStart: (selected: string) => void;
  handleClose: () => void;
  handleTab: (selected: string) => void;
  handleInput: (event: InputEvent<HTMLInputElement>) => void;
  handleSubmit: (ev: FormEvent<HTMLFormElement>) => void;
  handleIsRunning: () => void;
  handleReset: () => void;
}

const TimerContext = createContext<TimerContextType>({
  isOpen: false,
  state: { count: 0, min: 0, selected: "" },
  handleOpen: () => {},
  handlePause: () => {},
  isShowWithStatus: () => false,
  isShowWithType: () => false,
  handleStart: () => {},
  handleClose: () => {},
  handleTab: () => {},
  handleInput: () => {},
  handleSubmit: () => {},
  handleIsRunning: () => {},
  handleReset: () => {},
});

interface TimerProviderProps {
  children: ReactNode;
}

let timerId: NodeJS.Timeout;

export const TimerProvider: FC<TimerProviderProps> = ({ children }) => {
  const { focus, short, long, setTimer } = useTimerStore();
  const { addToast } = useToastStore();
  const { play } = useAlarm();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(STATUS.STOP);
  const timerReducer = (
    state: { count: number; min: number; selected: string },
    action: { type: string }
  ) => {
    switch (action.type) {
      case SESSIONS.FOCUS:
        return { count: focus * 60, min: focus, selected: SESSIONS.FOCUS };
      case SESSIONS.SHORT:
        return {
          count: short * MIN_SECOND,
          min: short,
          selected: SESSIONS.SHORT,
        };
      case SESSIONS.LONG:
        return { count: long * MIN_SECOND, min: long, selected: SESSIONS.LONG };
      case "decrement":
        return { ...state, count: state.count - 1 };
      case "reset":
        return { ...state, count: state.min * MIN_SECOND };
      case "add25min":
        return { ...state, count: state.count + 25 * MIN_SECOND };
      case "add10min":
        return { ...state, count: state.count + 10 * MIN_SECOND };
      case "add5min":
        return { ...state, count: state.count + 5 * MIN_SECOND };
      case "add1min":
        return { ...state, count: state.count + 1 * MIN_SECOND };
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(timerReducer, {
    count: focus * MIN_SECOND,
    min: focus,
    selected: SESSIONS.FOCUS,
  });

  useEffect(() => {
    if (status !== STATUS.IS_RUNNING && timerId) clearInterval(timerId);
    else if (status === STATUS.IS_RUNNING)
      timerId = setInterval(() => dispatch({ type: "decrement" }), 1000);

    return () => clearInterval(timerId);
  }, [status]);

  useEffect(() => {
    if (state.count <= 0) {
      setStatus(STATUS.TIMEOUT);
      clearInterval(timerId);
      play();
    }
  }, [state.count, play]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const fromData = new FormData(ev.currentTarget);
    const focusVal = Number(fromData.get(SESSIONS.FOCUS));
    const shortVal = Number(fromData.get(SESSIONS.SHORT));
    const longVal = Number(fromData.get(SESSIONS.LONG));

    setTimer({ focus: focusVal, short: shortVal, long: longVal });
    addToast({ message: "Setting updated successfully!", type: "success" });
    handleReset();
    handleClose();
  };

  const handleIsRunning = () => {
    setStatus(STATUS.IS_RUNNING);
  };

  const handlePause = () => {
    setStatus(STATUS.PAUSE);
  };
  const handleReset = () => {
    setStatus(STATUS.STOP);
    dispatch({ type: "reset" });
    dispatch({ type: state.selected });
  };

  const isShowWithStatus = (arr: string[]) => {
    return arr.includes(status);
  };

  const isShowWithType = (arr: string[]) => {
    return arr.includes(state.selected);
  };

  const handleStart = (selected: string) => {
    dispatch({ type: selected });
    handleIsRunning();
  };

  const handleTab = (selected: string) => {
    if (selected === state.selected) return;
    handleReset();
    dispatch({ type: selected });
  };

  const handleInput = (event: InputEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value;

    value = value.replace(/[^0-9]/g, "");

    if (parseInt(value, 10) <= 0) event.currentTarget.value = "";
    // Đảm bảo giá trị không rỗng và không bắt đầu bằng dấu trừ
    else event.currentTarget.value = value.replace(/[^0-9]/g, "");
  };

  const value = {
    isOpen,
    state,
    handleOpen,
    handlePause,
    isShowWithStatus,
    isShowWithType,
    handleStart,
    handleClose,
    handleTab,
    handleInput,
    handleSubmit,
    handleIsRunning,
    handleReset,
  };

  return createElement(TimerContext.Provider, { value }, children);
};

export const useTimer = () => useContext(TimerContext);
