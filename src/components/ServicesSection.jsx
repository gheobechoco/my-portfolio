import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import SectionTransition from './SectionTransition';

const services = [
  {
    title: 'Développement Frontend',
    description: 'Création d\'interfaces modernes et réactives avec React, Material-UI et animations Framer Motion',
    icon: '💻',
    color: '#00ffc3'
  },
  {
    title: 'Design UI/UX',
    description: 'Conception d\'expériences utilisateur intuitives et esthétiques avec Figma',
    icon: '🎨',
    color: '#ff00f7'
  },
  {
    title: 'Sites Vitrines',
    description: 'Développement de sites web performants et optimisés pour les petites entreprises',
    icon: '🖥️',
    color: '#00b7ff'
  },
  {
    title: 'Applications Web',
    description: 'Création d\'applications web sur mesure pour répondre à vos besoins spécifiques',
    icon: '⚡',
    color: '#ff8300'
  }
];

// Typing effect component
const TypingText = () => {
  const fullText = "Je m'engage à fournir des solutions web sur mesure qui allient performance, design et expérience utilisateur.";
  const [text, setText] = useState('');

  useEffect(() => {
    let idx = 0;
    const speed = 50; // ms per character
    const timer = setInterval(() => {
      setText(fullText.slice(0, idx + 1));
      idx++;
      if (idx === fullText.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, []);

  return <>{text}</>;
};

const ServicesSection = () => {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'transparent',
        overflow: 'hidden',
        px: { xs: 2, sm: 6, md: 12 },
        py: 0,
        zIndex: 1,
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: '30%',
          left: '10%',
          width: 600,
          height: 600,
          backgroundColor: '#FFD700',
          borderRadius: '50%',
          filter: 'blur(150px)',
          zIndex: 0,
          opacity: 0.2,
        }}
      />

      <Box sx={{ textAlign: 'center', mb: 10, position: 'relative', zIndex: 1, pt: 10 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: '#64ffda',
            mb: 1,
            fontSize: { xs: '2rem', md: '3rem' },
            textShadow: '0 0 10px rgba(100, 255, 218, 0.5)'
          }}
        >
          Ce Que Je Propose
        </Typography>
        <Divider
          sx={{
            width: '80px',
            height: '4px',
            mx: 'auto',
            backgroundColor: '#64ffda',
            boxShadow: '0 0 15px #64ffda',
            borderRadius: '2px'
          }}
        />
      </Box>

      <Grid
        container
        spacing={{ xs: 2, md: 6 }}
        justifyContent="center"
        sx={{ position: 'relative', zIndex: 1, pb: 10 }}
      >
        {services.map((service, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <motion.div whileHover={{ y: -10 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: '#112240',
                  borderRadius: '16px',
                  boxShadow: `0 0 15px ${service.color}44, 0 0 30px ${service.color}22`,
                  transition: 'all 0.3s ease',
                  '&:hover': { boxShadow: `0 0 25px ${service.color}, 0 0 50px ${service.color}66` }
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ fontSize: '3rem', mb: 3, color: service.color }}>
                    {service.icon}
                  </Typography>
                  <Typography variant="h5" sx={{ color: service.color, mb: 2, fontWeight: 600 }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#8892b0', lineHeight: 1.6 }}>
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 10, textAlign: 'center', position: 'relative', zIndex: 1, pb: 10 }}>
        <Typography
          variant="h6"
          sx={{
            color: '#ccd6f6',
            fontStyle: 'italic',
            maxWidth: '600px',
            mx: 'auto',
            position: 'relative',
            whiteSpace: 'pre-wrap'
          }}
        >
          <TypingText />
          <motion.div
            style={{ position: 'absolute', bottom: -10, left: '50%', width: '100px', height: '2px', backgroundColor: '#64ffda', x: '-50%' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
          />
        </Typography>
      </Box>

      <SectionTransition />
    </Box>
  );
};

export default ServicesSection;
