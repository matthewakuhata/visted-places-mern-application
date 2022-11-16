import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";

const ModalOverlay = ({
  header,
  children,
  footer,
  classes,
  style,
  onSubmit,
}) => {
  const content = (
    <div className={`modal ${classes?.modalClass}`} style={style}>
      <header className={`modal__header ${classes?.headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
        <div className={`modal__content ${classes?.contentClass}`}>
          {children}
        </div>
        <footer className={`modal__footer ${classes?.footerClass}`}>
          {footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = ({ show, onCancel, ...props }) => {
  return (
    <>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
