import React from 'react';
import { Box, Typography, Divider, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { motion } from 'framer-motion';

// Remplace par tes propres projets GitHub
const projects = [
  {
    title: 'TchopShap',
    description: "Un blog développé avec React et Markdown",
    image: 'public/tchopshap.png',
    url: 'https://tchopshap.vercel.app/'
  },
  {
    title: 'Aspish',
    description: "Une boutique en ligne avec panier et paiement",
    image: 'public/aspish.png',
    url: 'https://aspish2-0.vercel.app/'
  }
];

const ProjectsSection = () => (
  <Box
    component="section"
    sx={{
      position: 'relative',
      width: '100vw',
      minHeight: '100vh',
      bgcolor: '#0a192f',
      overflow: 'hidden',
      fontFamily: 'Poppins, sans-serif',
      cursor: 'url(/cursor.svg), auto',
      padding: '2rem 0',  // Ajout d'un peu de padding pour un espacement uniforme
    }}
  >
    {/* Fond numérique animé */}
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '200%',
        height: '200%',
        backgroundImage: 'linear-gradient(to right, rgba(100,255,218,0.05) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        zIndex: 0
      }}
      animate={{ backgroundPositionX: ['0px', '1000px'] }}
      transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
    />

    {/* Titre */}
    <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', py: 8 }}>
      <Typography variant="h3" sx={{ fontWeight: 800, color: '#64ffda', mb: 1 }}>
        Mes Projets
      </Typography>
      <Divider
        sx={{
          width: '80px',
          height: '4px',
          mx: 'auto',
          backgroundColor: '#64ffda',
          boxShadow: '0 0 10px #64ffda',
          borderRadius: '2px'
        }}
      />
    </Box>

    {/* Cartes de projets */}
    <Grid container rowSpacing={6} columnSpacing={4} justifyContent="center" sx={{ position: 'relative', zIndex: 1, px: { xs: 4, md: 10 }, pb: 10 }}>
      {projects.map((proj) => (
        <Grid key={proj.title} item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: '#112240', color: '#ccd6f6', borderRadius: '1rem', boxShadow: '0 0 10px #000' }}>
            {proj.image && (
              <CardMedia component="img" height="180" image={proj.image} alt={proj.title} sx={{ borderRadius: '1rem 1rem 0 0' }} />
            )}
            <CardContent>
              <Typography variant="h6" sx={{ color: '#64ffda', fontWeight: 600, mb: 1 }}>
                {proj.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#8892b0' }}>
                {proj.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="outlined"
                href={proj.url}
                target="_blank"
                sx={{ color: '#64ffda', borderColor: '#64ffda' }}
              >
                Voir sur GitHub
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default ProjectsSection;
