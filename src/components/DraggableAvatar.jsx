import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';

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
        const iRect = imgEl.getBoundingClientRect();
        const cW = cRect.width;
        const cH = cRect.height;
        const iW = iRect.width;
        const iH = iRect.height;

        if (iW > cW) {
          if (newX > 0) newX = 0;
          if (newX < cW - iW) newX = cW - iW;
        } else {
          newX = 0;
        }

        if (iH > cH) {
          if (newY > 0) newY = 0;
          if (newY < cH - iH) newY = cH - iH;
        } else {
          newY = 0;
        }
      }
    }

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    if (dragging) setDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });

  return (
      <Box
        ref={containerRef}
        onMouseDown={handleMouseDown}
        sx={{
          position: 'relative',
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          border: `${borderSize}px solid ${borderColor}`,
          cursor: dragging ? 'grabbing' : 'grab',
          '@media (max-width: 600px)': {
            width: 60,
            height: 60,
            marginLeft: 20, 
          }
        }}
      >
        <Box
          component="img"
          src={src}
          alt="Avatar"
          sx={{
            position: 'absolute',
            top: position.y,
            left: position.x,
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Nouvelle propriété pour mieux adapter l'image
            userSelect: 'none',
            pointerEvents: 'none',
          }}
          draggable={false}
        />
      </Box>
  );
}