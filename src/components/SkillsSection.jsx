import React, { useState } from 'react';
import { Box, Typography, Divider, Grid, Slider } from '@mui/material';
import { motion } from 'framer-motion';
import SectionTransition from './SectionTransition';

const initialSkills = [
  {
    name: 'HTML5',
    level: 90,
    color: '#E34F26',
    icon: '/icons/skill-icons--html.svg',
  },
  {
    name: 'CSS3',
    level: 85,
    color: '#264DE4',
    icon: '/icons/devicon--css3.svg',
  },
  {
    name: 'JavaScript',
    level: 80,
    color: '#F0DB4F',
    icon: '/icons/fa-brands--js-square.svg',
  },
  {
    name: 'TypeScript',
    level: 70,
    color: '#3178C6',
    icon: '/icons/logos--typescript-icon.svg',
  },
  {
    name: 'React.js',
    level: 75,
    color: '#61DAFB',
    icon: '/icons/devicon--react.svg',
  },
  {
    name: 'Design (Figma)',
    level: 70,
    color: '#A259FF',
    icon: '/icons/devicon--figma.svg',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

export default function SkillsSection() {
  const [skills, setSkills] = useState(initialSkills);

  const handleLevelChange = (index) => (event, newValue) => {
    setSkills((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], level: newValue };
      return updated;
    });
  };

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
        px: { xs: 2, sm: 4, md: 12 },
        py: 0,
        zIndex: 0,
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '300%',
          height: '300%',
          backgroundImage:
            'radial-gradient(circle at center, rgba(100,255,218,0.05) 0%, transparent 70%)',
          zIndex: 0,
        }}
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
      />

      <Box sx={{ textAlign: 'center', mb: 10, position: 'relative', zIndex: 1, pt: 10 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: '#64ffda',
            mb: 1,
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          Mes Compétences
        </Typography>
        <Divider
          sx={{
            width: '80px',
            height: '4px',
            mx: 'auto',
            backgroundColor: '#64ffda',
            boxShadow: '0 0 15px #64ffda',
            borderRadius: '2px',
          }}
        />
      </Box>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Grid container spacing={{ xs: 4, md: 6 }} justifyContent="center">
          {skills.map((skill, index) => (
            <Grid key={skill.name} item xs={12} sm={6} md={4} lg={3}>
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
                      boxShadow: `0 0 25px ${skill.color}, 0 0 40px ${skill.color}99`,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={skill.icon}
                    alt={skill.name}
                    sx={{ width: { xs: 100, md: 150 }, height: { xs: 40, md: 60 }, mb: 3, mx: 'auto' }}
                  />

                  <Typography
                    variant="h6"
                    sx={{ color: skill.color, fontWeight: 700, mb: 3 }}
                  >
                    {skill.name}
                  </Typography>

                  <Box
                    sx={{
                      height: 12,
                      borderRadius: '6px',
                      bgcolor: '#1c2b3a',
                      overflow: 'hidden',
                      mb: 1,
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      style={{
                        height: '100%',
                        backgroundColor: skill.color,
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: '#8892b0', mb: 2 }}>
                    {skill.level}%
                  </Typography>

                  <Slider
                    value={skill.level}
                    onChange={handleLevelChange(index)}
                    aria-label={`${skill.name} niveau`}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    sx={{
                      color: skill.color,
                      mt: 2,
                      '& .MuiSlider-rail': {
                        opacity: 0.25,
                        backgroundColor: '#ffffff',
                      },
                    }}
                  />
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
