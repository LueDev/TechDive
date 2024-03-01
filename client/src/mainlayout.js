import React from 'react';
import Header from './components/header';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
