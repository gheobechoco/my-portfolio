import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Divider, Grid, Card, CardContent, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import SectionTransition from './SectionTransition';

// Optimized typing effect with better performance
const useTypingEffect = (text, speed = 30) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= text.length) return;

    const timeoutId = setTimeout(() => {
      setDisplayText(prev => prev + text[currentIndex]);
      setCurrentIndex(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timeoutId);
  }, [text, currentIndex, speed]);

  const reset = () => {
    setDisplayText('');
    setCurrentIndex(0);
  };

  return { displayText, reset, isComplete: currentIndex >= text.length };
};

const TypingText = () => {
  const fullText = "Je m'engage à fournir des solutions web sur mesure qui allient performance, design et expérience utilisateur.";
  const { displayText } = useTypingEffect(fullText, 40);

  return <>{displayText}</>;
};

// Services data
const services = [
  {
    title: 'Développement Frontend',
    description: 'Création d\'interfaces modernes et réactives avec React, Material-UI et animations Framer Motion',
    icon: '💻',
    color: '#00ffc3',
    delay: 0.1
  },
  {
    title: 'Design UI/UX',
    description: 'Conception d\'expériences utilisateur intuitives et esthétiques avec Figma',
    icon: '🎨',
    color: '#ff00f7',
    delay: 0.2
  },
  {
    title: 'Sites Vitrines',
    description: 'Développement de sites web performants et optimisés pour les petites entreprises',
    icon: '🖥️',
    color: '#00b7ff',
    delay: 0.3
  },
  {
    title: 'Applications Web',
    description: 'Création d\'applications web sur mesure pour répondre à vos besoins spécifiques',
    icon: '⚡',
    color: '#ff8300',
    delay: 0.4
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const ServicesSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="section"
      id="services"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'transparent',
        overflow: 'hidden',
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
        py: { xs: 4, md: 8 },
        zIndex: 1,
      }}
    >
      {/* Animated background elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: isMobile ? 300 : 600,
          height: isMobile ? 300 : 600,
          backgroundColor: '#FFD700',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 0,
          opacity: 0.15,
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 }, position: 'relative', zIndex: 2, pt: { xs: 4, md: 8 } }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: '#64ffda',
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
              textShadow: '0 0 20px rgba(100, 255, 218, 0.7)'
            }}
          >
            Ce Que Je Propose
          </Typography>
          <Divider
            sx={{
              width: '100px',
              height: '4px',
              mx: 'auto',
              backgroundColor: '#64ffda',
              boxShadow: '0 0 20px #64ffda',
              borderRadius: '2px'
            }}
          />
        </Box>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <Grid
          container
          spacing={{ xs: 3, md: 4, lg: 6 }}
          justifyContent="center"
          sx={{ pb: { xs: 6, md: 10 } }}
        >
          {services.map((service, index) => (
            <Grid key={index} item xs={12} sm={6} md={6} lg={3}>
              <motion.div
                variants={itemVariants}
                whileHover={{ 
                  y: -15,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    bgcolor: '#112240',
                    borderRadius: '20px',
                    boxShadow: `0 0 20px ${service.color}33, 0 0 40px ${service.color}11`,
                    transition: 'all 0.4s cubic-bezier(0.16, 0.77, 0.47, 0.97)',
                    border: `1px solid ${service.color}33`,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 0 30px ${service.color}, 0 0 60px ${service.color}44`,
                      border: `1px solid ${service.color}66`
                    },
                  }}
                >
                  <CardContent sx={{ 
                    p: { xs: 3, md: 4 }, 
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%'
                  }}>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 15,
                        delay: service.delay 
                      }}
                      viewport={{ once: true }}
                    >
                      <Typography 
                        variant="h1" 
                        sx={{ 
                          fontSize: { xs: '2.5rem', md: '3.5rem' }, 
                          mb: 3, 
                          color: service.color,
                          filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.3))'
                        }}
                      >
                        {service.icon}
                      </Typography>
                    </motion.div>
                    
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: service.color, 
                        mb: 2, 
                        fontWeight: 700,
                        fontSize: { xs: '1.1rem', md: '1.25rem' }
                      }}
                    >
                      {service.title}
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#8892b0', 
                        lineHeight: 1.6,
                        fontSize: { xs: '0.9rem', md: '1rem' }
                      }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Typing Text Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Box sx={{ 
          mt: { xs: 6, md: 10 }, 
          textAlign: 'center', 
          position: 'relative', 
          zIndex: 2, 
          pb: { xs: 6, md: 10 } 
        }}>
          <Typography
            variant="h6"
            sx={{
              color: '#ccd6f6',
              fontStyle: 'italic',
              maxWidth: '800px',
              mx: 'auto',
              position: 'relative',
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.1rem' },
              px: { xs: 2, md: 0 }
            }}
          >
            <TypingText />
            <motion.span
              style={{ 
                display: 'inline-block',
                width: '8px',
                height: '1.2em',
                backgroundColor: '#64ffda',
                marginLeft: '4px',
                verticalAlign: 'middle'
              }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: 1, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.div
              style={{ 
                position: 'absolute', 
                bottom: -15, 
                left: '50%', 
                width: '120px', 
                height: '3px', 
                backgroundColor: '#64ffda', 
                x: '-50%',
                borderRadius: '2px'
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </Typography>
        </Box>
      </motion.div>

      <SectionTransition />
    </Box>
  );
};

export default ServicesSection;