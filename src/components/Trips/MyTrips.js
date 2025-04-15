import React, { useState } from 'react';
import { Typography, Grid, Card, CardContent, CardActions, Button, Dialog, 
  DialogActions, DialogContent, DialogTitle, Box, Chip, CardMedia, Avatar, Divider } from '@mui/material';
import { Delete, Place, CalendarToday, DirectionsWalk, FlightTakeoff, Public } from '@mui/icons-material';
import { useTrip } from '../../context/TripContext';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageHeader = styled(Box)`
  margin-bottom: 40px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: #2E7D32;
  }
`;

const EmptyState = styled(Box)`
  text-align: center;
  padding: 60px 20px;
  background-color: rgba(46, 125, 50, 0.05);
  border-radius: 16px;
  border: 1px dashed rgba(46, 125, 50, 0.3);
`;

const TripCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
  }
`;

const CardMediaStyled = styled(CardMedia)`
  height: 160px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
  }
`;

const TripInfo = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  color: white;
  z-index: 2;
`;

const CardContentStyled = styled(CardContent)`
  flex-grow: 1;
  padding-top: 16px;
`;

const CardActionsStyled = styled(CardActions)`
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
  justify-content: space-between;
`;

const DateChip = styled(Chip)`
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: 16px;
`;

const InfoItem = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const InfoText = styled(Typography)`
  margin-left: 10px;
`;

// Function to get a background image based on trip destinations
const getTripImage = (destinations) => {
  // Default images if no destinations
  const defaultImages = [
    'https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80',
    'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80',
    'https://images.unsplash.com/photo-1473951574080-01fe45ec8643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80'
  ];
  
  if (!destinations || destinations.length === 0) {
    return defaultImages[Math.floor(Math.random() * defaultImages.length)];
  }
  
  // Map of common destination keywords to images
  const destinationImages = {
    'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2173&q=80',
    'tokyo': 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2736&q=80',
    'london': 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2592&q=80',
    'sydney': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2850&q=80',
    'bangkok': 'https://images.unsplash.com/photo-1508009603885-9002a61a57e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'cairo': 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'rio': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'amsterdam': 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'barcelona': 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'city': 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2944&q=80',
    'beach': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2946&q=80',
    'mountain': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80'
  };
  
  // Check if any destination name contains a keyword
  for (const destination of destinations) {
    const name = destination.name.toLowerCase();
    for (const [keyword, image] of Object.entries(destinationImages)) {
      if (name.includes(keyword)) {
        return image;
      }
    }
  }
  
  // If no match, return a random default image
  return defaultImages[Math.floor(Math.random() * defaultImages.length)];
};

const MyTrips = () => {
  const { trips, deleteTrip } = useTrip();
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDelete = (tripId) => {
    deleteTrip(tripId);
    setConfirmDelete(null);
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const options = { month: 'short', day: 'numeric' };
    const yearOptions = { year: 'numeric' };
    
    // Show year only if different
    const startStr = start.toLocaleDateString('en-US', options);
    const endStr = end.toLocaleDateString('en-US', options);
    const yearStr = start.getFullYear() !== end.getFullYear() 
      ? `${start.toLocaleDateString('en-US', yearOptions)} - ${end.toLocaleDateString('en-US', yearOptions)}`
      : end.toLocaleDateString('en-US', yearOptions);
      
    return `${startStr} - ${endStr}, ${yearStr}`;
  };

  if (trips.length === 0) {
    return (
      <>
        <PageHeader>
          <Typography variant="h4" component="h1">
            My Trips
          </Typography>
        </PageHeader>
        
        <EmptyState>
          <Public sx={{ fontSize: 60, color: '#2E7D32', mb: 2, opacity: 0.7 }} />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
            You haven't planned any trips yet
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
            Start your journey by creating a new trip. Plan destinations, activities, and create your perfect travel itinerary.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            component={Link} 
            to="/plan"
            size="large"
            startIcon={<FlightTakeoff />}
          >
            Plan Your First Trip
          </Button>
        </EmptyState>
      </>
    );
  }

  return (
    <>
      <PageHeader>
        <Typography variant="h4" component="h1">
          My Trips
        </Typography>
      </PageHeader>
      
      <Grid container spacing={3}>
        {trips.map((trip) => {
          const totalDays = trip.destinations.reduce(
            (sum, dest) => sum + (dest.duration || 1), 0
          );
          
          return (
            <Grid item xs={12} sm={6} md={4} key={trip.id}>
              <TripCard>
                <CardMediaStyled
                  image={getTripImage(trip.destinations)}
                  title={trip.name}
                >
                  <TripInfo>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                      {trip.name}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {trip.destinations.length} destinations
                    </Typography>
                  </TripInfo>
                </CardMediaStyled>
                
                <CardContentStyled>
                  <InfoItem>
                    <CalendarToday fontSize="small" sx={{ color: '#2E7D32' }} />
                    <InfoText variant="body2" color="textSecondary">
                      {formatDateRange(trip.startDate, trip.endDate)}
                    </InfoText>
                  </InfoItem>
                  
                  <InfoItem>
                    <DirectionsWalk fontSize="small" sx={{ color: '#2E7D32' }} />
                    <InfoText variant="body2" color="textSecondary">
                      {totalDays} {totalDays === 1 ? 'day' : 'days'} trip
                    </InfoText>
                  </InfoItem>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {trip.destinations.slice(0, 3).map((dest, index) => (
                      <DateChip
                        key={index}
                        icon={<Place fontSize="small" />}
                        label={dest.name}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                    {trip.destinations.length > 3 && (
                      <DateChip 
                        label={`+${trip.destinations.length - 3} more`}
                        size="small"
                        color="default"
                      />
                    )}
                  </Box>
                </CardContentStyled>
                
                <CardActionsStyled>
                  <Button 
                    size="small"
                    component={Link}
                    to={`/trips/${trip.id}`}
                    color="primary"
                  >
                    View Details
                  </Button>
                  <Button 
                    size="small" 
                    color="error"
                    startIcon={<Delete fontSize="small" />}
                    onClick={() => setConfirmDelete(trip.id)}
                  >
                    Delete
                  </Button>
                </CardActionsStyled>
              </TripCard>
            </Grid>
          );
        })}
      </Grid>
      
      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={Boolean(confirmDelete)} 
        onClose={() => setConfirmDelete(null)}
        PaperProps={{
          style: {
            borderRadius: 12,
            padding: 8
          }
        }}
      >
        <DialogTitle>Delete Trip</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this trip? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={() => handleDelete(confirmDelete)}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyTrips;
