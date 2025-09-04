import { Box, Typography, Grid, Paper, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import SectionTransition from './SectionTransition';

const stats = [
  { number: '2+', label: 'Années d\'expérience' },
  { number: '3+', label: 'Projets réalisés' },
  { number: '5+', label: 'Technologies maîtrisées' },
  { number: '100%', label: 'Satisfaction client' }
];

const skills = [
  'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 
  'Material-UI', 'Framer Motion', 'Figma', 'Git', 'Vercel'
];

export default function AboutSection() {
  return (
    <Box
      id="about"
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        bgcolor: 'transparent',
        px: { xs: 3, md: 6 },
        py: { xs: 8, md: 12 },
        overflow: 'hidden'
      }}
    >
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              sx={{
                color: '#64ffda',
                mb: 3,
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' }
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
                fontSize: '1.1rem'
              }}
            >
              Passionné par le développement frontend depuis plus de 2 ans, 
              je crée des expériences web modernes et engageantes. 
              Mon expertise couvre React, TypeScript et les animations interactives.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Chip
                    label={skill}
                    sx={{
                      bgcolor: 'rgba(100, 255, 218, 0.1)',
                      color: '#64ffda',
                      border: '1px solid rgba(100, 255, 218, 0.3)'
                    }}
                  />
                </motion.div>
              ))}
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
            <Grid container spacing={3}>
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
                        p: 3,
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
                          mb: 1
                        }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: '#8892b0' }}
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