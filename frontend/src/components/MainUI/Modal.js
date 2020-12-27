import React from "react";
import ReactDOM from "react-dom";
import './Modal.css'

const ModalContent = (props) => {
  let content = <div />;
  if (props.show) {
    content = (
      <div className="modal">
        <header className="modal-header">
            <h3>{props.header}</h3>
        </header>
        <div>{props.children}</div>
      </div>
    );
  }

  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};
const Modal = (props) => {
  console.log("Rendering" + props.header);
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <ModalContent {...props} />
    </React.Fragment>
  );
};

export default Modal;
