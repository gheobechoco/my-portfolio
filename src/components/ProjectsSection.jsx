import React, { useRef, useEffect } from 'react';
import { Box, Typography, Divider, Grid, Card, CardMedia, CardContent, CardActions, Button, useTheme, useMediaQuery } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SectionTransition from './SectionTransition';
import useGsapAnimation from '../hooks/useGsapAnimation';
import healthImg from '../assets/PIEDS DE PAGE MARY MEDICLINIC.png';
import ogoulaImg from '../assets/PorteCvMedium.png';
import ndalangImg from '../assets/NdaLang.png';

const ParticlesBackground = ({ mouseX, mouseY }) => {
  const particles = Array.from({ length: 20 });
  return (
    <>
      {particles.map((_, i) => {
        const size = Math.random() * 5 + 2;
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
              opacity: 0.2,
              zIndex: 1,
              x: useTransform(
                mouseX,
                [0, typeof window !== 'undefined' ? window.innerWidth : 1000],
                [0, size * (i % 2 ? 1 : -1)]
              ),
              y: useTransform(
                mouseY,
                [0, typeof window !== 'undefined' ? window.innerHeight : 1000],
                [0, size * (i % 3 ? 1 : -1)]
              ),
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 100 }}
          />
        );
      })}
    </>
  );
};

const projects = [
  { 
    title: 'TchopShap', 
    description: "Un blog développé avec React et Markdown", 
    image: 'tchopshap.png', 
    url: 'https://tchopshap.vercel.app/',
    technologies: ['React', 'Markdown', 'Vercel']
  },
  { 
    title: 'AbAmAd', 
    description: "Découvrez ce projet sur ma page Github.", 
    image: '/abamad-liv-jl-accroupi.jpeg', 
    url: 'https://gheobechoco.github.io/AbAmAd/',
    technologies: ['HTML', 'CSS', 'JavaScript']
  },
  { 
    title: 'Mon Portfolio', 
    description: "Découvrez mon portfolio déployé sur Vercel, présentant mes projets et compétences.", 
    image: 'portfolio.png', 
    url: 'https://vercel.com/gheobechocos-projects/my-portfolio',
    technologies: ['React', 'MUI', 'Framer Motion']
  },
  { 
    title: 'Maquette Entreprise EDC PRO CONSULTING', 
    description: "Découvrez la Maquette d EDC PRO Consulting un de nos Client actuel .", 
    image: 'src/assets/EDC.jpg', 
    url: 'https://supply-edc.vercel.app/',
    technologies: ['React', 'MUI', 'Framer Motion']
  },
  {
    title: 'Health Clinic Port-Gentil',
    description: "Site web d'une clinique développé et déployé sur Vercel — interface patient/présentation.",
    image: healthImg,
    url: 'https://health-clinic-portgentil.vercel.app/',
    technologies: ['React', 'Vercel']
  },
  {
    title: 'Ogoula Jesse (Replica)',
    description: "Réplique du projet de Ogoula Jesse réalisée en React et déployée sur Vercel.",
    image: ogoulaImg,
    url: 'https://ogoulajesse-replica-react.vercel.app/',
    technologies: ['React', 'Vercel']
  },
  {
    title: 'NdaLang',
    description: "Application NdaLang — préparation de votre parcours linguistique.",
    image: ndalangImg,
    url: 'https://ndalang1-927j.vercel.app/',
    technologies: ['React', 'Vercel']
  },
];

