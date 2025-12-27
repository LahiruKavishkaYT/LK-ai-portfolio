import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  yOffset?: number;
  duration?: number;
  blurStrength?: number;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "fit-content", 
  delay = 0.25,
  yOffset = 24, 
  duration = 0.8,
  blurStrength = 8
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: "relative", width }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: yOffset, filter: `blur(${blurStrength}px)` },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }} // Updated to a slightly smoother cubic-bezier
      >
        {children}
      </motion.div>
    </div>
  );
};