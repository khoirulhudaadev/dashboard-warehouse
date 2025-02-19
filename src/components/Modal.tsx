
"use client";

import { Modal } from "flowbite-react";
import React from "react";
import { ModalType } from "types/component";

const ModalComponent: React.FC<ModalType> = ({openModal, title, children, onClose}) => {
return (
    <>
      <Modal show={openModal} onClose={() => onClose()}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalComponent;