import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';   
import SkillsSection from './components/SkillsSection'; 
import ProjectsSection from './components/ProjectsSection'; 
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
function App() {
  return (
    <div>
      <HeroSection />
      <StorySection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      {/* Ajoutez d'autres sections ici si nécessaire */}
    </div>
  );
}

export default App;
