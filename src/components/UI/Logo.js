import React from 'react';
import { Box, Typography } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import styled from 'styled-components';

const LogoContainer = styled(Box)`
  display: flex;
  align-items: center;
  z-index: 1200; /* Ensure logo appears above other elements */
`;

const LogoIcon = styled(TravelExploreIcon)`
  font-size: 28px;
  color: #FF6F00;
  margin-right: 8px;
`;

const LogoText = styled(Typography)`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
`;

const Logo = ({ variant = "h5", darkMode = false }) => {
  return (
    <LogoContainer>
      <LogoIcon />
      <LogoText variant={variant} style={{ color: darkMode ? '#1B5E20' : 'white' }}>
        WanderWise
      </LogoText>
    </LogoContainer>
  );
};

export default Logo;
