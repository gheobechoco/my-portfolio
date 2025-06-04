import React, { useRef, useEffect } from 'react';
import { Box, Typography, Link, IconButton, Stack } from '@mui/material';
import { GitHub, Instagram, Facebook, WhatsApp } from '@mui/icons-material';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Particules et bubble comme HeroSection
const ParticlesBackground = ({ mouseX, mouseY }) => {
  const particles = Array.from({ length: 30 });
  return (
    <>
      {particles.map((_, i) => {
        const size = Math.random() * 6 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const moveX = useTransform(mouseX, [0, window.innerWidth], [0, (i % 2 ? 1 : -1) * size * 2]);
        const moveY = useTransform(mouseY, [0, window.innerHeight], [0, (i % 3 ? 1 : -1) * size * 2]);
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute', left: `${x}%`, top: `${y}%`,
              width: size, height: size,
              backgroundColor: '#FFD700', borderRadius: '50%', opacity: 0.3,
              zIndex: 1, x: moveX, y: moveY
            }}
            transition={{ type: 'spring', damping: 20 }}
          />
        );
      })}
    </>
  );
};

const Footer = ({ hideSideIcons }) => {
  const containerRef = useRef(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(cursorY, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const el = containerRef.current;
    const handle = e => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    el.addEventListener('mousemove', handle);
    return () => el.removeEventListener('mousemove', handle);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const sideIcons = document.getElementById('side-icons');
    if (sideIcons) {
      sideIcons.style.display = 'none';
    }
    return () => {
      if (sideIcons) {
        sideIcons.style.display = 'flex';
      }
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      component="footer"
      sx={{ position: 'relative', width: '100%', minHeight: '50vh', bgcolor: '#0a192f', overflow: 'hidden', px: { xs: 4, md: 10 }, py: 8 }}
    >
      <ParticlesBackground mouseX={smoothX} mouseY={smoothY} />
      {/* Yellow bubble */}
      <motion.div
        style={{ position: 'absolute', top: '30%', left: '10%', width: 300, height: 300, backgroundColor: '#FFD700', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0, x: smoothX, y: smoothY }}
      />
      <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: '#64ffda', mb: 2 }}>Restons en contact</Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
          {[GitHub, Instagram, Facebook, WhatsApp].map((Icon, i) => (
            <IconButton key={i} component={Link} href="#" target="_blank" sx={{ color: '#64ffda' }}>
              <Icon />
            </IconButton>
          ))}
        </Stack>
        <Typography variant="body2" sx={{ color: '#ccd6f6' }}>© {new Date().getFullYear()} Geoffrey Mouelet. Tous droits réservés.</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
