import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import FocusTrap from "./FocusTrap";
import { useClickOutside } from "@react-hookz/web";
import { motion } from "framer-motion";

const Modal = ({
  onClose,
  children,
  shouldCloseOutsideClick = true,
  showCloseButton = true,
  animate = true,
}) => {
  const elRef = useRef(null);
  const modalRef = useRef(null);

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

  const handleChildClick = (e) => {
    e.stopPropagation();
  };

  useClickOutside(modalRef, () => {
    if (shouldCloseOutsideClick) {
      onClose();
    }
  });

  const childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, { onClose: onClose });
  });

  return ReactDOM.createPortal(
    <motion.div initial={{opacity:0}} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-[999] fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 ">
      <FocusTrap>
        <div className="flex justify-center items-center w-screen h-dvh">
          {animate ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              onClick={handleChildClick}
              ref={modalRef}
            >
              {childrenWithProps}
            </motion.div>
          ) : (
            <div onClick={handleChildClick} ref={modalRef}>
              {childrenWithProps}
            </div>
          )}

          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute hover:bg-white hover:text-black transition-colors duration-300 ease-linear lg:right-10 right-3 top-3 lg:top-10 lg:p-2 p-1 rounded-md border lg:text-base text-xs text-white"
            >
              Close
            </button>
          )}
        </div>
      </FocusTrap>
    </motion.div>,
    elRef.current
  );
};

export default Modal;
