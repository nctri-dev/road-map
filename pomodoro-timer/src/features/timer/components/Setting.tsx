import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { SESSIONS } from "@/libs/constants/timer";
import { useTimerStore } from "@/libs/stores/timer";
import { useTimer } from "@/features/timer/TimerContext";
import Label from "@/components/ui/Label";

const Setting = () => {
  const { isOpen, handleClose, handleSubmit, handleInput, handleOpen } =
    useTimer();
  const { focus, short, long } = useTimerStore();
  return (
    <>
      <div className="absolute top-2 right-2 flex gap-5">
        <Button variant="secondary" onClick={handleOpen}>
          Setting
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="bg-stone-950 p-4 rounded-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor={SESSIONS.FOCUS}>
                Pomodoro duration (minutes)
              </Label>
              <Input
                defaultValue={focus}
                id={SESSIONS.FOCUS}
                name={SESSIONS.FOCUS}
                step={1}
                min={1}
                max={59}
                autoFocus
                type="number"
                onInput={handleInput}
              />
            </div>
            <div className="flex gap-x-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor={SESSIONS.SHORT}>Short break (min)</Label>
                <Input
                  defaultValue={short}
                  id={SESSIONS.SHORT}
                  name={SESSIONS.SHORT}
                  type="number"
                  step={1}
                  min={1}
                  max={59}
                  className="w-[128px]"
                  onInput={handleInput}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor={SESSIONS.LONG}>Long break (min)</Label>
                <Input
                  defaultValue={long}
                  id={SESSIONS.LONG}
                  name={SESSIONS.LONG}
                  type="number"
                  step={1}
                  min={1}
                  max={59}
                  className="w-[128px]"
                  onInput={handleInput}
                />
              </div>
            </div>
            <Button type="submit">Update Settings</Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Setting;
