import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const MainLayouts = () => {
    return (
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <div className="min-h-[calc(100vh-89px)]">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
};

export default MainLayouts;