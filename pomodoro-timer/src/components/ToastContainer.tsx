import { useToastStore } from "@/libs/stores/toast";
import { createPortal } from "react-dom";
import Toast from "./ui/Toast";

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();
  const toastRoot =
    document.getElementById("toast-root") || document.createElement("div");
  if (!document.getElementById("toast-root")) {
    toastRoot.id = "toast-root";
    document.body.appendChild(toastRoot);
  }

  return createPortal(
    <div className="fixed flex flex-col gap-1 bottom-10 right-1/2 translate-x-1/2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>,
    toastRoot
  );
};

export default ToastContainer;
