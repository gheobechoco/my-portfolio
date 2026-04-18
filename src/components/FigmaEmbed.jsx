import React from 'react';
import { Box } from '@mui/material';

const FigmaEmbed = ({ 
  title = 'Maquette Figma', 
  embedUrl, 
  figmaFileUrl 
}) => {
  let finalEmbedUrl = embedUrl;

  if (!finalEmbedUrl && figmaFileUrl) {
    const encodedUrl = encodeURIComponent(figmaFileUrl);
    finalEmbedUrl = `https://www.figma.com/embed?embed_host=share&url=${encodedUrl}`;
  } else if (!finalEmbedUrl) {
    const defaultUrl = 'https://www.figma.com/file/PGoHtdjBW1S8ACkOPdPA43/EdelWeiss-Logiciel?node-id=215-217';
    const encodedDefault = encodeURIComponent(defaultUrl);
    finalEmbedUrl = `https://www.figma.com/embed?embed_host=share&url=${encodedDefault}`;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
        borderRadius: '12px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0 0 20px rgba(100,255,218,0.2)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 0 30px rgba(100,255,218,0.4)',
        },
      }}
    >
      <iframe
        src={finalEmbedUrl}
        title={title}
        allowFullScreen
        allow="clipboard-write; clipboard-read"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '12px',
        }}
      />
    </Box>
  );
};

export default FigmaEmbed;