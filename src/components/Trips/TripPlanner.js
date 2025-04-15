import React, { useState } from 'react';
import { Typography, TextField, Button, Paper, Grid, Box, Divider, Snackbar, Alert, 
  CircularProgress, Stepper, Step, StepLabel, StepContent, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../../context/TripContext';
import MapView from '../Map/MapView';
import LocationSearch from '../UI/LocationSearch';
import TripDestination from './TripDestination';
import styled from 'styled-components';
import DirectionsIcon from '@mui/icons-material/Directions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const PageHeader = styled(Box)`
  margin-bottom: 30px;
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

const PlannerContainer = styled(Paper)`
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 16px;
`;

const MapContainer = styled(Paper)`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
`;

const TripSummary = styled(Paper)`
  padding: 20px;
  margin-top: 20px;
  border-radius: 16px;
  background-color: #FBFBFB;
  border: 1px solid #EFEFEF;
`;

const StyledDivider = styled(Divider)`
  margin: 16px 0;
`;

const StepperContainer = styled(Box)`
  margin: 30px 0;
`;

const FormSection = styled(Box)`
  margin-bottom: 30px;
`;

const TripPlanner = () => {
  const { createTrip } = useTrip();
  const navigate = useNavigate();
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const handleAddDestination = (destination) => {
    // Check if destination already exists
    if (destinations.some(dest => dest.id === destination.id)) {
      setFormError('This destination is already in your trip.');
      setTimeout(() => setFormError(''), 3000);
      return;
    }

    setDestinations([...destinations, {
      ...destination,
      id: destination.id || Date.now().toString(),
      activities: [],
      duration: 1
    }]);
    
    // Move to step 2 if this is the first destination
    if (destinations.length === 0 && activeStep === 1) {
      setActiveStep(2);
    }
  };

  const handleRemoveDestination = (id) => {
    setDestinations(destinations.filter(dest => dest.id !== id));
  };

  const handleUpdateDestination = (id, updatedData) => {
    setDestinations(
      destinations.map(dest => 
        dest.id === id ? { ...dest, ...updatedData } : dest
      )
    );
  };

  const handleSaveTrip = () => {
    // Validate form
    if (!tripName.trim()) {
      setFormError('Please enter a trip name.');
      return;
    }
    if (!startDate) {
      setFormError('Please select a start date.');
      return;
    }
    if (!endDate) {
      setFormError('Please select an end date.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setFormError('End date must be after start date.');
      return;
    }
    if (destinations.length === 0) {
      setFormError('Please add at least one destination.');
      return;
    }
    
    setIsSaving(true);
    setFormError('');
    
    // Simulate a delay for better user feedback
    setTimeout(() => {
      try {
        const newTrip = createTrip({
          name: tripName,
          startDate,
          endDate,
          destinations
        });
        
        // Reset form
        setTripName('');
        setStartDate('');
        setEndDate('');
        setDestinations([]);
        setShowSuccess(true);
        setActiveStep(3); // Move to completed step
        
        // Redirect to My Trips page after a short delay
        setTimeout(() => {
          navigate('/trips');
        }, 3000);
      } catch (error) {
        setFormError('Failed to save trip. Please try again.');
        console.error('Error saving trip:', error);
      } finally {
        setIsSaving(false);
      }
    }, 800);
  };

  const handleNext = () => {
    // Validate current step
    if (activeStep === 0 && (!tripName.trim() || !startDate || !endDate)) {
      setFormError('Please fill in all trip details before proceeding.');
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setFormError('');
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setFormError('');
  };

  const isFormValid = tripName && startDate && endDate && destinations.length > 0;
  
  const totalDays = destinations.reduce(
    (sum, dest) => sum + (dest.duration || 1), 0
  );

  return (
    <>
      <PageHeader>
        <Typography variant="h4" component="h1">
          Plan Your Trip
        </Typography>
      </PageHeader>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <PlannerContainer>
            <StepperContainer>
              <Stepper activeStep={activeStep} orientation="vertical">
                <Step>
                  <StepLabel>Trip Details</StepLabel>
                  <StepContent>
                    <FormSection>
                      <TextField
                        label="Trip Name"
                        fullWidth
                        margin="normal"
                        value={tripName}
                        onChange={(e) => setTripName(e.target.value)}
                        required
                        error={formError.includes('trip name')}
                        placeholder="E.g. Summer Vacation 2023"
                      />
                      
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            label="Start Date"
                            type="date"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                            error={formError.includes('start date')}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="End Date"
                            type="date"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                            error={formError.includes('end date')}
                          />
                        </Grid>
                      </Grid>
                    </FormSection>
                    
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Continue
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
                
                <Step>
                  <StepLabel>Add Destinations</StepLabel>
                  <StepContent>
                    <Box mt={1} mb={2}>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        Search and add destinations for your trip
                      </Typography>
                      <LocationSearch onSelect={handleAddDestination} />
                      
                      <Box mt={2}>
                        {destinations.length === 0 ? (
                          <Typography variant="body2" color="textSecondary">
                            No destinations added yet. Search and add destinations above.
                          </Typography>
                        ) : (
                          destinations.map((destination) => (
                            <TripDestination
                              key={destination.id}
                              destination={destination}
                              onUpdate={(updatedData) => handleUpdateDestination(destination.id, updatedData)}
                              onRemove={() => handleRemoveDestination(destination.id)}
                            />
                          ))
                        )}
                      </Box>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                          disabled={destinations.length === 0}
                        >
                          Continue
                        </Button>
                        <Button
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
                
                <Step>
                  <StepLabel>Review & Save</StepLabel>
                  <StepContent>
                    <Box mb={3}>
                      <Typography variant="body1" gutterBottom>
                        Review your trip details before saving:
                      </Typography>
                      
                      <Box mt={2} py={1} px={2} bgcolor="rgba(46, 125, 50, 0.05)" borderRadius={1}>
                        <Typography variant="subtitle1" fontWeight={500}>{tripName}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {formatDate(startDate)} - {formatDate(endDate)}
                        </Typography>
                      </Box>
                      
                      <Box mt={2}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          Destinations:
                        </Typography>
                        <Box px={2}>
                          {destinations.map((dest, index) => (
                            <Box key={index} display="flex" alignItems="center" mb={1}>
                              <DirectionsIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                              <Typography>
                                {dest.name} ({dest.duration} {dest.duration === 1 ? 'day' : 'days'})
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSaveTrip}
                          disabled={!isFormValid || isSaving}
                          startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <CheckCircleOutlineIcon />}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {isSaving ? 'Saving...' : 'Save Trip'}
                        </Button>
                        <Button
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                          disabled={isSaving}
                        >
                          Back
                        </Button>
                      </div>
                      {formError && (
                        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                          {formError}
                        </Typography>
                      )}
                    </Box>
                  </StepContent>
                </Step>
                
                <Step>
                  <StepLabel>Trip Saved</StepLabel>
                  <StepContent>
                    <Box sx={{ mt: 2, mb: 1 }}>
                      <CheckCircleOutlineIcon color="success" sx={{ fontSize: 40 }} />
                      <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
                        Trip Successfully Saved!
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Your trip has been saved. You will be redirected to the My Trips page.
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>
              </Stepper>
            </StepperContainer>
          </PlannerContainer>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <MapContainer>
            <MapView 
              locations={destinations.map(d => ({
                lat: d.lat,
                lng: d.lng,
                name: d.name
              }))}
              zoom={destinations.length ? 5 : 3}
            />
          </MapContainer>
          
          {destinations.length > 0 && (
            <TripSummary>
              <Box display="flex" alignItems="center">
                <EmojiTransportationIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Trip Summary
                </Typography>
              </Box>
              <StyledDivider />
              
              <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Destinations
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {destinations.length}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Duration
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {totalDays} {totalDays === 1 ? 'day' : 'days'}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Activities
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {destinations.reduce((sum, dest) => sum + (dest.activities?.length || 0), 0)}
                  </Typography>
                </Box>
              </Box>
              
              <StyledDivider />
              
              <Box mt={2}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Itinerary:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                  {destinations.map((d, i) => (
                    <React.Fragment key={i}>
                      <Chip 
                        label={d.name} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        sx={{ mr: 1, mb: 1 }} 
                      />
                      {i < destinations.length - 1 && (
                        <AccessTimeIcon fontSize="small" sx={{ mr: 1, mb: 1, color: 'text.secondary' }} />
                      )}
                    </React.Fragment>
                  ))}
                </Box>
              </Box>
            </TripSummary>
          )}
        </Grid>
      </Grid>
      
      <Snackbar 
        open={showSuccess} 
        autoHideDuration={6000} 
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          Trip saved successfully! Redirecting to My Trips...
        </Alert>
      </Snackbar>
    </>
  );
};

// Helper function for formatting dates
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export default TripPlanner;
