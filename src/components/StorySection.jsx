import React, { useRef, useEffect } from 'react';
import { Box, Typography, Divider, Card, CardContent, CardMedia } from '@mui/material';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// Tes cartes
const cards = [
  {
    title: 'Raponda Walker',
    subtitle: "Mon collège & lycée (Bac 2023)",
    image: 'public/raps.jpeg',
    highlight: '#64ffda'
  },
  {
    title: 'Mielbook',
    subtitle: "Projet ruche 🐝 pour passionnés",
    image: 'public/mielbook.jpeg',
    highlight: '#FFD700'
  },
  {
    title: 'École 241',
    subtitle: "Formation débutée nov. 2024",
    image: '/ecole-241.jpg',
    highlight: '#64ffda'
  }
];

// Fond de particules
const ParticlesBackground = ({ mouseX, mouseY }) => {
  const particles = Array.from({ length: 30 });

  return (
    <>
      {particles.map((_, i) => {
        const size = Math.random() * 6 + 2;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const moveX = useTransform(mouseX, [0, window.innerWidth], [0, (i % 2 ? 1 : -1) * 30]);
        const moveY = useTransform(mouseY, [0, window.innerHeight], [0, (i % 3 ? 1 : -1) * 30]);

        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${initialX}%`,
              top: `${initialY}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: '#FFD700',
              borderRadius: '50%',
              opacity: 0.3,
              zIndex: 1,
              x: moveX,
              y: moveY,
            }}
          />
        );
      })}
    </>
  );
};

// Composant principal
const StorySection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
    width: '100vw', // toute la largeur !
    minHeight: '100vh',
    bgcolor: '#0a192f', // fond bleu foncé
    overflow: 'hidden',
    fontFamily: 'Poppins, sans-serif',
    cursor: 'url(/cursor.svg), auto',
    px: 0, // plus de padding horizontal
    py: 8, // tu peux garder juste un peu de vertical
      }}
    >
      {/* Particules */}
      <ParticlesBackground mouseX={mouseX} mouseY={mouseY} />

      {/* Titre */}
      <Box sx={{ position: 'relative', zIndex: 2, mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 800, color: '#64ffda', mb: 1 }}>
          Mon Histoire
        </Typography>
        <Divider
          sx={{
            width: '80px',
            height: '4px',
            mx: 'auto',
            backgroundColor: '#64ffda',
            boxShadow: '0 0 10px #64ffda',
            borderRadius: '2px'
          }}
        />
      </Box>

      {/* Paragraphe */}
      <Box sx={{ position: 'relative', zIndex: 2, mt: 6, textAlign: 'center' }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.2rem',
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.7,
            color: '#ccd6f6'
          }}
        >
          Je suis un jeune passionné de développement web. Depuis 2024, j'ai lancé le projet <strong>Mielbook</strong> pour connecter les passionnés, et j'ai intégré l’École 241 en novembre 2024 après mon Bac.
        </Typography>
      </Box>

      {/* Cartes qui scrollent */}
      <Box sx={{ position: 'relative', mt: 6,  }}>
        <motion.div
          style={{ display: 'flex', gap: '1rem' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
        >
          {cards.concat(cards).map((card, idx) => (
            <Card
              key={idx}
              sx={{
                minWidth: 280,
                bgcolor: '#112240',
                color: '#ccd6f6',
                boxShadow: `0 0 10px ${card.highlight}, 0 0 20px ${card.highlight}`,
                borderRadius: '1rem',
                flexShrink: 0
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={card.image}
                alt={card.title}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ color: card.highlight, fontWeight: 600 }}
                >
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#8892b0' }}>
                  {card.subtitle}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </Box>
    </Box>
  );
};

export default StorySection;
    