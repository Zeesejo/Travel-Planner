import React from 'react';
import { Typography, Box, Paper, Grid, Avatar, Divider, Container, Card, CardContent, Chip } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import ComputerIcon from '@mui/icons-material/Computer';
import styled from 'styled-components';
import Logo from '../UI/Logo';

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

const ProjectCard = styled(Paper)`
  padding: 30px;
  border-radius: 16px;
  margin-bottom: 30px;
`;

const DeveloperCard = styled(Card)`
  border-radius: 16px;
  overflow: hidden;
  height: 100%;
`;

const AvatarLarge = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  border: 4px solid #4CAF50;
`;

const SkillChip = styled(Chip)`
  margin: 4px;
`;

const AboutPage = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader>
        <Typography variant="h4" component="h1">
          About This Project
        </Typography>
      </PageHeader>
      
      <ProjectCard elevation={2}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Logo variant="h3" />
          <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
            Your Ultimate Travel Planning Companion
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
          Project Overview
        </Typography>
        
        <Typography paragraph>
          This trip planning application was developed as a project for the Human-Computer Interaction (HCI) course 
          at Chandigarh University. The application allows users to plan their trips by selecting destinations, 
          adding activities, and organizing their travel itinerary in an intuitive and user-friendly interface.
        </Typography>
        
        <Typography paragraph>
          The application demonstrates core HCI principles including:
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>User-Centered Design</Typography>
              <Typography variant="body2" color="textSecondary">
                Focused on meeting user needs with intuitive navigation and workflow
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>Visual Hierarchy</Typography>
              <Typography variant="body2" color="textSecondary">
                Clear organization of information with effective use of color and typography
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>Feedback & Affordance</Typography>
              <Typography variant="body2" color="textSecondary">
                Clear feedback on user actions and visual cues for interactive elements
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
          Technical Details
        </Typography>
        
        <Typography paragraph>
          This project was built using:
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          <SkillChip icon={<CodeIcon />} label="React.js" color="primary" variant="outlined" />
          <SkillChip icon={<CodeIcon />} label="Material UI" color="primary" variant="outlined" />
          <SkillChip icon={<CodeIcon />} label="Styled Components" color="primary" variant="outlined" />
          <SkillChip icon={<CodeIcon />} label="React Router" color="primary" variant="outlined" />
        </Box>
        
        <Divider sx={{ my: 4 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <DeveloperCard>
              <CardContent sx={{ textAlign: 'center' }}>
                <AvatarLarge>ZM</AvatarLarge>
                <Typography variant="h5" gutterBottom>
                  Zeeshan Modi
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Student ID: 21BCS6219
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <SchoolIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Chandigarh University
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ComputerIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Human-Computer Interaction Project
                  </Typography>
                </Box>
              </CardContent>
            </DeveloperCard>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Project Goals
              </Typography>
              <Typography paragraph>
                This project aimed to create an interactive and user-friendly interface 
                for planning trips, showcasing the application of HCI principles in web development.
              </Typography>
              <Typography variant="h6" gutterBottom>
                Learning Outcomes
              </Typography>
              <Typography paragraph>
                • Understanding of user interface design principles<br />
                • Implementation of responsive design<br />
                • Creating intuitive user flows and interaction patterns<br />
                • Applying visual design principles for better user experience
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </ProjectCard>
    </Container>
  );
};

export default AboutPage;
