import React, { useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Divider,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SectionTransition from './SectionTransition';
import useGsapAnimation from '../hooks/useGsapAnimation';
import FigmaEmbed from './FigmaEmbed';

// Images depuis assets
import healthImg from '../assets/PIEDS DE PAGE MARY MEDICLINIC.png';
import ogoulaImg from '../assets/PorteCvMedium.png';
import ndalangImg from '../assets/NdaLang.png';
import portecvLogoImg from '../assets/logo-portecv-fondBlancn.png';
import portecvStudentImg from '../assets/etudiant-potecv-polo-modele.jpg';
import zipUnzipImg from '../assets/student-hero-DQI870mp.jpg';
import edelweissImg from '../assets/logo-edelweiss.jpg';
import primePromptImg from '../assets/image.png';
import edcImg from '../assets/EDC.jpg';

// Images depuis assets pour les nouveaux projets
import coupleBlancImg from '../assets/couple-blanc.jpg';
import coupleOrangeBleuImg from '../assets/couple-orange-bleu.jpg';
import showGabImg from '../assets/Show-Gab.png';

// Images depuis public (chemins absolus)
// Correction : le fichier s'appelle tchophap.png (sans 's')
const tchopshapImg = '/tchopshap.png';  // ⚠️ Attention : tchophap.png (sans 's')
const portfolioImg = '/portfolio.png';
const abamadImg = '/abamad-liv-jl-accroupi.jpeg';

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
    image: tchopshapImg,
    url: 'https://tchopshap.vercel.app/',
    technologies: ['React', 'Markdown', 'Vercel']
  },
  {
    title: 'AbAmAd',
    description: "Découvrez ce projet sur ma page Github.",
    image: abamadImg,
    url: 'https://gheobechoco.github.io/AbAmAd/',
    technologies: ['HTML', 'CSS', 'JavaScript']
  },
  {
    title: 'Mon Portfolio',
    description: "Découvrez mon portfolio déployé sur Vercel, présentant mes projets et compétences.",
    image: portfolioImg,
    url: 'https://vercel.com/gheobechocos-projects/my-portfolio',
    technologies: ['React', 'MUI', 'Framer Motion']
  },
  {
    title: 'Maquette Entreprise EDC PRO CONSULTING',
    description: "Découvrez la Maquette d EDC PRO Consulting un de nos Client actuel .",
    image: edcImg,
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
  {
    title: 'Mary Mediclinique',
    description: "Site web de la clinique Mary Mediclinique - présentation des services médicaux et prise de rendez-vous.",
    image: healthImg,
    url: 'https://www.mary-mediclinic.com/',
    technologies: ['React', 'MUI', 'Vercel']
  },
  {
    title: 'Gabon Talent Connect',
    description: "Plateforme de mise en relation professionnelle et d'emploi pour le Gabon.",
    image: portecvLogoImg,
    confidential: true,
    technologies: ['React', 'Vercel', 'UI']
  },
  {
    title: 'Portecv Premium',
    description: "Espace premium Portecv avec modèle de candidature et ressources professionnelles.",
    image: portecvStudentImg,
    url: 'https://portecv-premium-7eb646b1.vercel.app/',
    technologies: ['React', 'Design', 'Vercel']
  },
  {
    title: 'Zip Unzip Revive',
    description: "Application de gestion de fichiers pour zipper et dézipper rapidement.",
    image: zipUnzipImg,
    url: 'https://zip-unzip-revive.vercel.app/',
    technologies: ['React', 'Vercel', 'Productivité']
  },
  {
    title: 'EdelWeiss Logiciel – Maquette Figma',
    description: "Design complet d'un logiciel de gestion d'entreprise (ERP) : tableaux de bord, facturation, gestion RH, planning.",
    image: edelweissImg,
    url: 'https://www.figma.com/file/PGoHtdjBW1S8ACkOPdPA43/EdelWeiss-Logiciel?node-id=215-217',
    isFigma: true,
    technologies: ['Figma', 'UI/UX', 'Prototypage']
  },
  {
    title: 'PrimePrompt – Landing Page',
    description: "Design d'une landing page moderne pour PrimePrompt, outil d'IA générative.",
    image: primePromptImg,
    url: 'https://embed.figma.com/design/lD1sxLVQtlMAkBVrBm2Eix/PrimePrompt--Landing-Page?node-id=5-93&embed-host=share',
    technologies: ['Figma', 'UI/UX', 'Landing Page']
  },
  // NOUVEAUX PROJETS
  {
    title: 'Wedding Tatiana & Gheoffrey',
    description: "Site web de mariage élégant pour Tatiana et Gheoffrey. Design romantique avec animations fluides.",
    image: coupleBlancImg,
    url: 'https://wedding-tatiana-gheoffrey.vercel.app/',
    technologies: ['React', 'Framer Motion', 'Vercel']
  },
  {
    title: 'Ring Unveil',
    description: "Découvrez Ring Unveil - une expérience interactive pour découvrir les alliances.",
    image: coupleOrangeBleuImg,
    url: 'https://ring-unveil.vercel.app/',
    technologies: ['React', 'MUI', 'TypeScript', 'Vercel']
  },
  {
    title: 'Gab Booking Extension',
    description: "Extension de réservation pour le Gabon - plateforme de gestion de rendez-vous et de planning.",
    image: showGabImg,
    url: 'https://v0-show-gab-booking-extension-rose.vercel.app/',
    technologies: ['React', 'Vercel', 'Booking System']
  }
];

