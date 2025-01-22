import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "./types";
import { cva } from "class-variance-authority";
import CancelIcon from "../assets/icons/CancelIcon";
import { Button } from "component-ui";
import "./modal.css";

const modalvariants = cva("modal mask component-ui-style", {
  variants: {
    centered: { true: "modal--center", false: null },
    open: { true: "open", false: "close" },
  },
});
export const Modal: React.FC<ModalProps> = (props) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
    if (props.onClose) props.onClose();
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (!props.maskClosable) return;
    const dialog = dialogRef.current;
    if (dialog) {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!isInDialog) {
        dialog.close();
      }
    }
  };
  useEffect(() => {
    if (props.open) openDialog();
    else {
      closeDialog();
    }
  }, [props.open]);
  return createPortal(
    <dialog
      className={modalvariants({ centered: props.centered, open: props.open })}
      onClick={handleBackdropClick}
      ref={dialogRef}
    >
      {props.closeable && (
        <Button
          theme="#000"
          variant="text"
          size="icon"
          className="button"
          onClick={closeDialog}
          icon={<CancelIcon className="cancel--icon" fill="#1c1b1b" />}
        />
      )}
      {props.children}
    </dialog>,
    document.body
  );
};
