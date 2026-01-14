import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FavoritesProvider } from './Context/FavoriteContext';
import Navbar from './components/Navbar';
import Home from './pages/Home'
const App = () => {
  return (
    <FavoritesProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

        </Routes>
      </Router>
    </FavoritesProvider>
  );
};

export default App;