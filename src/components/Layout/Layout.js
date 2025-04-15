import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Drawer, List, 
  ListItem, ListItemIcon, ListItemText, Divider, useMediaQuery, useTheme, Grid } from '@mui/material';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import MapIcon from '@mui/icons-material/Map';
import InfoIcon from '@mui/icons-material/Info';
import Logo from '../UI/Logo';

const StyledAppBar = styled(AppBar)`
  background: #1B5E20;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 0 !important;
  width: 100vw;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  z-index: 1400;

  /* Override any MUI Paper styles that might be causing rounded corners */
  &.MuiPaper-root {
    border-radius: 0 !important;
    overflow: visible;
  }

  /* Target child elements to ensure they don't have rounded corners either */
  & > * {
    border-radius: 0 !important;
  }
  
  /* Make the navbar connected with hero section by removing bottom margin/padding */
  margin-bottom: 0;
`;

// Also let's modify the Toolbar to ensure no rounded corners
const StyledToolbar = styled(Toolbar)`
  border-radius: 0 !important;
  padding-left: 16px;
  padding-right: 16px;
  
  @media (min-width: 600px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const NavButton = styled(Button)`
  margin-left: 15px;
  color: white !important;
  position: relative;
  opacity: 0.85;
  background-color: transparent !important;
  padding: 6px 16px;
  border-radius: 0; /* Remove rounded corners */
  font-weight: 600;
  border: 2px solid rgba(255, 255, 255, 0.3);
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background-color: white;
    transition: all 0.3s;
  }
  
  &:hover, &.active {
    opacity: 1;
    color: white !important;
    background-color: rgba(255, 255, 255, 0.1) !important;
    box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  }
  
  &:hover:after, &.active:after {
    width: 70%;
    left: 15%;
  }
  
  & .MuiButton-label {
    color: white !important;
  }
  
  &.MuiButton-root {
    color: white !important;
  }
`;

const MainContent = styled(Container)`
  padding-top: 64px; /* Match the AppBar height */
  padding-bottom: 40px;
  min-height: calc(100vh - 130px);
  position: relative;
  
  /* Make container handle overflow properly */
  &.MuiContainer-root {
    overflow-x: visible;
    max-width: 100%;
    
    @media (min-width: 1200px) {
      max-width: 1200px;
      padding-left: 24px;
      padding-right: 24px;
    }
  }
`;

const Footer = styled(Box)`
  background: linear-gradient(to right, #2E7D32, #1B5E20);
  color: white;
  padding: 40px 0 20px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, #BA68C8, #9C27B0);
  }
`;

const FooterSection = styled(Box)`
  margin-bottom: 20px;
`;

const FooterLink = styled(Typography)`
  color: rgba(255, 255, 255, 0.8);
  margin: 6px 0;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: white;
  }
`;

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const isActive = (path) => location.pathname === path;
  
  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{ p: 2 }}>
        <Logo darkMode={true} />
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} to="/" selected={isActive('/')}>
          <ListItemIcon>
            <HomeIcon color={isActive('/') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/plan" selected={isActive('/plan')}>
          <ListItemIcon>
            <ExploreIcon color={isActive('/plan') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Plan Trip" />
        </ListItem>
        <ListItem button component={Link} to="/trips" selected={isActive('/trips')}>
          <ListItemIcon>
            <MapIcon color={isActive('/trips') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="My Trips" />
        </ListItem>
        <ListItem button component={Link} to="/about" selected={isActive('/about')}>
          <ListItemIcon>
            <InfoIcon color={isActive('/about') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="fixed">
        <StyledToolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Logo darkMode={false} />
          </Link>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {!isMobile && (
            <>
              <NavButton 
                component={Link} 
                to="/" 
                className={isActive('/') ? 'active' : ''}
              >
                Home
              </NavButton>
              <NavButton 
                component={Link} 
                to="/plan" 
                className={isActive('/plan') ? 'active' : ''}
              >
                Plan Trip
              </NavButton>
              <NavButton 
                component={Link} 
                to="/trips" 
                className={isActive('/trips') ? 'active' : ''}
              >
                My Trips
              </NavButton>
              <NavButton 
                component={Link} 
                to="/about" 
                className={isActive('/about') ? 'active' : ''}
              >
                About
              </NavButton>
            </>
          )}
        </StyledToolbar>
      </StyledAppBar>
      
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        {drawer}
      </Drawer>
      
      <MainContent maxWidth="lg">
        {children}
      </MainContent>
      
      <Footer>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <FooterSection>
                <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                  About WanderWise
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
                  Plan your dream vacation with our intuitive tools. Discover destinations, 
                  create itineraries, and organize your travel plans all in one place.
                </Typography>
              </FooterSection>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <FooterSection>
                <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                  Quick Links
                </Typography>
                <FooterLink variant="body2" component={Link} to="/">Home</FooterLink>
                <FooterLink variant="body2" component={Link} to="/plan">Plan a Trip</FooterLink>
                <FooterLink variant="body2" component={Link} to="/trips">My Trips</FooterLink>
                <FooterLink variant="body2" component={Link} to="/about">About</FooterLink>
              </FooterSection>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <FooterSection>
                <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                  Developer Info
                </Typography>
                <FooterLink variant="body2">Zeeshan Modi - 21BCS6219</FooterLink>
                <FooterLink variant="body2">Chandigarh University</FooterLink>
                <FooterLink variant="body2">Project for HCI Course</FooterLink>
              </FooterSection>
            </Grid>
          </Grid>
          
          <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', my: 2 }} />
          
          <Typography variant="body2" align="center" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            WanderWise Trip Planner © {new Date().getFullYear()} | Developed by Zeeshan Modi
          </Typography>
        </Container>
      </Footer>
    </>
  );
};

export default Layout;
