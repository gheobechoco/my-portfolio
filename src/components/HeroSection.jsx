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
  DialogActions,
  useMediaQuery,
  useTheme
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
          [0, typeof window !== 'undefined' ? window.innerWidth : 1000],
          [0, (i % 2 ? 1 : -1) * size * 2]
        );
        const moveY = useTransform(
          mouseY,
          [0, typeof window !== 'undefined' ? window.innerHeight : 1000],
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(cursorY, { damping: 20, stiffness: 300 });

  const handleOpenContact = () => setOpenContact(true);
  const handleCloseContact = () => setOpenContact(false);

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
    let animationFrameId;
    const handleMouseMove = (e) => {
      if (animationFrameId) return;
      animationFrameId = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        animationFrameId = null;
      });
    };
    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    return () => {
      container?.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
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
      id="home"
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', md: '100vh' },
        height: { xs: 'auto', md: '100vh' },
        bgcolor: 'transparent',
        overflow: 'hidden',
        px: { xs: 2, sm: 4, md: 8, lg: 10 },
        py: { xs: 8, md: 0 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {!isMobile && <ParticlesBackground mouseX={smoothX} mouseY={smoothY} />}

      {!isMobile && (
        <Box
          component={motion.div}
          sx={{
            position: 'absolute',
            top: { xs: '15%', md: '30%' },
            left: { xs: '50%', md: '10%' },
            transform: { xs: 'translateX(-50%)', md: 'none' },
            width: { xs: 200, sm: 280, md: 600 },
            height: { xs: 200, sm: 280, md: 600 },
            backgroundColor: '#FFD700',
            borderRadius: '50%',
            filter: 'blur(120px)',
            zIndex: 0,
            opacity: 0.2,
          }}
          style={{ x: smoothX, y: smoothY }}
        />
      )}

      {/* Avatar - repositionné pour ne pas chevaucher */}
      <Box sx={{ 
        position: 'relative',
        display: 'flex',
        justifyContent: { xs: 'center', md: 'flex-start' },
        mb: { xs: 2, md: 0 },
        zIndex: 20 
      }}>
        <DraggableAvatar src="/profile.jpg" size={{ xs: 100, md: 140 }} borderSize={3} borderColor="#64ffda" />
      </Box>

      <Box sx={{ 
        maxWidth: '1200px', 
        mx: 'auto', 
        position: 'relative', 
        zIndex: 2, 
        textAlign: { xs: 'center', md: 'left' },
        mt: { xs: 0, md: 2 }
      }}>
        <Typography variant="h5" sx={{ color: '#64ffda', mb: 2, fontFamily: 'monospace', fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' } }}>
          Hi, my name is
        </Typography>
        <Typography
          variant="h2"
          sx={{ 
            color: '#ccd6f6', 
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '4rem' }, 
            fontWeight: 'bold', 
            mb: 2, 
            cursor: 'pointer',
            wordBreak: 'break-word'
          }}
          onMouseEnter={handleNameHover}
        >
          {displayName}
        </Typography>
        <Typography 
          variant="h3" 
          sx={{ 
            color: '#8892b0', 
            fontSize: { xs: '1.2rem', sm: '1.5rem', md: '3rem' }, 
            fontWeight: 'bold', 
            mb: 4 
          }}
        >
          Je suis développeur web junior
        </Typography>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            variant="outlined" 
            onClick={handleOpenContact} 
            sx={{ 
              color: '#64ffda', 
              borderColor: '#64ffda', 
              borderRadius: '4px', 
              px: { xs: 3, md: 4 }, 
              py: { xs: 1, md: 1.5 },
              fontSize: { xs: '0.8rem', md: '1rem' }
            }}
          >
            Contactez-moi
          </Button>
        </motion.div>
      </Box>

      <Dialog 
        open={openContact} 
        onClose={handleCloseContact} 
        fullWidth 
        maxWidth="sm"
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ color: '#64ffda' }}>Contactez-moi</DialogTitle>
        <DialogContent sx={{ backgroundColor: '#112240' }} dividers>
          <ContactForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseContact} sx={{ color: '#8892b0' }}>Fermer</Button>
        </DialogActions>
      </Dialog>

      {!hideIcons && (
        <Stack 
          direction={{ xs: 'row', md: 'column' }} 
          spacing={{ xs: 2, md: 3 }} 
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            position: { xs: 'relative', md: 'absolute' },
            right: { md: 40 },
            top: { md: '50%' },
            transform: { md: 'translateY(-50%)' },
            mt: { xs: 4, md: 0 },
            zIndex: 20 
          }}
        >
          {filteredLinks.map(social => (
            <motion.div key={social.name} whileHover={{ y: -5 }}>
              <IconButton 
                component="a" 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                sx={{ 
                  color: social.color, 
                  '&:hover': { bgcolor: `${social.color}22` },
                  fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}
              >
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