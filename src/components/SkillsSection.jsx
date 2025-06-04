import React from 'react';
import { Box, Typography, Divider, Grid } from '@mui/material';
import { motion } from 'framer-motion';

// Icônes SVG dans /public/icons/
const skills = [
  { name: 'HTML5', level: 90, color: '#E34F26', icon: 'public/icons/skill-icons--html.svg' },
  { name: 'CSS3', level: 85, color: '#264DE4', icon: 'public/icons/devicon--css3.svg' },
  { name: 'JavaScript', level: 80, color: '#F0DB4F', icon: 'public/icons/fa-brands--js-square.svg' },
  { name: 'React.js', level: 75, color: '#61DAFB', icon: 'public/icons/devicon--react.svg' },
  { name: 'Design (Figma)', level: 70, color: '#A259FF', icon: 'public/icons/devicon--figma.svg' }
];

// Animations
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

const SkillsSection = () => (
  <Box
    component="section"
    sx={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      fontFamily: 'Poppins, sans-serif',
      bgcolor: '#0a192f',
      px: { xs: 2, sm: 6, md: 12 },
      py: { xs: 6, md: 10 },
      zIndex: 0
    }}
  >
    {/* Arrière-plan animé */}
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

    {/* Titre */}
    <Box sx={{ textAlign: 'center', mb: 10, position: 'relative', zIndex: 1 }}>
      <Typography variant="h3" sx={{ fontWeight: 800, color: '#64ffda', mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}>
        Mes Compétences
      </Typography>
      <Divider sx={{
        width: '80px', height: '4px', mx: 'auto',
        backgroundColor: '#64ffda', boxShadow: '0 0 15px #64ffda', borderRadius: '2px'
      }} />
    </Box>

    {/* Grille des compétences */}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      style={{ position: 'relative', zIndex: 1 }}
    >
      <Grid
        container
        spacing={{ xs: 4, md: 6 }}
        justifyContent="center"
      >
        {skills.map((skill) => (
          <Grid key={skill.name} item xs={14} sm={6} md={4} lg={3}>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.07 }}>
              <Box
                sx={{
                  bgcolor: '#112240',
                  p: 4,
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
                <Box component="img" src={skill.icon} alt={skill.name} sx={{ width: 150, height: 60, mb: 3, mx: 'auto' }} />
                <Typography variant="h6" sx={{ color: skill.color, fontWeight: 700, mb: 3 }}>
                  {skill.name}
                </Typography>

                <Box sx={{ height: 12, borderRadius: '6px', bgcolor: '#1c2b3a', overflow: 'hidden', mb: 1 }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    style={{ height: '100%', backgroundColor: skill.color }}
                  />
                </Box>
                <Typography variant="body2" sx={{ color: '#8892b0' }}>
                  {skill.level}%
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  </Box>
);

export default SkillsSection;
