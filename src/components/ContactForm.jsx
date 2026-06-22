import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { TextField, Button, DialogActions, Box, CircularProgress, Typography } from '@mui/material';
import ConfettiCongrats from './ConfettiCongrats';

const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID;

export default function ContactForm({ onSuccess }) {
  if (!FORMSPREE_FORM_ID) {
    return (
      <Box sx={{ padding: 3, textAlign: 'center' }}>
        <Typography color="error" variant="h6">
          La configuration du formulaire n'est pas disponible.
        </Typography>
        <Typography>
          Ajoutez votre identifiant Formspree dans un fichier `.env` local avec la clé `VITE_FORMSPREE_FORM_ID`.
        </Typography>
      </Box>
    );
  }

  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);
  const [showConfetti, setShowConfetti] = useState(false);

  React.useEffect(() => {
    if (state.succeeded) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
    }
  }, [state.succeeded]);

  if (state.succeeded) {
    return (
      <Box sx={{ 
        padding: 3,
        textAlign: 'center',
        color: '#64ffda',
        position: 'relative',
        minHeight: 200
      }}>
        <ConfettiCongrats run={showConfetti} />
        <p style={{ fontSize: 32, margin: 0 }}>🎉 Merci pour votre message !</p>
        <p>Je vous répondrai dès que possible.</p>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          name="email"
          type="email"
          label="Votre email"
          fullWidth
          variant="outlined"
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              color: '#ccd6f6',
              '& fieldset': {
                borderColor: '#8892b0',
              },
              '&:hover fieldset': {
                borderColor: '#64ffda',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#8892b0',
            },
          }}
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />

        <TextField
          margin="dense"
          id="message"
          name="message"
          label="Votre message"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              color: '#ccd6f6',
              '& fieldset': {
                borderColor: '#8892b0',
              },
              '&:hover fieldset': {
                borderColor: '#64ffda',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#8892b0',
            },
          }}
          required
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />

        <DialogActions sx={{ px: 0, justifyContent: 'center' }}>
          <Button 
            type="submit" 
            disabled={state.submitting}
            sx={{
              color: '#64ffda',
              borderColor: '#64ffda',
              '&:hover': {
                bgcolor: 'rgba(100, 255, 218, 0.1)',
              },
            }}
          >
            {state.submitting ? (
              <CircularProgress size={24} sx={{ color: '#64ffda' }} />
            ) : (
              'Envoyer'
            )}
          </Button>
        </DialogActions>
      </form>
    </Box>
  );
}