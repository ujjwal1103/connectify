import { useClickOutside } from "@react-hookz/web";
import React, { useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";
function MenuItem({ onClick, children }) {
  return (
    <div className="py-2 px-4 cursor-pointer hover:bg-zinc-900" onClick={onClick}>
      {children}
    </div>
  );
}

function Menu({ menuPosition, open, onClose, children }) {
  const menuRef = useRef(null);

  const handleClose = () => {
    onClose && onClose();
  };

  useClickOutside(menuRef, handleClose, ["mousedown"]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          className="absolute w-32 bg-zinc-950 border dark:border-zinc-500/30 shadow-lg z-[9999]"
          style={{
            top: menuPosition.top,
            left: menuPosition.left,
            right: menuPosition.right,
            
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              onClick: () => {
                // handleClose();
                child.props.onClick && child.props.onClick();
              },
            });
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Menu, MenuItem };
