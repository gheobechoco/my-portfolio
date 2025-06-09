import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { TextField, Button, DialogActions, Box, CircularProgress } from '@mui/material';

export default function ContactForm({ onSuccess }) {
  const [state, handleSubmit] = useForm("mnnpedla"); // votre ID Formspree

  if (state.succeeded) {
    return (
      <Box sx={{ 
        padding: 3,
        textAlign: 'center',
        color: '#64ffda'
      }}>
        <p>✅ Merci pour votre message !</p>
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