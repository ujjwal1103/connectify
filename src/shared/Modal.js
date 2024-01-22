// // Modal.js
// import React, { useEffect, useRef } from "react";
// import ReactDOM from "react-dom";
// import FocusTrap from "./FocusTrap";

// const Modal = ({ onClose, children }) => {
//   const elRef = useRef(null);

//   if (!elRef.current) {
//     elRef.current = document.createElement("div");
//   }

//   useEffect(() => {
//     const modalRoot = document.body;
//     modalRoot.appendChild(elRef.current);
//     document.body.classList.add("overflow-hidden");

//     return () => {
//       modalRoot.removeChild(elRef.current);
//       document.body.classList.remove("overflow-hidden");
//     };
//   }, []);

//   return ReactDOM.createPortal(
//     <div className=" z-[999] fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-md">
//       <FocusTrap>
//         <div
//           className="flex justify-center items-center w-screen h-screen"
//           onClick={onClose}
//         >
//           <div onClick={(e) => e.stopPropagation()}>{children}</div>

//           <button
//             onClick={onClose}
//             className="absolute lg:right-10 right-3 top-3 lg:top-10 lg:p-2 p-1 rounded-md border lg:text-base text-xs text-white"
//           >
//             Close
//           </button>
//         </div>
//       </FocusTrap>
//     </div>,
//     elRef.current
//   );
// };

// export default Modal;


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

  const handleChildClick = (e) => {
    e.stopPropagation();
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    // Pass onClose method as a prop to children
    return React.cloneElement(child, { onClose: onClose });
  });

  return ReactDOM.createPortal(
    <div className="z-[999] fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-md">
      <FocusTrap>
        <div
          className="flex justify-center items-center w-screen h-screen"
          // onClick={onClose}
        >
          <div onClick={handleChildClick}>{childrenWithProps}</div>

          <button
            onClick={onClose}
            className="absolute lg:right-10 right-3 top-3 lg:top-10 lg:p-2 p-1 rounded-md border lg:text-base text-xs text-white"
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
