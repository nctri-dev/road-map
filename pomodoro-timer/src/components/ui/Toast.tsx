import { useEffect, useState, type FC, type ReactNode } from "react";
import Button from "./Button";
import successIcon from "@/assets/success.svg";

export interface ToastProps {
  message?: string | ReactNode;
  type?: "success" | "error" | "warning";
  onClose?: () => void;
}

// const variants = {
//   success: "text-green-900! bg-green-50! border-green-700!",
//   error: "text-red-900! bg-red-50! border-red-700!",
//   warning: "text-orange-900! bg-orange-50! border-orange-700!",
// };

const icons = {
  success: <img className="w-6 h-6" src={successIcon} />,
  error: (
    <span role="img" aria-label="error">
      ❌
    </span>
  ),
  warning: (
    <span role="img" aria-label="warning">
      ⚠️
    </span>
  ),
};

const Toast: FC<ToastProps> = ({ message, type, onClose }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 2700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${
        isActive ? "opacity-0" : ""
      } duration-300 transition-opacity animation-fade flex items-center cursor-default gap-2 min-w-100 bg-stone-50 text-stone-950 p-2 border border-stone-700 rounded-lg`}
    >
      {!!type && icons[type]}

      <span className="flex-grow ">{message}</span>
      <Button className="text-sm text-stone-50" onClick={onClose}>
        cancel
      </Button>
    </div>
  );
};

export default Toast;
