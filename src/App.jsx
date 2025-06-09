import { Box } from '@mui/material';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';   
import SkillsSection from './components/SkillsSection'; 
import ProjectsSection from './components/ProjectsSection'; 
import Footer from './components/Footer';

function App() {
  return (
    <Box sx={{ 
      overflowX: 'hidden',
      background: 'linear-gradient(to bottom, #0a192f, #0a1a30, #0a192f)',
      backgroundAttachment: 'fixed',
      fontSize: { xs: '14px', sm: '16px' } // Taille de police responsive
    }}>
      <HeroSection />
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection />
      <Footer />
    </Box>
  );
}

export default App;