const ProjectsSection = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(cursorY, { damping: 20, stiffness: 300 });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { ref: gsapTitleRef, addAnimation: addTitleAnimation } = useGsapAnimation();
  const { ref: gsapCardsRef, addAnimation: addCardsAnimation } = useGsapAnimation();

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const c = containerRef.current;
    if (c) c.addEventListener('mousemove', handleMouseMove);
    return () => c && c.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  useEffect(() => {
    gsapTitleRef.current = titleRef.current;
    gsapCardsRef.current = containerRef.current;
    addTitleAnimation({ y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
    addCardsAnimation({ y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' });
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
        px: { xs: 2, sm: 4, md: 8, lg: 10 },
        py: { xs: 6, md: 10 },
      }}
    >
      {!isMobile && <ParticlesBackground mouseX={smoothX} mouseY={smoothY} />}

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
        animate={{ scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

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
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3.2rem' },
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

      <Grid
        ref={gsapCardsRef}
        container
        spacing={{ xs: 3, sm: 4, md: 5 }}
        justifyContent="center"
        sx={{
          position: 'relative',
          zIndex: 2,
          px: { xs: 1, sm: 2, md: 3 },
          pb: { xs: 6, md: 10 },
          maxWidth: '1400px',
          mx: 'auto',
        }}
      >
        {projects.map((proj) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={proj.title}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Card
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: 380 },
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
              {proj.isFigma ? (
                <Box sx={{ p: 2 }}>
                  <FigmaEmbed 
                    title={proj.title} 
                    embedUrl={proj.embedUrl}
                  />
                </Box>
              ) : (
                proj.image && (
                  <CardMedia
                    component="img"
                    image={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    sx={{
                      height: { xs: '150px', sm: '170px', md: '200px' },
                      objectFit: 'cover',
                      objectPosition: 'center top'
                    }}
                  />
                )
              )}

              <CardContent sx={{ p: { xs: 2, md: 3 }, flexGrow: 1 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#64ffda',
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                  }}
                >
                  {proj.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#8892b0',
                    mb: 3,
                    lineHeight: 1.6,
                    fontSize: { xs: '0.85rem', md: '1rem' }
                  }}
                >
                  {proj.description}
                </Typography>

                {proj.technologies && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="caption" sx={{ color: '#64ffda', fontWeight: 600, display: 'block', mb: 1 }}>
                      Technologies :
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                      {proj.technologies.map((tech, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            bgcolor: 'rgba(100, 255, 218, 0.1)',
                            borderRadius: '12px',
                            border: '1px solid rgba(100, 255, 218, 0.2)'
                          }}
                        >
                          <Typography variant="caption" sx={{ color: '#64ffda', fontSize: '0.7rem' }}>
                            {tech}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </CardContent>

              {proj.confidential ? (
                <CardActions sx={{ p: { xs: 2, md: 3 }, pt: 0, justifyContent: 'center' }}>
                  <Button
                    fullWidth
                    size="medium"
                    variant="outlined"
                    disabled
                    sx={{
                      color: '#64ffda',
                      borderColor: '#64ffda',
                      borderRadius: '8px',
                      py: 1,
                      fontWeight: 600,
                      opacity: 0.65,
                      cursor: 'default'
                    }}
                  >
                    Accès confidentiel
                  </Button>
                </CardActions>
              ) : proj.url ? (
                <CardActions sx={{ p: { xs: 2, md: 3 }, pt: 0, justifyContent: 'center' }}>
                  <Button
                    fullWidth
                    size="medium"
                    variant="outlined"
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#64ffda',
                      borderColor: '#64ffda',
                      borderRadius: '8px',
                      py: 1,
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: 'rgba(100, 255, 218, 0.1)',
                        borderColor: '#64ffda',
                        transform: 'scale(1.02)'
                      }
                    }}
                  >
                    {proj.isFigma ? 'Voir le design Figma' : 'Voir le projet'}
                  </Button>
                </CardActions>
              ) : null}
            </Card>
          </Grid>
        ))}
      </Grid>

      <SectionTransition />
    </Box>
  );
};

export default ProjectsSection;