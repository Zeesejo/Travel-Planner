import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Create high-contrast navigation buttons with forced white text
const NavButton = styled(Button)`
  background-color: transparent; /* Transparent background */
  color: white !important; /* White text with !important to override any other styling */
  margin: 0 8px;
  padding: 6px 16px;
  border-radius: 0; /* Remove rounded corners */
  font-weight: 700; /* Bolder text */
  border: 2px solid white; /* White border for extra definition */
  
  & .MuiButton-label {
    color: white !important; /* Explicitly target the button label text */
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2); /* Slight white background on hover */
    box-shadow: 0 3px 6px rgba(0,0,0,0.3);
  }
`;

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Trip Planner
        </Typography>
        
        <Box sx={{ display: 'flex', ml: 'auto' }}>
          <NavButton component={Link} to="/">
            Home
          </NavButton>
          <NavButton component={Link} to="/plan">
            Plan a Trip
          </NavButton>
          <NavButton component={Link} to="/trips">
            My Trips
          </NavButton>
          <NavButton component={Link} to="/about">
            About
          </NavButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;