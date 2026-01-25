import React from 'react';
import Confetti from 'react-confetti';

export default function ConfettiCongrats({ run }) {
  if (!run) return null;
  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      numberOfPieces={200}
      recycle={false}
      gravity={0.2}
    />
  );
}
