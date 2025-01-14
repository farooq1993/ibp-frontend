// ButtonMui.js
import React from 'react';
import { Button } from '@mui/material';

const ButtonMui = ({ children, onClick }) => {
  return (
    <Button
    size='small'
      onClick={onClick}
      sx={{
        backgroundColor: 'rgb(255, 217, 151)', // Background color
        color: 'black', // Text color (black)
        '&:hover': {
          backgroundColor: 'rgb(255, 217, 151)', // Keeps the background color the same on hover
        },
        '&:active': {
          backgroundColor: 'rgba(255, 217, 151, 0.7)', // Light opacity when clicked
        },
        transition: 'background-color 0.2s ease', // Smooth transition for background color
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonMui;
