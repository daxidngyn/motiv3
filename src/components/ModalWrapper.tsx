import * as React from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const defaultStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 999,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "0.5rem",
    border: "none",
    maxHeight: "83vh",
    width: "90%",
    maxWidth: 800,
    padding: 0,
    background: "transparent",
  },
};

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  toggleIsOpen: any;
  contentLabel: string;
  styles?: object;
}

const ModalWrapper: React.FC<ModalProps> = ({
  children,
  isOpen,
  toggleIsOpen,
  contentLabel,
  styles,
  ...props
}) => {
  return (
    <Modal
      isOpen={isOpen}
      contentLabel={contentLabel}
      style={styles || defaultStyles}
      onRequestClose={toggleIsOpen}
      {...props}
    >
      {children}
    </Modal>
  );
};

export default ModalWrapper;
