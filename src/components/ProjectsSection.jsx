import React, { useRef, useEffect } from 'react';
import { Box, Typography, Divider, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SectionTransition from './SectionTransition';

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
              zIndex: 1,
              x: useTransform(
                mouseX,
                [0, window.innerWidth],
                [0, size * (i % 2 ? 1 : -1)]
              ),
              y: useTransform(
                mouseY,
                [0, window.innerHeight],
                [0, size * (i % 3 ? 1 : -1)]
              ),
            }}
            transition={{ type: 'spring', damping: 20 }}
          />
        );
      })}
    </>
  );
};

const projects = [
  { title: 'TchopShap', description: "Un blog développé avec React et Markdown", image: 'tchopshap.png', url: 'https://tchopshap.vercel.app/' },
  { title: 'Aspish', description: "Une boutique en ligne avec panier et paiement", image: 'aspish.png', url: 'https://aspish2-0.vercel.app/' },
  { title: 'Fuse', description: "Un mini-jeu de simulation de fusée entièrement codé en JavaScript. Explorez une interface interactive et pilotez votre propre fusée !", image: 'fuse.png', url: 'https://gheobechoco.github.io/fusee-js/' },
  { title: 'Redux Todo App', description: "Une application Todo utilisant Redux pour la gestion d'état", image: 'redux-todo.png', url: 'https://redux1-lilac.vercel.app/' },
  { title: 'Mon Portfolio', description: "Découvrez mon portfolio déployé sur Vercel, présentant mes projets et compétences.", image: 'portfolio.png', url: 'https://vercel.com/gheobechocos-projects/my-portfolio' },
];

const ProjectsSection = () => {
  const containerRef = useRef(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(cursorY, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const c = containerRef.current;
    c.addEventListener('mousemove', handleMouseMove);
    return () => c.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <Box
      ref={containerRef}
      component="section"
      sx={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        bgcolor: 'transparent',
        overflow: 'hidden',
        fontFamily: 'Poppins, sans-serif',
        cursor: 'url(/cursor.svg), auto',
        px: { xs: 2, sm: 4, md: 6 },
        py: 4,
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

      <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', py: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, color: '#64ffda', mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}>
          Mes Projets
        </Typography>
        <Divider sx={{ width: '80px', height: '4px', mx: 'auto', backgroundColor: '#64ffda', boxShadow: '0 0 10px #64ffda', borderRadius: '2px' }} />
      </Box>

      <Grid container spacing={4} justifyContent="center" sx={{ position: 'relative', zIndex: 2, px: { xs: 1, sm: 4, md: 10 }, pb: 10 }}>
        {projects.map(proj => (
          <Grid key={proj.title} item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
            <Card
              sx={{
                aspectRatio: '4 / 3',
                bgcolor: '#112240',
                color: '#ccd6f6',
                borderRadius: '1rem',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                maxWidth: { xs: '95%', sm: '90%', md: '100%' },
                mx: 'auto',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 0 20px #64ffda, 0 0 40px #64ffda99',
                },
              }}
            >
              {proj.image && (
                <CardMedia component="img" image={proj.image} alt={proj.title} sx={{ height: '40%', objectFit: 'cover' }} />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ color: '#64ffda', fontWeight: 600, mb: 1 }}>{proj.title}</Typography>
                <Typography variant="body2" sx={{ color: '#8892b0' }}>{proj.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="outlined" href={proj.url} target="_blank" sx={{ color: '#64ffda', borderColor: '#64ffda' }}>
                  Voir le projet
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <SectionTransition />
    </Box>
  );
};

export default ProjectsSection;