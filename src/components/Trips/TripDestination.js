import React, { useState } from 'react';
import { Paper, Typography, TextField, IconButton, Box, Chip, Collapse } from '@mui/material';
import { Delete, ExpandMore, ExpandLess, Add } from '@mui/icons-material';
import styled from 'styled-components';

const DestinationPaper = styled(Paper)`
  padding: 16px;
  margin: 12px 0;
  border-left: 4px solid #3f51b5;
`;

const TripDestination = ({ destination, onUpdate, onRemove }) => {
  const [expanded, setExpanded] = useState(false);
  const [newActivity, setNewActivity] = useState('');

  const handleDurationChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    onUpdate({ duration: value });
  };

  const handleAddActivity = () => {
    if (!newActivity.trim()) return;
    
    const updatedActivities = [...destination.activities, {
      id: Date.now().toString(),
      name: newActivity
    }];
    onUpdate({ activities: updatedActivities });
    setNewActivity('');
  };

  const handleRemoveActivity = (activityId) => {
    const updatedActivities = destination.activities.filter(
      activity => activity.id !== activityId
    );
    onUpdate({ activities: updatedActivities });
  };

  return (
    <DestinationPaper elevation={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="subtitle1">{destination.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {destination.vicinity || destination.formatted_address}
          </Typography>
        </Box>
        <Box>
          <TextField
            label="Days"
            type="number"
            size="small"
            value={destination.duration}
            onChange={handleDurationChange}
            InputProps={{
              inputProps: { min: 1, max: 30 }
            }}
            style={{ width: '80px', marginRight: '8px' }}
          />
          <IconButton onClick={onRemove} color="error" size="small">
            <Delete />
          </IconButton>
          <IconButton size="small" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      </Box>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box mt={2}>
          <Typography variant="body2" gutterBottom>Activities:</Typography>
          
          <Box display="flex" mb={1}>
            <TextField
              size="small"
              placeholder="Add an activity"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              fullWidth
            />
            <IconButton onClick={handleAddActivity} color="primary">
              <Add />
            </IconButton>
          </Box>
          
          <Box display="flex" flexWrap="wrap" gap={1}>
            {destination.activities.map((activity) => (
              <Chip
                key={activity.id}
                label={activity.name}
                onDelete={() => handleRemoveActivity(activity.id)}
                size="small"
              />
            ))}
            {destination.activities.length === 0 && (
              <Typography variant="body2" color="textSecondary">
                No activities added yet
              </Typography>
            )}
          </Box>
        </Box>
      </Collapse>
    </DestinationPaper>
  );
};

export default TripDestination;
