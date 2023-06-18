import React from "react";
import Modal from "react-modal";

function modal({ children, modalIsOpen }) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "30%",
    },
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
}

export default modal;
