import React, { useRef, useEffect } from "react";

const FocusTrap = ({ children }) => {
  const trapRef = useRef(null);

  useEffect(() => {
    const trapElement = trapRef.current;

    const handleFocus = (event) => {
      const focusableEls = trapElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusableEl = focusableEls[0];
      const lastFocusableEl = focusableEls[focusableEls.length - 1];

      const isTabPressed = event.key === "Tab" || event.keyCode === 9;

      if (!isTabPressed) {
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          event.preventDefault();
        } else {
          firstFocusableEl.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          event.preventDefault();
        }
      }
    };

    trapElement.addEventListener("keydown", handleFocus);

    return () => {
      trapElement.removeEventListener("keydown", handleFocus);
    };
  }, []);

  return <div ref={trapRef}>{children}</div>;
};

export default FocusTrap;
