import { useEffect, type FC, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, children, onClose }) => {
  useEffect(() => {
    const handleClose = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.addEventListener("keydown", handleClose);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.removeEventListener("keydown", handleClose);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;

  const rootModal =
    document.getElementById("modal-root") || document.createElement("div");
  if (!document.getElementById("modal-root")) {
    rootModal.id = "modal-root";
    document.body.appendChild(rootModal);
  }

  return createPortal(
    <div
      onClick={onClose}
      className="fixed top-0 right-0 w-screen h-screen bg-stone-800/50 flex justify-center items-center"
    >
      <div onClick={(ev) => ev.stopPropagation()}>{children}</div>
    </div>,
    rootModal
  );
};

export default Modal;
