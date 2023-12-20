// Modal.js
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import FocusTrap from "./FocusTrap";

const Modal = ({ onClose, children }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.body;
    modalRoot.appendChild(elRef.current);
    document.body.classList.add("overflow-hidden");

    return () => {
      modalRoot.removeChild(elRef.current);
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDOM.createPortal(
    <div className=" z-[999] fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-md">
      <FocusTrap>
        <div className="flex justify-center items-center w-screen h-screen">
          <div className="w-full h-full flex justify-center items-center">
            {children}
          </div>

          <button
            onClick={onClose}
            className="absolute right-10 top-10 p-2 rounded-md border text-white"
          >
            Close
          </button>
        </div>
      </FocusTrap>
    </div>,
    elRef.current
  );
};

export default Modal;
