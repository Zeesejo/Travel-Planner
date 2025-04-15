import React, { createContext, useContext, useState, useEffect } from 'react';

const TripContext = createContext();

export const useTrip = () => useContext(TripContext);

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState(null);

  // Load trips from localStorage on initial load
  useEffect(() => {
    const savedTrips = localStorage.getItem('tripData');
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips));
    }
  }, []);

  // Save trips to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tripData', JSON.stringify(trips));
  }, [trips]);

  // Create a new trip
  const createTrip = (tripData) => {
    const newTrip = {
      id: Date.now().toString(),
      ...tripData,
      createdAt: new Date().toISOString(),
    };
    setTrips((prevTrips) => [...prevTrips, newTrip]);
    return newTrip;
  };

  // Update an existing trip
  const updateTrip = (id, updatedData) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === id ? { ...trip, ...updatedData } : trip
      )
    );
  };

  // Delete a trip
  const deleteTrip = (id) => {
    setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
  };

  // Get a trip by ID
  const getTrip = (id) => {
    return trips.find((trip) => trip.id === id);
  };

  const value = {
    trips,
    currentTrip,
    setCurrentTrip,
    createTrip,
    updateTrip,
    deleteTrip,
    getTrip,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};
