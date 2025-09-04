import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(cursorY, { damping: 20, stiffness: 300 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };

    const handleMouseEnter = () => setIsPointer(true);
    const handleMouseLeave = () => setIsPointer(false);
    const handleMouseDown = () => setIsPointer(true);
    const handleMouseUp = () => setIsPointer(false);

    document.addEventListener('mousemove', moveCursor);
    
    // Hide cursor when not moving
    let timeout;
    const handleMouseStop = () => {
      setIsHidden(true);
    };
    
    const resetTimeout = () => {
      setIsHidden(false);
      clearTimeout(timeout);
      timeout = setTimeout(handleMouseStop, 2000);
    };

    document.addEventListener('mousemove', resetTimeout);

    // Add pointer detection
    const clickables = document.querySelectorAll('a, button, [role="button"]');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
      el.addEventListener('mousedown', handleMouseDown);
      el.addEventListener('mouseup', handleMouseUp);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousemove', resetTimeout);
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.removeEventListener('mousedown', handleMouseDown);
        el.removeEventListener('mouseup', handleMouseUp);
      });
    };
  }, [cursorX, cursorY]);

  if (typeof window === 'undefined') return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: smoothX,
        top: smoothY,
        width: isPointer ? 40 : 16,
        height: isPointer ? 40 : 16,
        backgroundColor: isPointer ? 'transparent' : '#64ffda',
        border: isPointer ? '2px solid #64ffda' : 'none',
        borderRadius: isPointer ? '50%' : '50%',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: isHidden ? 0 : 1,
        transition: 'opacity 0.3s ease'
      }}
      animate={{
        scale: isPointer ? 0.5 : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    />
  );
}