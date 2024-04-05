import React from "react";
import { motion } from "framer-motion";

const ZoomAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {children}
    </motion.div>
  );
};

export default ZoomAnimation;
