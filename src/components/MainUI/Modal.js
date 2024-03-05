import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'
import { MDBModal, MDBModalHeader, MDBModalBody } from "mdbreact"

const ModalContent = (props) => {
  const { toggle, isOpen } = props;
  return (
    <MDBModal toggle={toggle} isOpen={isOpen} className="white-text" size="lg" centered>
        <MDBModalHeader className="elegant-color-dark" toggle={toggle}>
            {props.header}
        </MDBModalHeader>
        <MDBModalBody className="elegant-color-dark">{props.children}</MDBModalBody>
    </MDBModal>
  )
  // return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};
const Modal = (props) => {
  return (
      <ModalContent {...props} />
  );
};

export default Modal;
