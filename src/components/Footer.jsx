import React, { useRef, useEffect } from 'react';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { socialLinks } from './config/socialLinks';

// ParticlesBackground for Footer animations
const ParticlesBackground = ({ mouseX, mouseY }) => {
  const particles = Array.from({ length: 20 });
  return (
    <>
      {particles.map((_, i) => {
        const size = Math.random() * 8 + 4;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const moveX = useTransform(
          mouseX,
          [0, window.innerWidth],
          [0, (i % 2 ? 1 : -1) * size * 2]
        );
        const moveY = useTransform(
          mouseY,
          [0, window.innerHeight],
          [0, (i % 3 ? 1 : -1) * size * 2]
        );
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              backgroundColor: '#FFD700',
              borderRadius: '50%',
              opacity: 0.2,
              x: moveX,
              y: moveY,
            }}
            transition={{ type: 'spring', damping: 18, stiffness: 120 }}
          />
        );
      })}
    </>
  );
};

export default function Footer({ hideSideIcons }) {
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

  // Filter out Instagram
  const filteredLinks = socialLinks.filter(link => link.name !== 'Instagram');

  return (
    <Box
      ref={containerRef}
      component="footer"
      sx={{ position: 'relative', width: '100%', minHeight: '50vh', bgcolor: 'transparent', overflow: 'hidden', px: { xs: 4, md: 10 }, py: 8 }}
    >
      {/* Animated particles */}
      <ParticlesBackground mouseX={smoothX} mouseY={smoothY} />

      {/* Blurred circle animation */}
      <motion.div
        style={{
          position: 'absolute', top: '30%', left: '10%', width: 500, height: 500, backgroundColor: '#FFD700', borderRadius: '50%', filter: 'blur(120px)', zIndex: 0, x: smoothX, y: smoothY, opacity: 0.15,
        }}
        transition={{ duration: 0.5 }}
      />

      <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: '#64ffda', mb: 2 }}>Restons en contact</Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
          {filteredLinks.map(social => (
            <IconButton key={social.name} component="a" href={social.url} target="_blank" rel="noopener noreferrer" sx={{ color: social.color, '&:hover': { bgcolor: `${social.color}22` } }}>
              <social.icon fontSize="large" />
            </IconButton>
          ))}
        </Stack>
        <Typography variant="body2" sx={{ color: '#ccd6f6' }}>© {new Date().getFullYear()} Geoffrey Mouelet. Tous droits réservés.</Typography>
      </Box>
    </Box>
  );
}
