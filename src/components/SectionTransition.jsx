// src/components/SectionTransition.jsx
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';

const SectionTransition = () => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100px', overflow: 'hidden' }}>
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '150px',
          background: 'linear-gradient(to top, #0a192f, transparent)',
          zIndex: 10
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.8,
          ease: [0.16, 0.77, 0.47, 0.97] 
        }}
      />
    </Box>
  );
};

export default SectionTransition;