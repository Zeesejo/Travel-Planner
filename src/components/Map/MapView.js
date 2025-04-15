import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';

const MapContainer = styled(Paper)`
  height: 500px;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
`;

const MapPlaceholder = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #E8F5E9, #C8E6C9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 5;
`;

const LocationsList = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 16px;
  z-index: 10;
`;

const LocationItem = styled(Box)`
  padding: 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

// Updated to use Google Maps API
const MapView = ({ locations = [], zoom = 11 }) => {
  // Default center point (world map center)
  const defaultCenter = { lat: 20, lng: 0 };
  
  // If we have locations, center the map on the first location
  const mapCenter = locations.length > 0 ? 
    { lat: locations[0].lat, lng: locations[0].lng } : 
    defaultCenter;
  
  // Calculate appropriate zoom level based on number of locations
  const calculateZoom = () => {
    if (locations.length === 0) return 1;  // World view
    if (locations.length === 1) return 11; // City view
    return zoom; // Use provided zoom or default
  };

  return (
    <MapContainer elevation={3}>
      {locations.length === 0 ? (
        <MapPlaceholder>
          <LocationOnIcon sx={{ fontSize: 60, color: '#3f51b5', mb: 2 }} />
          <Typography variant="h6" gutterBottom>No destinations added</Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            Search and add destinations to see them on the map
          </Typography>
        </MapPlaceholder>
      ) : (
        <>
          {/* Google Map Component */}
          <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ 
                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY 
              }}
              defaultCenter={mapCenter}
              center={mapCenter}
              defaultZoom={calculateZoom()}
              options={{
                fullscreenControl: false,
                zoomControl: true,
                mapTypeControl: true
              }}
            >
              {/* Map Markers */}
              {locations.map((location, index) => (
                <LocationMarker
                  key={index}
                  lat={location.lat}
                  lng={location.lng}
                  text={location.name}
                  color={index === 0 ? '#FF5A5F' : '#2E7D32'}
                />
              ))}
            </GoogleMapReact>
          </div>
        </>
      )}

      {locations.length > 0 && (
        <LocationsList>
          <Typography variant="subtitle1" gutterBottom>Destinations</Typography>
          <Divider sx={{ mb: 1 }} />
          {locations.map((location, index) => (
            <LocationItem key={index}>
              <LocationOnIcon color="error" sx={{ mr: 1 }} />
              <Box>
                <Typography variant="body2" fontWeight="medium">{location.name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {location.vicinity || 'No additional information'}
                </Typography>
              </Box>
            </LocationItem>
          ))}
        </LocationsList>
      )}
    </MapContainer>
  );
};

export default MapView;
