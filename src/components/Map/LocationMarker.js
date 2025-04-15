import React from 'react';
import styled from 'styled-components';
import RoomIcon from '@mui/icons-material/Room';
import { Tooltip } from '@mui/material';

const MarkerContainer = styled.div`
  position: absolute;
  transform: translate(-50%, -100%);
  cursor: pointer;
  z-index: 1;
  
  &:hover {
    z-index: 2;
  }
`;

const StyledMarker = styled(RoomIcon)`
  font-size: 2rem;
  transition: transform 0.2s ease;
  filter: drop-shadow(0 2px 5px rgba(0,0,0,0.3));
  
  &:hover {
    transform: scale(1.2);
  }
`;

const LocationMarker = ({ text, color = '#FF5A5F' }) => {
  return (
    <MarkerContainer>
      <Tooltip title={text} arrow placement="top">
        <StyledMarker style={{ color }} />
      </Tooltip>
    </MarkerContainer>
  );
};

export default LocationMarker;
