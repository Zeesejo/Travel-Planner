import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import Layout from './components/Layout/Layout';
import HomePage from './components/Layout/HomePage';
import TripPlanner from './components/Trips/TripPlanner';
import MyTrips from './components/Trips/MyTrips';
import TripDetails from './components/Trips/TripDetails';
import AboutPage from './components/Layout/AboutPage';

function App() {
  return (
    <TripProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/plan" element={<TripPlanner />} />
            <Route path="/trips" element={<MyTrips />} />
            <Route path="/trips/:tripId" element={<TripDetails />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </Router>
    </TripProvider>
  );
}

export default App;
