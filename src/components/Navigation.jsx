import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Button, useScrollTrigger, Slide, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    setDrawerOpen(false);
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
        <Toolbar sx={{ justifyContent: isMobile ? 'space-between' : 'center' }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {!isMobile && (
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
          )}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            sx={{
              '& .MuiDrawer-paper': {
                backgroundColor: 'rgba(10, 25, 47, 0.98)',
                color: '#ccd6f6',
                width: 240,
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
              <IconButton onClick={() => setDrawerOpen(false)} color="inherit">
                <CloseIcon />
              </IconButton>
            </Box>
            <List>
              {sections.map((section) => (
                <ListItem key={section.id} disablePadding>
                  <ListItemButton onClick={() => scrollToSection(section.id)} selected={activeSection === section.id}>
                    <ListItemText primary={section.name} sx={{
                      color: activeSection === section.id ? '#64ffda' : '#ccd6f6',
                      fontWeight: activeSection === section.id ? 700 : 400
                    }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}