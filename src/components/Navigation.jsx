import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Button, useScrollTrigger, Slide } from '@mui/material';
import { motion } from 'framer-motion';

const sections = [
  { name: 'Accueil', id: 'home' },
  { name: 'À Propos', id: 'about' },
  { name: 'Services', id: 'services' },
  { name: 'Compétences', id: 'skills' },
  { name: 'Projets', id: 'projects' },
  { name: 'FAQ', id: 'faq' }, // ← NOUVEAU LIEN FAQ
  { name: 'Contact', id: 'contact' }
];

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HideOnScroll>
      <AppBar 
        sx={{ 
          backgroundColor: 'rgba(10, 25, 47, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(100, 255, 218, 0.1)',
          zIndex: 1000
        }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {sections.map((section) => (
              <motion.div
                key={section.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => scrollToSection(section.id)}
                  sx={{
                    color: activeSection === section.id ? '#64ffda' : '#ccd6f6',
                    fontWeight: activeSection === section.id ? 700 : 400,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: activeSection === section.id ? '100%' : '0%',
                      height: '2px',
                      backgroundColor: '#64ffda',
                      transform: 'translateX(-50%)',
                      transition: 'width 0.3s ease'
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}
                >
                  {section.name}
                </Button>
              </motion.div>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}