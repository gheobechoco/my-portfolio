import React, { useRef, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ------- Particules de fond (identique à HeroSection) --------
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
              x: useTransform(mouseX, [0, window.innerWidth], [0, size * (i % 2 ? 1 : -1)]),
              y: useTransform(mouseY, [0, window.innerHeight], [0, size * (i % 3 ? 1 : -1)])
            }}
            transition={{ type: 'spring', damping: 20 }}
          />
        );
      })}
    </>
  );
};

const neonColors = ['#00ffc3','#ff00f7','#00b7ff','#ff8300','#a600ff','#00ff88'];
const cards = [
  { img: 'src/assets/promo-10-annonce.jpg', title: 'Découverte', text: 'Les premiers pas dans le code.' },
  { img: 'src/assets/test-en-ligne-pog.jpg', title: 'Retention des Test dev web', text: 'Les premiers pas dans le code, :ors des test en ligne ' },
  { img: 'src/assets/session-info-emma.jpg', title: 'Session d information', text: 'Ma session d information sur les test dev web' },
  { img: 'src/assets/gheo-ambassad.jpg', title: 'Défis', text: 'Trouver des solution et S"adapter a toute situations' }, 
  { img: 'src/assets/coach-ambass.jpg', title: 'Apprentissage', text: 'HTML, CSS, JavaScript.' },
  { img: 'src/assets/brel-pc.jpg', title: 'Passion', text: 'Création de sites web.' },
  { img: 'src/assets/equipe=ambass.jpg', title: 'Évolution', text: 'Devenir développeur confirmé.' },
];

export default function FuturisticCards() {
  const containerRef = useRef(null);

  // curseur 3D
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(cursorY, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = e => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const c = containerRef.current;
    c.addEventListener('mousemove', handleMouseMove);
    return () => c.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // double cartes pour boucle infinie
  const looped = [...cards, ...cards];

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        overflow: 'hidden',        // cache tout dépassement
        minHeight: '100vh',
        bgcolor: '#0a192f',
        px: 0, py: 8
      }}
    >
      {/* Fond animé */}
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
          x: smoothX,
          y: smoothY
        }}
      />

      {/* Titre */}
      <Typography
        variant="h4"
        sx={{
          color: '#64ffda',
          mb: 6,
          textAlign: 'center',
          position: 'relative',
          zIndex: 2
        }}
      >
        Mon Voyage en tant que Développeur Web 🚀
      </Typography>

      {/* Carousel automatique lent */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          overflow: 'hidden',
          width: '100%',
          height: { xs: 360, md: 440 }
        }}
      >
        <motion.div
          style={{
            display: 'flex',
            width: `${looped.length * 320}px`
          }}
          animate={{ x: [`0px`, `-${cards.length * 320}px`] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: cards.length * 8,   // vitesse ralentie (8s par carte)
              ease: 'linear'
            }
          }}
        >
          {looped.map((card, i) => (
            <Box
              key={i}
              sx={{
                flex: '0 0 auto',
                px: { xs: 1, md: 2 },
                py: 2
              }}
            >
              <Card sx={{
                width: { xs: 260, md: 300 },
                height: { xs: 340, md: 400 },
                bgcolor: '#112240',
                borderRadius: '20px',
                overflow: 'hidden',
                color: '#ccd6f6',
                boxShadow: `0 0 25px ${neonColors[i % neonColors.length]}, 0 0 50px ${neonColors[i % neonColors.length]}`,
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: `0 0 50px ${neonColors[i % neonColors.length]}, 0 0 100px ${neonColors[i % neonColors.length]}`
                }
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={card.img}
                  alt={card.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ color: neonColors[i % neonColors.length], mb: 1 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#8892b0' }}>
                    {card.text}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </motion.div>
      </Box>
    </Box>
  );
}
