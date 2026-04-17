import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';

export default function DraggableAvatar({
  src,
  size = { xs: 80, sm: 100, md: 120 },
  borderSize = 2,
  borderColor = '#64ffda',
}) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [mouseStart, setMouseStart] = useState({ x: 0, y: 0 });
  const [imgStart, setImgStart] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setMouseStart({ x: e.clientX, y: e.clientY });
    setImgStart({ x: position.x, y: position.y });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    e.preventDefault();
    const deltaX = e.clientX - mouseStart.x;
    const deltaY = e.clientY - mouseStart.y;

    let newX = imgStart.x + deltaX;
    let newY = imgStart.y + deltaY;

    const container = containerRef.current;
    if (container) {
      const cRect = container.getBoundingClientRect();
      const imgEl = container.querySelector('img');
      if (imgEl) {
        const iW = imgEl.naturalWidth * scale;
        const iH = imgEl.naturalHeight * scale;

        // Calcul des limites basées sur le zoom
        const maxX = Math.max(0, (iW - cRect.width) / 2);
        const maxY = Math.max(0, (iH - cRect.height) / 2);
        const minX = -maxX;
        const minY = -maxY;

        newX = Math.max(minX, Math.min(maxX, newX));
        newY = Math.max(minY, Math.min(maxY, newY));
      }
    }

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    if (dragging) setDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const newScale = e.deltaY < 0 ? scale * 1.1 : scale * 0.9;
    setScale(Math.max(0.5, Math.min(3, newScale)));
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setScale(1);
    setRotation(0);
  };

  const rotateImage = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <Box
      ref={containerRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      sx={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        border: `${borderSize}px solid ${borderColor}`,
        cursor: dragging ? 'grabbing' : 'grab',
        marginTop: '70px', // Espace pour la navbar
        '@media (max-width: 600px)': {
          width: 60,
          height: 60,
          marginLeft: 0,
          marginTop: '60px',
        },
        '&:hover .avatar-controls': {
          opacity: 1,
        }
      }}
      onWheel={handleWheel}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
          width: '100%',
          height: '100%',
        }}
        drag={false}
      >
        <Box
          component="img"
          src={src}
          alt="Avatar"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
          draggable={false}
          onMouseDown={handleMouseDown}
        />
      </motion.div>

      {/* Contrôles d'ajustement */}
      <Box
        className="avatar-controls"
        sx={{
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.3s ease',
          backgroundColor: 'rgba(10, 25, 47, 0.8)',
          borderRadius: '20px',
          padding: '4px',
          zIndex: 10,
        }}
      >
        <IconButton
          size="small"
          onClick={() => setScale(prev => Math.min(3, prev * 1.2))}
          sx={{ color: '#64ffda', '&:hover': { backgroundColor: 'rgba(100, 255, 218, 0.1)' } }}
        >
          <ZoomInIcon fontSize="small" />
        </IconButton>
        
        <IconButton
          size="small"
          onClick={() => setScale(prev => Math.max(0.5, prev * 0.8))}
          sx={{ color: '#64ffda', '&:hover': { backgroundColor: 'rgba(100, 255, 218, 0.1)' } }}
        >
          <ZoomOutIcon fontSize="small" />
        </IconButton>
        
        <IconButton
          size="small"
          onClick={rotateImage}
          sx={{ color: '#64ffda', '&:hover': { backgroundColor: 'rgba(100, 255, 218, 0.1)' } }}
        >
          <RotateLeftIcon fontSize="small" />
        </IconButton>
        
        <IconButton
          size="small"
          onClick={resetPosition}
          sx={{ color: '#64ffda', '&:hover': { backgroundColor: 'rgba(100, 255, 218, 0.1)' } }}
        >
          <CenterFocusStrongIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Indicateur de zoom */}
      {scale !== 1 && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(10, 25, 47, 0.8)',
            color: '#64ffda',
            borderRadius: '12px',
            padding: '4px 8px',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          {Math.round(scale * 100)}%
        </Box>
      )}
    </Box>
  );
}