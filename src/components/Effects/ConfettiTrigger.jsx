import React from 'react';
import Button from '@mui/material/Button';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { celebrationBurst } from './AutoConfetti';

const ConfettiTrigger = ({ label = 'Celebrate!' }) => (
  <Button 
    variant="contained" 
    color="secondary" 
    onClick={() => celebrationBurst(1000)} 
    startIcon={<CelebrationIcon />}
  >
    {label}
  </Button>
);

export default ConfettiTrigger;
