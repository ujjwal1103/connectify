import React from 'react';
import { motion } from 'framer-motion';

const SlideAnimation = ({ direction, children }) => {
  const initial = {
    opacity: 0,
    x: direction === 'right' ? -100 : direction === 'left' ? 100 : 0,
    y: direction === 'bottom' ? -100 : direction === 'top' ? 100 : 0,
  };

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  return (
    <motion.div initial={initial} animate={animate} transition={{ duration: 1 }}>
      {children}
    </motion.div>
  );
};

export default SlideAnimation;
