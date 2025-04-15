import React, { useState } from 'react';
import { TextField, List, ListItem, ListItemText, Paper, Typography, Box, Button, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styled from 'styled-components';

const SearchContainer = styled(Box)`
  width: 100%;
  margin-bottom: 20px;
`;

const ResultsContainer = styled(Paper)`
  margin-top: 10px;
  max-height: 300px;
  overflow-y: auto;
`;

// Expanded list of predefined locations for reliable testing
const PREDEFINED_LOCATIONS = [
  {
    id: '1',
    name: 'New York City',
    vicinity: 'New York, USA',
    lat: 40.7128,
    lng: -74.0060,
  },
  {
    id: '2',
    name: 'London',
    vicinity: 'United Kingdom',
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    id: '3',
    name: 'Tokyo',
    vicinity: 'Japan',
    lat: 35.6762,
    lng: 139.6503,
  },
  {
    id: '4',
    name: 'Paris',
    vicinity: 'France',
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    id: '5',
    name: 'Sydney',
    vicinity: 'Australia',
    lat: -33.8688,
    lng: 151.2093,
  },
  {
    id: '6',
    name: 'Rome',
    vicinity: 'Italy',
    lat: 41.9028,
    lng: 12.4964,
  },
  {
    id: '7',
    name: 'Bangkok',
    vicinity: 'Thailand',
    lat: 13.7563,
    lng: 100.5018,
  },
  {
    id: '8',
    name: 'Cairo',
    vicinity: 'Egypt',
    lat: 30.0444,
    lng: 31.2357,
  },
  {
    id: '9',
    name: 'Rio de Janeiro',
    vicinity: 'Brazil',
    lat: -22.9068,
    lng: -43.1729,
  },
  {
    id: '10',
    name: 'Dubai',
    vicinity: 'United Arab Emirates',
    lat: 25.2048,
    lng: 55.2708,
  },
  {
    id: '11',
    name: 'Singapore',
    vicinity: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
  },
  {
    id: '12',
    name: 'Hong Kong',
    vicinity: 'China',
    lat: 22.3193,
    lng: 114.1694,
  },
  {
    id: '13',
    name: 'Las Vegas',
    vicinity: 'Nevada, USA',
    lat: 36.1699,
    lng: -115.1398,
  },
  {
    id: '14',
    name: 'Barcelona',
    vicinity: 'Spain',
    lat: 41.3851,
    lng: 2.1734,
  },
  {
    id: '15',
    name: 'Amsterdam',
    vicinity: 'Netherlands',
    lat: 52.3676,
    lng: 4.9041,
  }
];

const LocationSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  // More robust filtering to handle partial matches and case insensitivity
  const filteredLocations = query.trim() === '' 
    ? [] 
    : PREDEFINED_LOCATIONS.filter(location => {
        const searchTerm = query.toLowerCase();
        const name = location.name.toLowerCase();
        const vicinity = location.vicinity.toLowerCase();
        
        return name.includes(searchTerm) || vicinity.includes(searchTerm);
      });

  const handleSelect = (location) => {
    onSelect(location);
    setQuery('');
    setShowResults(false);
  };

  const handleSearch = () => {
    setShowResults(true);
    // If there's exactly one match, select it automatically
    if (filteredLocations.length === 1) {
      handleSelect(filteredLocations[0]);
    }
  };

  const popularDestinations = PREDEFINED_LOCATIONS.slice(0, 6);

  return (
    <SearchContainer>
      <Box display="flex" alignItems="center">
        <TextField
          label="Search for destinations"
          placeholder="Try: New York, London, Tokyo, Paris"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <Button 
          variant="contained" 
          sx={{ ml: 1, height: 56 }}
          onClick={handleSearch}
        >
          <SearchIcon />
        </Button>
      </Box>
      
      {showResults && filteredLocations.length > 0 && (
        <ResultsContainer>
          <List>
            {filteredLocations.map((location) => (
              <ListItem 
                key={location.id} 
                button 
                onClick={() => handleSelect(location)}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemText 
                  primary={
                    <Box display="flex" alignItems="center">
                      <LocationOnIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                      {location.name}
                    </Box>
                  }
                  secondary={location.vicinity}
                />
              </ListItem>
            ))}
          </List>
        </ResultsContainer>
      )}
      
      {showResults && query && filteredLocations.length === 0 && (
        <ResultsContainer>
          <Box p={2}>
            <Typography>No results found. Try another search term.</Typography>
          </Box>
        </ResultsContainer>
      )}

      <Box mt={2}>
        <Typography variant="body2" gutterBottom>Popular destinations:</Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {popularDestinations.map((loc) => (
            <Chip
              key={loc.id}
              label={loc.name}
              onClick={() => handleSelect(loc)}
              variant="outlined"
              size="small"
              clickable
            />
          ))}
        </Box>
      </Box>
    </SearchContainer>
  );
};

export default LocationSearch;
