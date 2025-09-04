// Import des composants
import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme/theme';

// Import des sections
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import FAQSection from './components/FAQSection'; // NOUVEAU
import Footer from './components/Footer';

// Import des utilitaires
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        background: 'linear-gradient(to bottom, #0a192f, #0a1a30, #0a192f)',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}>
        <LoadingScreen />
        <CustomCursor />
        <Navigation />
        
        {/* Sections dans l'ordre */}
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <SkillsSection />
        <ProjectsSection />
        <FAQSection /> {/* NOUVELLE SECTION */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;