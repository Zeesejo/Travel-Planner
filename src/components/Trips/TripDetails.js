import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, 
  Divider, List, ListItem, ListItemText, Chip, Paper, Container } from '@mui/material';
import { Place, CalendarToday, DirectionsCar, ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MapView from '../Map/MapView';
import { useTrip } from '../../context/TripContext';
import styled from 'styled-components';

const DetailSection = styled(Box)`
  margin-bottom: 16px;
`;

const MapContainer = styled(Box)`
  height: 300px;
  margin: 16px 0;
`;

const ActivityChip = styled(Chip)`
  margin-right: 4px;
  margin-bottom: 4px;
`;

const PageHeader = styled(Box)`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
`;

const BackButton = styled(Button)`
  margin-right: 16px;
`;

const TripDetails = ({ trip: propTrip, open, onClose }) => {
  const { tripId } = useParams();
  const { getTrip } = useTrip();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(propTrip || null);
  
  // If opened as a page (with URL parameter)
  useEffect(() => {
    if (tripId && !trip) {
      const fetchedTrip = getTrip(tripId);
      if (fetchedTrip) {
        setTrip(fetchedTrip);
      } else {
        // Trip not found, redirect to trips list
        navigate('/trips');
      }
    }
  }, [tripId, getTrip, navigate, trip]);
  
  // If no trip data, show nothing
  if (!trip) {
    return null;
  }
  
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const totalDays = trip.destinations.reduce(
    (sum, dest) => sum + (dest.duration || 1), 0
  );
  
  const mapLocations = trip.destinations.map(dest => ({
    lat: dest.lat,
    lng: dest.lng,
    name: dest.name
  }));
  
  // Render as a dialog if opened from My Trips
  if (open !== undefined) {
    return (
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" component="span">
            {trip.name}
          </Typography>
        </DialogTitle>
        
        <DialogContent dividers>
          <DetailSection display="flex" alignItems="center">
            <CalendarToday fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body1">
              {formatDate(trip.startDate)} to {formatDate(trip.endDate)} 
              ({totalDays} {totalDays === 1 ? 'day' : 'days'})
            </Typography>
          </DetailSection>
          
          <MapContainer>
            <MapView locations={mapLocations} />
          </MapContainer>
          
          <DetailSection>
            <Typography variant="h6" gutterBottom>Itinerary</Typography>
            <List disablePadding>
              {trip.destinations.map((dest, index) => (
                <Box key={dest.id}>
                  <ListItem alignItems="flex-start" disableGutters>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center">
                          <Place color="primary" fontSize="small" sx={{ mr: 1 }} />
                          <Typography variant="subtitle1">
                            {dest.name}
                          </Typography>
                          <Chip 
                            label={`${dest.duration} ${dest.duration === 1 ? 'day' : 'days'}`}
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="textSecondary" paragraph>
                            {dest.vicinity || dest.formatted_address || 'No location details'}
                          </Typography>
                          
                          {dest.activities && dest.activities.length > 0 && (
                            <Box mt={1}>
                              <Typography variant="body2" color="textSecondary" gutterBottom>
                                Activities:
                              </Typography>
                              <Box display="flex" flexWrap="wrap">
                                {dest.activities.map((activity) => (
                                  <ActivityChip 
                                    key={activity.id} 
                                    label={activity.name} 
                                    size="small" 
                                    variant="outlined"
                                  />
                                ))}
                              </Box>
                            </Box>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                  {index < trip.destinations.length - 1 && (
                    <Box pl={2} py={1}>
                      <Box display="flex" alignItems="center">
                        <DirectionsCar color="action" fontSize="small" />
                        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                        <Typography variant="body2" color="textSecondary">
                          Travel to next destination
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
            </List>
          </DetailSection>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button color="primary">
            Export Itinerary
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  // Otherwise, render as a page
  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <PageHeader>
          <BackButton 
            startIcon={<ArrowBack />} 
            component={Link} 
            to="/trips"
          >
            Back to My Trips
          </BackButton>
          <Typography variant="h4" component="h1">
            {trip.name}
          </Typography>
        </PageHeader>
        
        <DetailSection display="flex" alignItems="center">
          <CalendarToday fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body1">
            {formatDate(trip.startDate)} to {formatDate(trip.endDate)} 
            ({totalDays} {totalDays === 1 ? 'day' : 'days'})
          </Typography>
        </DetailSection>
        
        <MapContainer>
          <MapView locations={mapLocations} />
        </MapContainer>
        
        <DetailSection>
          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Itinerary</Typography>
          <List disablePadding>
            {trip.destinations.map((dest, index) => (
              <Box key={dest.id}>
                <ListItem alignItems="flex-start" disableGutters>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center">
                        <Place color="primary" fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="subtitle1">
                          {dest.name}
                        </Typography>
                        <Chip 
                          label={`${dest.duration} ${dest.duration === 1 ? 'day' : 'days'}`}
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="textSecondary" paragraph>
                          {dest.vicinity || dest.formatted_address || 'No location details'}
                        </Typography>
                        
                        {dest.activities && dest.activities.length > 0 && (
                          <Box mt={1}>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                              Activities:
                            </Typography>
                            <Box display="flex" flexWrap="wrap">
                              {dest.activities.map((activity) => (
                                <ActivityChip 
                                  key={activity.id} 
                                  label={activity.name} 
                                  size="small" 
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                          </Box>
                        )}
                      </>
                    }
                  />
                </ListItem>
                {index < trip.destinations.length - 1 && (
                  <Box pl={2} py={1}>
                    <Box display="flex" alignItems="center">
                      <DirectionsCar color="action" fontSize="small" />
                      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                      <Typography variant="body2" color="textSecondary">
                        Travel to next destination
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </List>
        </DetailSection>
        
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button 
            variant="outlined" 
            color="primary"
            sx={{ mr: 2 }}
          >
            Export Itinerary
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            component={Link}
            to="/plan"
          >
            Create New Trip
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TripDetails;
