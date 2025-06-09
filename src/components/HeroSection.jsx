import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import DraggableAvatar from './DraggableAvatar';
import SectionTransition from './SectionTransition';
import { socialLinks } from './config/socialLinks';
import ContactForm from './ContactForm';

const ParticlesBackground = ({ mouseX, mouseY }) => {
  const particles = Array.from({ length: 30 });
  return (
    <>
      {particles.map((_, i) => {
        const size = Math.random() * 6 + 2;
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
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: '#FFD700',
              borderRadius: '50%',
              opacity: 0.3,
              zIndex: 1,
              x: moveX,
              y: moveY
            }}
            transition={{ type: 'spring', damping: 20 }}
          />
        );
      })}
    </>
  );
};

export default function HeroSection() {
  const containerRef = useRef(null);
  const [hideIcons, setHideIcons] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [displayName, setDisplayName] = useState('Geoffrey Mouelet');

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(cursorY, { damping: 20, stiffness: 300 });
  const rotateX = useTransform(smoothY, [0, window.innerHeight], [-15, 15]);
  const rotateY = useTransform(smoothX, [0, window.innerWidth], [15, -15]);

  const handleOpenContact = () => setOpenContact(true);
  const handleCloseContact = () => setOpenContact(false);

  // Scramble effect for name
  const originalName = 'Geoffrey Mouelet';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const handleNameHover = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayName(prev =>
        originalName
          .split('')
          .map((char, idx) =>
            idx < iterations ? originalName[idx] : letters[Math.floor(Math.random() * letters.length)]
          )
          .join('')
      );
      iterations += 1 / 3;
      if (iterations >= originalName.length) clearInterval(interval);
    }, 30);
  };

  useEffect(() => {
    const handleMouseMove = e => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight;
      const pageHeight = document.body.scrollHeight;
      setHideIcons(pageHeight - scrollPos < 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredLinks = socialLinks.filter(link => link.name !== 'Instagram');

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        height: '100vh',
        bgcolor: 'transparent',
        overflow: 'hidden',
        px: { xs: 4, md: 10 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <ParticlesBackground mouseX={smoothX} mouseY={smoothY} />

      <motion.div
        style={{
          position: 'absolute', top: '30%', left: '10%',
          width: 600, height: 600,
          backgroundColor: '#FFD700', borderRadius: '50%', filter: 'blur(150px)',
          zIndex: 0, x: smoothX, y: smoothY, opacity: 0.2
        }}
      />

      <Box sx={{ position: 'absolute', top: { xs: 20, md: 40 }, left: { xs: 'auto', md: 40 }, right: { xs: 20, md: 'auto' }, zIndex: 20 }}>
        <DraggableAvatar src="/profile.jpg" size={{ xs: 100, md: 140 }} borderSize={3} borderColor="#64ffda" />
      </Box>

      <Box sx={{ maxWidth: '1200px', mx: 'auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ color: '#64ffda', mb: 2, fontFamily: 'monospace' }}>Hi, my name is</Typography>
        <Typography
          variant="h2"
          sx={{ color: '#ccd6f6', fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, fontWeight: 'bold', mb: 2, cursor: 'pointer' }}
          onMouseEnter={handleNameHover}
        >
          {displayName}
        </Typography>
        <Typography variant="h3" sx={{ color: '#8892b0', fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }, fontWeight: 'bold', mb: 4 }}>
          Je suis développeur web junior
        </Typography>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outlined" onClick={handleOpenContact} sx={{ color: '#64ffda', borderColor: '#64ffda', borderRadius: '4px', px: { xs: 3, md: 4 }, py: { xs: 1, md: 1.5 } }}>
            Contactez-moi
          </Button>
        </motion.div>
      </Box>

      <Dialog open={openContact} onClose={handleCloseContact} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: '#64ffda' }}>Contactez-moi</DialogTitle>
        <DialogContent sx={{ backgroundColor: '#112240' }} dividers>
          <ContactForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseContact} sx={{ color: '#8892b0' }}>Fermer</Button>
        </DialogActions>
      </Dialog>

      {!hideIcons && (
        <Stack direction="column" spacing={3} sx={{ position: 'absolute', right: { xs: 10, md: 40 }, top: '50%', transform: 'translateY(-50%)', zIndex: 20 }}>
          {filteredLinks.map(social => (
            <motion.div key={social.name} whileHover={{ y: -5 }}>
              <IconButton component="a" href={social.url} target="_blank" rel="noopener noreferrer" sx={{ color: social.color, '&:hover': { bgcolor: `${social.color}22` } }}>
                <social.icon fontSize="medium" />
              </IconButton>
            </motion.div>
          ))}
        </Stack>
      )}

      <SectionTransition />
    </Box>
  );
}
