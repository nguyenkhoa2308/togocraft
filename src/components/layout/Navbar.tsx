import React from 'react';
import TopBar from './TopBar';
import Header from './Header';
import NavigationBar from './NavigationBar';

const Navbar = () => {
  return (
    <header className="w-full font-sans z-50 relative">
      <TopBar />
      <Header />
      <NavigationBar />
    </header>
  );
};

export default Navbar;
