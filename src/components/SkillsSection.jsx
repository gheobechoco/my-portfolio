import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';
import SectionTransition from './SectionTransition';

// Import des images depuis le dossier assets
import djangoImg from '../assets/django.png';
import bootstrapImg from '../assets/boostrap.jpg';

const skills = [
  { name: 'HTML5', level: 90, color: '#E34F26', icon: '/icons/skill-icons--html.svg' },
  { name: 'CSS3', level: 85, color: '#264DE4', icon: '/icons/devicon--css3.svg' },
  { name: 'JavaScript', level: 80, color: '#F0DB4F', icon: '/icons/fa-brands--js-square.svg' },
  { name: 'TypeScript', level: 70, color: '#3178C6', icon: '/icons/logos--typescript-icon.svg' },
  { name: 'React.js', level: 75, color: '#61DAFB', icon: '/icons/devicon--react.svg' },
  { name: 'Design (Figma)', level: 70, color: '#A259FF', icon: '/icons/devicon--figma.svg' },
  // Nouveaux ajouts avec les bonnes images
  { name: 'Python', level: 65, color: '#3776AB', icon: '/python.png' },
  { name: 'Bootstrap', level: 75, color: '#7952B3', icon: bootstrapImg },
  { name: 'Django', level: 60, color: '#092E20', icon: djangoImg }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

function SkillsSection() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        fontFamily: 'Poppins, sans-serif',
        bgcolor: 'transparent',
        px: { xs: 2, sm: 4, md: 8, lg: 10 },
        py: { xs: 6, md: 10 },
        zIndex: 0
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '300%',
          height: '300%',
          backgroundImage: 'radial-gradient(circle at center, rgba(100,255,218,0.05) 0%, transparent 70%)',
          zIndex: 0
        }}
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
      />

      <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 }, position: 'relative', zIndex: 1, pt: { xs: 4, md: 10 } }}>
        <Typography variant="h3" sx={{ fontWeight: 800, color: '#64ffda', mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}>
          Mes Compétences
        </Typography>
        <Divider sx={{ width: '80px', height: '4px', mx: 'auto', backgroundColor: '#64ffda', boxShadow: '0 0 15px #64ffda', borderRadius: '2px' }} />
      </Box>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Grid container spacing={{ xs: 3, sm: 4, md: 5 }} justifyContent="center">
          {skills.map((skill) => (
            <Grid key={skill.name} item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.07 }} style={{ width: '100%' }}>
                <Box
                  sx={{
                    bgcolor: '#112240',
                    p: { xs: 3, md: 4 },
                    borderRadius: '1rem',
                    boxShadow: `0 0 20px ${skill.color}66, 0 0 30px ${skill.color}44`,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.4s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 0 25px ${skill.color}, 0 0 40px ${skill.color}99`
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={skill.icon}
                    alt={skill.name}
                    sx={{ 
                      width: { xs: 60, md: 100 }, 
                      height: { xs: 30, md: 60 }, 
                      mb: 2, 
                      mx: 'auto',
                      objectFit: 'contain'
                    }}
                  />
                  <Typography variant="h6" sx={{ color: skill.color, fontWeight: 700, mb: 2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                    {skill.name}
                  </Typography>
                  <Box sx={{ height: 10, borderRadius: '6px', bgcolor: '#1c2b3a', overflow: 'hidden', mb: 1 }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      style={{ height: '100%', backgroundColor: skill.color }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: '#8892b0', fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                    {skill.level}%
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <SectionTransition />
    </Box>
  );
}

export default React.memo(SkillsSection);