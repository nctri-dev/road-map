import { useEffect, type FC, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, isOpen]);
  if (!isOpen) return null;

  const modalRoot =
    document.getElementById("modal-root") || document.createElement("div");
  if (!document.getElementById("modal-root")) {
    modalRoot.id = "modal-root";
    document.body.appendChild(modalRoot);
  }

  return createPortal(
    <div
      onClick={onClose}
      className="z-10 fixed top-0 left-0 w-screen h-screen bg-gray-200/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed rounded-xl border bg-white p-8 bottom-1/2 right-1/2 translate-1/2 z-20 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="bg-gray-800 text-white rounded-full w-8 h-8 justify-center items-center absolute right-1 top-1 hover:opacity-90"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
