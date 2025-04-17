import React from 'react';
import Home from './pages/Home';
import fondo from './assets/fondo.jpg';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="bg-white/20 backdrop-blur-sm min-h-screen">
        <Home />
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default App;
