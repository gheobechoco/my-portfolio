import { Box } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

const SectionTransition = ({ direction = 'to top', colors = ['#0a192f', 'transparent'], height = '150px' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  return (
    <Box 
      ref={ref}
      sx={{ 
        position: 'relative', 
        width: '100%', 
        height: '100px', 
        overflow: 'hidden',
        marginTop: direction === 'to bottom' ? '-50px' : '0',
        marginBottom: direction === 'to top' ? '-50px' : '0'
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          [direction === 'to top' ? 'bottom' : 'top']: 0,
          left: 0,
          width: '100%',
          height: height,
          background: `linear-gradient(${direction}, ${colors.join(', ')})`,
          zIndex: 10,
          opacity: opacity,
          y: y
        }}
        transition={{ 
          duration: 0.8,
          ease: [0.16, 0.77, 0.47, 0.97] 
        }}
      />
    </Box>
  );
};

export default SectionTransition;