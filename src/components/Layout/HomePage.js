import React from 'react';
import { Typography, Button, Grid, Paper, Box, Card, CardMedia, CardContent, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ExploreIcon from '@mui/icons-material/Explore';
import MapIcon from '@mui/icons-material/Map';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Logo from '../UI/Logo';

const HeroSection = styled(Box)`
  position: relative;
  height: 80vh;
  max-height: 700px;
  min-height: 500px;
  display: flex;
  align-items: center;
  color: white;
  overflow: hidden;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding-top: 64px; /* Add padding to push content down below navbar */
  margin-top: -64px; /* Negative margin to pull it up under navbar */
  margin-bottom: 60px;
  box-sizing: border-box;
`;

const HeroBackground = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2874&q=80');
  background-size: cover;
  background-position: center;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(27, 94, 32, 0.9) 0%, rgba(46, 125, 50, 0.7) 100%);
  }
`;

const HeroContent = styled(Container)`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 20px;
`;

const HeroTitle = styled(Typography)`
  font-weight: 800;
  font-size: 3.5rem;
  margin-bottom: 24px;
  text-shadow: 0px 2px 4px rgba(0,0,0,0.2);
  
  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(Typography)`
  font-size: 1.3rem;
  font-weight: 400;
  max-width: 800px;
  margin: 0 auto 32px;
  text-shadow: 0px 1px 2px rgba(0,0,0,0.2);
`;

const AnimatedArrow = styled(ArrowForwardIcon)`
  transition: transform 0.3s ease;
`;

const StyledButton = styled(Button)`
  &:hover ${AnimatedArrow} {
    transform: translateX(5px);
  }
`;

const ActionButton = styled(Button)`
  padding: 12px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  background-color: #FF6F00; /* Orange color */
  color: white;
  box-shadow: 0 4px 14px rgba(0,0,0,0.25);
  
  &:hover {
    background-color: #E65100; /* Darker orange on hover */
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    transform: translateY(-2px);
    color: white;
  }
`;

const FeatureCard = styled(Paper)`
  padding: 32px;
  height: 100%;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  border: none;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #1B5E20, #4CAF50);
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 30px rgba(0,0,0,0.1);
  }
`;

const IconWrapper = styled(Box)`
  margin-bottom: 24px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 24px;
  background-color: rgba(46, 125, 50, 0.1);
  color: #1B5E20;
  transition: transform 0.3s ease;
  
  ${FeatureCard}:hover & {
    transform: scale(1.1);
    background-color: rgba(46, 125, 50, 0.2);
  }
`;

const DestinationCard = styled(Card)`
  height: 100%;
  overflow: hidden;
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.2);
  }
`;

const CardOverlay = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0));
`;

const SectionTitle = styled(Typography)`
  position: relative;
  margin-bottom: 50px;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    width: 70px;
    height: 3px;
    background-color: #FF6F00;
    bottom: -10px;
    left: 0;
  }
`;

const popularDestinations = [
  {
    id: 1,
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2938&q=80',
    description: 'Tropical paradise with stunning beaches and rich culture'
  },
  {
    id: 2,
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    description: 'Iconic white buildings with blue domes overlooking the sea'
  },
  {
    id: 3,
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1624253321171-1be53e12f5f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    description: 'Ancient temples, traditional gardens and geisha culture'
  },
];

const HomePage = () => {
  return (
    <>
      <HeroSection>
        <HeroBackground />
        <HeroContent maxWidth="md">
          <HeroTitle variant="h1">
            Explore The World With WanderWise
          </HeroTitle>
          <HeroSubtitle variant="h5" paragraph>
            Create personalized travel plans, discover amazing destinations, and make unforgettable memories
          </HeroSubtitle>
          <ActionButton 
            variant="contained" 
            size="large" 
            component={Link} 
            to="/plan"
            endIcon={<AnimatedArrow />}
            sx={{ 
              backgroundColor: '#FF6F00', /* Ensure orange color */
              '&:hover': { backgroundColor: '#E65100' } 
            }}
          >
            Start Planning
          </ActionButton>
        </HeroContent>
      </HeroSection>
      
      <Container maxWidth="lg">
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <FlightTakeoffIcon sx={{ color: '#2E7D32', fontSize: 40, mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Travel with Confidence
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Our trip planner helps you organize all the details of your trip so you can focus on enjoying the journey.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 10 }}>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <IconWrapper>
                <ExploreIcon sx={{ fontSize: 36 }} />
              </IconWrapper>
              <Typography variant="h5" component="h2" gutterBottom>
                Discover Destinations
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Explore popular destinations around the world and find the perfect spot for your next adventure.
              </Typography>
            </FeatureCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <IconWrapper>
                <MapIcon sx={{ fontSize: 36 }} />
              </IconWrapper>
              <Typography variant="h5" component="h2" gutterBottom>
                Create Itineraries
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Build day-by-day plans with activities, transportation details, and accommodation information.
              </Typography>
            </FeatureCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <IconWrapper>
                <BookmarkIcon sx={{ fontSize: 36 }} />
              </IconWrapper>
              <Typography variant="h5" component="h2" gutterBottom>
                Save & Share
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Keep track of your trips and easily share them with friends and family members.
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>

        <Box sx={{ mb: 10 }}>
          <SectionTitle variant="h4" gutterBottom>
            Popular Destinations
          </SectionTitle>

          <Grid container spacing={3}>
            {popularDestinations.map((destination) => (
              <Grid item xs={12} md={4} key={destination.id}>
                <DestinationCard>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={destination.image}
                      alt={destination.name}
                    />
                    <CardOverlay>
                      <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'white', fontWeight: 500 }}>
                        {destination.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        {destination.description}
                      </Typography>
                    </CardOverlay>
                  </Box>
                  <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      component={Link}
                      to="/plan"
                      color="primary"
                      endIcon={<ArrowForwardIcon />}
                    >
                      Plan a Trip
                    </Button>
                  </CardContent>
                </DestinationCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ textAlign: 'center', py: 5, mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Ready to Plan Your Next Adventure?
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph sx={{ mb: 4 }}>
            Join thousands of travelers who use WanderWise to create their perfect trip.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            component={Link}
            to="/plan"
            sx={{ 
              px: 5, 
              backgroundColor: '#FF6F00', /* Change to orange */
              '&:hover': { 
                backgroundColor: '#E65100', /* Darker orange on hover */
                color: '#FFFFFF'
              },
              color: '#FFFFFF' 
            }}
          >
            Start Planning Now
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