const ProjectsSection = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(cursorY, { damping: 20, stiffness: 300 });
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Animation GSAP pour le titre
  const { ref: gsapTitleRef, addAnimation: addTitleAnimation } = useGsapAnimation();
  // Animation GSAP pour les cartes
  const { ref: gsapCardsRef, addAnimation: addCardsAnimation } = useGsapAnimation();

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const c = containerRef.current;
    c.addEventListener('mousemove', handleMouseMove);
    return () => c.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  useEffect(() => {
    // Lier les refs GSAP aux éléments DOM
    gsapTitleRef.current = titleRef.current;
    gsapCardsRef.current = containerRef.current;

    // Animation du titre
    addTitleAnimation({
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    });

    // Animation des cartes
    addCardsAnimation({
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, [addTitleAnimation, addCardsAnimation]);

  return (
    <Box
      ref={containerRef}
      component="section"
      id="projects"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'transparent',
        overflow: 'hidden',
        fontFamily: 'Poppins, sans-serif',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 6, md: 8 },
      }}
    >
      <ParticlesBackground mouseX={smoothX} mouseY={smoothY} />

      <motion.div
        style={{
          position: 'absolute',
          top: '25%',
          left: '15%',
          width: isMobile ? 300 : 500,
          height: isMobile ? 300 : 500,
          backgroundColor: '#FFD700',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 0,
          x: smoothX,
          y: smoothY,
          opacity: 0.15
        }}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Titre avec animation GSAP */}
      <Box 
        ref={titleRef}
        sx={{ 
          position: 'relative', 
          zIndex: 2, 
          textAlign: 'center', 
          py: { xs: 6, md: 8 },
          opacity: 0,
          transform: 'translateY(50px)'
        }}
      >
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 800, 
            color: '#64ffda', 
            mb: 2, 
            fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.2rem' },
            textShadow: '0 0 15px rgba(100, 255, 218, 0.6)'
          }}
        >
          Mes Projets
        </Typography>
        <Divider 
          sx={{ 
            width: { xs: '60px', md: '80px' }, 
            height: '4px', 
            mx: 'auto', 
            backgroundColor: '#64ffda', 
            boxShadow: '0 0 15px #64ffda', 
            borderRadius: '2px' 
          }} 
        />
      </Box>

      {/* Grille de projets avec animations GSAP */}
      <Grid 
        ref={gsapCardsRef}
        container 
        spacing={{ xs: 3, md: 4 }} 
        justifyContent="center" 
        sx={{ 
          position: 'relative', 
          zIndex: 2, 
          px: { xs: 1, sm: 2, md: 3 }, 
          pb: { xs: 6, md: 10 },
          maxWidth: '1400px',
          mx: 'auto',
          '& .MuiGrid-item': {
            opacity: 0,
            transform: 'translateY(60px)'
          }
        }}
      >
        {projects.map((proj) => (
          <Grid 
            key={proj.title} 
            item 
            xs={12} 
            sm={6} 
            md={4}
            sx={{ 
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Card
              sx={{
                width: '100%',
                maxWidth: '400px',
                minHeight: '450px',
                bgcolor: '#112240',
                color: '#ccd6f6',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.4s cubic-bezier(0.16, 0.77, 0.47, 0.97)',
                border: '1px solid rgba(100, 255, 218, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 40px rgba(100, 255, 218, 0.3), 0 0 60px rgba(100, 255, 218, 0.15)',
                  border: '1px solid rgba(100, 255, 218, 0.3)',
                },
              }}
            >
              {proj.image && (
                <CardMedia 
                  component="img"
                  image={proj.image}
                  alt={proj.title}
                  sx={{ 
                    height: '200px',
                    objectFit: 'cover',
                    objectPosition: 'center top'
                  }}
                />
              )}
              
              <CardContent 
                sx={{ 
                  flexGrow: 1,
                  p: { xs: 2.5, md: 3 },
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: '#64ffda', 
                    fontWeight: 700, 
                    mb: 2,
                    fontSize: { xs: '1.3rem', md: '1.5rem' }
                  }}
                >
                  {proj.title}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#8892b0', 
                    mb: 3,
                    flexGrow: 1,
                    lineHeight: 1.6,
                    fontSize: { xs: '0.95rem', md: '1rem' }
                  }}
                >
                  {proj.description}
                </Typography>

                {proj.technologies && (
                  <Box sx={{ mb: 3 }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#64ffda', 
                        fontWeight: 600,
                        display: 'block',
                        mb: 1
                      }}
                    >
                      Technologies :
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {proj.technologies.map((tech, techIndex) => (
                        <Box
                          key={techIndex}
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            bgcolor: 'rgba(100, 255, 218, 0.1)',
                            borderRadius: '12px',
                            border: '1px solid rgba(100, 255, 218, 0.2)'
                          }}
                        >
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: '#64ffda',
                              fontSize: '0.75rem'
                            }}
                          >
                            {tech}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </CardContent>
              
              <CardActions sx={{ p: { xs: 2.5, md: 3 }, pt: 0 }}>
                <Button 
                  size="medium"
                  variant="outlined"
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: '#64ffda', 
                    borderColor: '#64ffda',
                    borderRadius: '8px',
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: 'rgba(100, 255, 218, 0.1)',
                      borderColor: '#64ffda',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
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