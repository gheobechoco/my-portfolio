import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, Avatar, Stack, IconButton } from '@mui/material';
import { GitHub, Instagram, Facebook, WhatsApp } from '@mui/icons-material';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ------- Particules de fond --------
const ParticlesBackground = ({ mouseX, mouseY }) => {
  const particles = Array.from({ length: 30 });

  return (
    <>
      {particles.map((_, i) => {
        const size = Math.random() * 6 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;

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
              zIndex: 1
            }}
            animate={{
              x: useTransform(mouseX, [0, window.innerWidth], [0, size * 2 * (i % 2 ? 1 : -1)]),
              y: useTransform(mouseY, [0, window.innerHeight], [0, size * 2 * (i % 3 ? 1 : -1)])
            }}
            transition={{ type: 'spring', damping: 20 }}
          />
        );
      })}
    </>
  );
};

// ------- HeroSection principal --------
const HeroSection = () => {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hideIcons, setHideIcons] = useState(false); // <== état pour cacher les icônes

  // Animation 3D
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(cursorY, { damping: 20, stiffness: 300 });

  const rotateX = useTransform(smoothY, [0, window.innerHeight], [-15, 15]);
  const rotateY = useTransform(smoothX, [0, window.innerWidth], [15, -15]);

  const handleMouseMove = (e) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Détecter le scroll pour cacher les icônes
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.body.scrollHeight;

      if (pageHeight - scrollPosition < 400) { // seuil de 400px avant le bas
        setHideIcons(true);
      } else {
        setHideIcons(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effet scramble sur le prénom
  const [displayName, setDisplayName] = useState('Geoffrey Mouelet');
  const originalName = 'Geoffrey Mouelet';
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  const handleNameHover = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayName(prev => {
        return originalName.split('').map((letter, index) => {
          if (index < iterations) {
            return originalName[index];
          }
          return letters[Math.floor(Math.random() * letters.length)];
        }).join('');
      });

      iterations += 1/3;
      if (iterations >= originalName.length) {
        clearInterval(interval);
      }
    }, 30);
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        height: '100vh',
        bgcolor: '#0a192f',
        overflow: 'hidden',
        px: { xs: 4, md: 10 },
        py: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {/* Particules animées */}
      <ParticlesBackground mouseX={smoothX} mouseY={smoothY} />

      {/* Bulle jaune */}
      <motion.div
        style={{
          position: 'absolute',
          top: '30%',
          left: '10%',
          width: 300,
          height: 300,
          backgroundColor: '#FFD700',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 0,
          transform: 'translate(-50%, -50%)',
          x: smoothX,
          y: smoothY,
        }}
      />

      {/* Avatar */}
      <Avatar
        src="/profile.jpg"
        sx={{
          position: 'absolute',
          top: { xs: 20, md: 40 },
          left: { xs: 20, md: 40 },
          width: { xs: 56, md: 80 },
          height: { xs: 56, md: 80 },
          zIndex: 20,
          borderRadius: '50%',
          border: '2px solid #64ffda',
        }}
      />

      {/* Bloc principal avec rotation 3D */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transition: 'transform 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)'
        }}
      >
        <Box sx={{
          maxWidth: '1200px',
          mx: 'auto',
          position: 'relative',
          zIndex: 2
        }}>
          <Typography variant="h5" sx={{
            color: '#64ffda',
            mb: 2,
            fontFamily: 'monospace'
          }}>
            Hi, my name is
          </Typography>

          {/* Prénom avec scramble */}
          <Typography
            variant="h2"
            sx={{
              color: '#ccd6f6',
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 'bold',
              mb: 2,
              cursor: 'pointer'
            }}
            onMouseEnter={handleNameHover}
          >
            {displayName}
          </Typography>

          <Typography variant="h3" sx={{
            color: '#8892b0',
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 'bold',
            mb: 4
          }}>
            Je suis développeur web junior
          </Typography>

          <Typography sx={{
            color: '#8892b0',
            maxWidth: '600px',
            fontSize: '1.1rem',
            lineHeight: 1.6,
            mb: 6
          }}>
            J'ai environ 4 mois d'expérience, je développe avec passion des sites web modernes et réactifs.
          </Typography>

          {/* Bouton Contact */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outlined"
              sx={{
                color: '#64ffda',
                borderColor: '#64ffda',
                borderRadius: '4px',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                '&:hover': {
                  bgcolor: 'rgba(100, 255, 218, 0.1)',
                  borderColor: '#64ffda'
                }
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Contacte-moi
            </Button>
          </motion.div>
        </Box>
      </motion.div>

      {/* Liens sociaux à droite */}
      {!hideIcons && (
        <Stack
          direction="column"
          spacing={3}
          sx={{
            position: 'fixed',
            right: { xs: 20, md: 40 },
            bottom: 40,
            alignItems: 'center',
            zIndex: 10
          }}
        >
          {[GitHub, Instagram, Facebook, WhatsApp].map((Icon, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <IconButton
                sx={{
                  color: '#64ffda',
                  '&:hover': { bgcolor: 'rgba(100, 255, 218, 0.1)' }
                }}
              >
                <Icon fontSize="medium" />
              </IconButton>
            </motion.div>
          ))}
        </Stack>
      )}

      {/* Email vertical */}
      <motion.div
        style={{
          position: 'fixed',
          left: 40,
          bottom: 0,
          writingMode: 'vertical-rl',
          color: '#8892b0',
          fontSize: '0.9rem',
          letterSpacing: '1.5px'
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut'
        }}
      >
        moueletgeoff@gmail.com
      </motion.div>
    </Box>
  );
};

export default HeroSection;