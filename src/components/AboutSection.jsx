import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';
import SectionTransition from './SectionTransition';

const stats = [
  { number: '2+', label: "Années d'expérience" },
  { number: '3+', label: 'Projets réalisés' },
  { number: '5+', label: 'Technologies maîtrisées' },
  { number: '100%', label: 'Satisfaction client' }
];

const skills = [
  'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 
  'Material-UI', 'Framer Motion', 'Figma', 'Git', 'Vercel'
];

function AboutSection() {
  return (
    <Box
      id="about"
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        bgcolor: 'transparent',
        px: { xs: 2, sm: 4, md: 8, lg: 10 },
        py: { xs: 6, md: 10 },
        overflow: 'hidden'
      }}
    >
      <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
              <Typography
                variant="h2"
                sx={{
                  color: '#64ffda',
                  mb: 3,
                  fontWeight: 700,
                  fontSize: { xs: '2rem', sm: '2.8rem', md: '3.5rem' },
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                À Propos de Moi
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  color: '#8892b0',
                  lineHeight: 1.8,
                  mb: 4,
                  fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                Passionné par le développement frontend depuis plus de 2 ans, 
                je crée des expériences web modernes et engageantes. 
                Mon expertise couvre React, TypeScript et les animations interactives.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' }, mb: 4 }}>
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Chip
                      label={skill}
                      sx={{
                        bgcolor: 'rgba(100, 255, 218, 0.1)',
                        color: '#64ffda',
                        border: '1px solid rgba(100, 255, 218, 0.3)',
                        fontSize: { xs: '0.7rem', sm: '0.8rem' }
                      }}
                    />
                  </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {stats.map((stat, index) => (
                <Grid item xs={6} key={stat.label}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    <Paper
                      sx={{
                        p: { xs: 2, md: 3 },
                        textAlign: 'center',
                        bgcolor: '#112240',
                        border: '1px solid rgba(100, 255, 218, 0.1)',
                        borderRadius: '16px'
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          color: '#64ffda',
                          fontWeight: 700,
                          mb: 1,
                          fontSize: { xs: '2rem', md: '3rem' }
                        }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: '#8892b0', fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}
                      >
                        {stat.label}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Grid>
      </Grid>

      <SectionTransition />
    </Box>
  );
}

export default React.memo(AboutSection);